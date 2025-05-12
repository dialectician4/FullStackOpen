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

const DisplayCountry = ({country, capital, area, languages, flag_url}) => (
  <div>
    <h1>{country}</h1>
    Capital {capital}
    Area {area}
    <h2>Languages</h2>
    <img src={flag_url} alt={`Country flag for ${country}`} />
  </div>
);

const CountriesScreen = ({fieldInput, namesList}) => {
  if (fieldInput.length === 0) {
    return <div></div>
  };
  const allCommonNames = namesList;
  const matches = allCommonNames.filter(name => name.toLowerCase().includes(fieldInput.toLowerCase()));
  const matchesCount = matches.length;
  if (matchesCount > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if ((matchesCount > 1) && (matchesCount <= 10)) {
    return <div>{matches.map(name => <div key={name}>{name}</div> )}</div>
  } else if (matchesCount === 1) {
    const country_name = matches[0];
    getCountryData(country_name).then(all_data => parseCountryData(all_data))
      .then(data => console.log(data))
      .then();
    return <div>You found 1 country exactly!</div>}
   else {
    return <div></div>
  }
};

const App = ()  => {
  const [countryInput, setCountryInput] = useState('')
  const [commonNames, setCommonNames] = useState([])
  const handleInputChange = (event) => (setCountryInput(event.target.value))

  useEffect(() => {
    getCommonNames().then(names => setCommonNames(names));
  }, []);

  // getCountryData('finland').then(data => console.log(data));
  axios.get(`${api_base}all/`)
    .then(res => res.data)
    .then(data => console.log(data));

  return (
    <div>
    <InputBox text={'find countries'} state_val={countryInput} on_change={handleInputChange}/>
    <CountriesScreen fieldInput={countryInput} namesList={commonNames}/>
    </div>
  )
}

export default App
