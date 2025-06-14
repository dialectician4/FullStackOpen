require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Person = require('./models/contact');

// App setup
const app = express();
app.use(express.json());
app.use(express.static('dist'));

app.use(morgan('tiny', {
  skip: function(req, _res) {
    return req.method === 'POST';
  },
}));

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(
  ':method :url :status :res[content-length] - :response-time ms :body',
  {
    skip: function(req, _res) {
      return req.method !== 'POST';
    },
  },
));

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

app.get('/info', (request, response, next) => {
  Person.find({}).then(db_results => {
    const ppl_ct = db_results.length;
    response.status(200).send(
      `<div>Phonebook has info for ${ppl_ct} people<br><br>${Date()}</div>`,
    );
  }).catch(error => next(error));
});

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(db_results => {
    response.json(db_results);
  }).catch(error => next(error));
});

app.post('/api/persons', (request, response, next) => {
  const body = request.body;
  if (!body.name || !body.number) {
    console.log('Failed request attempted', request.body);
    return response.status(400).json({
      error: 'name or number missing from request',
    });
  }
  Person.find({ name: body.name }).then(db_results => {
    if (db_results.length === 0) {
      const newEntry = new Person({
        name: body.name,
        number: body.number,
      });
      newEntry.save()
        .then(savedEntry => response.json(savedEntry))
        .catch(error => next(error));
    } else {
      console.log('Existing note found with the same name, please call proper endpoint to update existing entry');
      response.status(404).json({ error: 'update request made to wrong endpoint' });
    }
  }).catch(error => next(error));
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(entry => {
    if (entry) {
      response.json(entry);
    } else {
      response.status(404).end();
    }
  }
  ).catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
  const { number } = request.body;
  Person.findById(request.params.id).then(entry => {
    if (!entry) {
      return response.status(404).end();
    }
    entry.number = number;
    return entry.save().then(updatedEntry => response.json(updatedEntry));
  }).catch(error => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error);
};

app.use(errorHandler);

const app_outer = express();
app_outer.use('/phonebook', app);

const PORT = process.env.PORT || 3001;
app_outer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
