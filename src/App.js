import './App.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Table from '@mui/joy/Table';
import Tooltip from '@mui/joy/Tooltip';


function App() {
  const [listItems, setListItems] = useState([]);
  const [activeCountry, setActiveCountry] = useState(null);

  // On startup, fetch data from API
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(res => {
      setListItems(res.data);
    });
  }, []);

  // Changecountry is a separate function to not clutter the HTML-portion of component
  function changeCountry(country) {
    setActiveCountry(
      <div className='CountryInfo' key={country.fifa}>
        <header>
          <h2>{country.translations.fin.common}</h2>
          <img src={country.flags.png} />
        </header>
        <Table>
          <tbody>
            <tr>
              <td>Pääkaupunki</td><td>{country.capital ? country.capital[0] : 'Ei pääkaupunkia'}</td>
            </tr>
            <tr>
              <td>Väkiluku</td><td>{country.population}</td>
            </tr>
            <tr>
              <td>Naapurimaat</td><td>{country.borders && country.borders.map(neighbor => {
                return listItems.map(item => {
                  return item.fifa === neighbor && <Tooltip title={item.translations.fin.common} key={'tooltip' + item.fifa}><span onClick={() => {changeCountry(item)}}>{item.flag}</span></Tooltip>
                })
              })}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }
  

  return (
    <div className='App'>
      <div className='InfoContainer'>
        <div className='Selection'>
          <h1>Tietoja maista</h1>
          <small>Tiedot haettu osoitteesta restcountries.com</small>
          <Select placeholder='Valitse maa' defaultValue={listItems.length !== 0 && listItems[0].name.common} className='CountrySelect'>
            {listItems.map(listItem => {
              return (
                <Option 
                value={listItem.translations.fin.common ? listItem.translations.fin.common : 'Maan nimeä ei ole'}
                onClick={() => changeCountry(listItem)}
                key={listItem.fifa}
                >
                  {listItem.translations.fin.common ? listItem.translations.fin.common : 'Maan nimeä ei ole'}
                </Option>)
            })}
          </Select>
        </div>
        {activeCountry !== null && activeCountry}
      </div>
    </div>
  );
}

export default App;
