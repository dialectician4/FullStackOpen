import { useState, useEffect } from 'react';
import axios from 'axios';

const api_base = 'https://studies.cs.helsinki.fi/restcountries/api/';

const getCountryNames = () => {
  return axios.get(`${api_base}all/`)
    .then(res => res.data)
    .then(data => data.map(row => row.name))
};

const getCommonNames = () => {
  return getCountryNames().then(nameArr => nameArr.map(nameObj => nameObj.common))
};

const getCountryData = (name) => {
  return axios.get(`${api_base}name/${name}`)
    .then(res => res.data)
};

const parseCountryData = (country_data) => ({
  country: country_data.name.common,
  capital: country_data.capital[0],
  area: country_data.area,
  languages: Object.values(country_data.languages),
  flag_url: country_data.flags.png
});

const InputBox = ({ text, state_val, on_change }) => (
  <div>
    {text}: <input
      value={state_val}
      onChange={on_change}
    />
  </div>
);

const DisplayCountry = ({ country }) => {
  const [countryData, setCountryData] = useState(null);
  if (countryData === null) {
    getCountryData(country).then(all_data => parseCountryData(all_data))
      .then(data => {
        //console.log(data);
        setCountryData(data);
      })
    return null
  }
  return (<div>
    <h1>{countryData.country}</h1>
    Capital {countryData.capital}<br></br>
    Area {countryData.area}<br></br>
    <h2>Languages</h2>
    <ul>
      {countryData.languages.map(lang => <li key={lang}>{lang}</li>)}
    </ul>
    <img src={countryData.flag_url} alt={`Country flag for ${country}`} />
  </div>)
};

const MultiCountryEntry = ({ country }) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);
  return (
    <div>{country}<button onClick={handleShow}>{'show'} </button>
      {show ? <DisplayCountry country={country} /> : null}
    </div>
  )
}

const CountriesScreen = ({ fieldInput, namesList }) => {
  if (fieldInput.length === 0) {
    return <div></div>
  };
  const allCommonNames = namesList;
  const matches = allCommonNames.filter(name => name.toLowerCase().includes(fieldInput.toLowerCase()));
  const matchesCount = matches.length;
  if (matchesCount > 10) {
    // Display for too many countries
    return <div>Too many matches, specify another filter</div>
  } else if ((matchesCount > 1) && (matchesCount <= 10)) {
    // Display for 2 to 9 countries
    return <div>{matches.map(name => <MultiCountryEntry key={name} country={name} />)}</div>
  } else if (matchesCount === 1) {
    // Display for exactly 1 country
    const country_name = matches[0];
    //getCountryData(country_name).then(all_data => parseCountryData(all_data))
    //  .then(data => console.log(data))
    //  .then();
    //return <div>You found 1 country exactly!</div>
    return <DisplayCountry country={country_name} />
  }
  else {
    return <div></div>
  }
};

const App = () => {
  const [countryInput, setCountryInput] = useState('')
  const [commonNames, setCommonNames] = useState([])
  const handleInputChange = (event) => (setCountryInput(event.target.value))

  useEffect(() => {
    getCommonNames().then(names => setCommonNames(names));
  }, []);

  // getCountryData('finland').then(data => console.log(data));
  axios.get(`${api_base}all/`)
    .then(res => res.data)
  //.then(data => console.log(data));

  return (
    <div>
      <InputBox text={'find countries'} state_val={countryInput} on_change={handleInputChange} />
      <CountriesScreen fieldInput={countryInput} namesList={commonNames} />
    </div>
  )
}

export default App
