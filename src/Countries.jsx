import { useState } from "react";
import data from "./data.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faCaretDown, faCaretUp, faBackward, faSun } from '@fortawesome/free-solid-svg-icons';

function Countries(){

// filter data to display initial countries of USA, Germany, etc
const [defaultCountries, setDefaultCountries] = useState(
  data.filter(country =>
    ["Germany", "United States of America", "Algeria", "Afghanistan", "Åland Islands", "Albania", "Brazil", "Iceland"].includes(country.name)
  )
);

// useState array to store countries after being filtered by region
const [filteredCountries, setFilteredCountries] = useState([]);

const [searchedCountry, setSearchedCountry] = useState([]);

// Function to handle region click and filter countries
const filterByRegion = (region) => {
  const countriesInRegion = data.filter(country => country.region === region);
  setDefaultCountries(countriesInRegion);
};

const filterbySearch = (value) => {
  const search = data.filter(country => country.name === value);
  setSearchedCountry(search);
  document.getElementById("searched-country").style.display="block";
  document.getElementById("default-countries").style.display="none";
  document.getElementById("filter-div").style.display="none";
  document.getElementById("caret-up").style.display="block";
  document.getElementById("caret-down").style.display="none";
  document.getElementById("regions-div").style.display="none";
  document.getElementById("back-div").style.display="flex";
}

const darkMode = () => {
  document.getElementById("light-p").style.display = "block";
  document.getElementById("dark-p").style.display = "none";
  document.body.style.backgroundColor = "hsl(207, 26%, 17%)";
  document.getElementById("theme-div").style.backgroundColor = "hsl(209, 23%, 22%)";
  document.getElementById("filter-div").style.backgroundColor = "hsl(209, 23%, 22%)";
  document.getElementById("regions-div").style.backgroundColor = "hsl(209, 23%, 22%)";
  document.getElementById("country-input").style.backgroundColor = "hsl(209, 23%, 22%)";
  document.getElementById("back-div").style.backgroundColor = "hsl(209, 23%, 22%)";
  document.body.style.color = "hsl(0, 0%, 100%)";
} 

const lightMode = () => { 
  document.getElementById("light-p").style.display = "none";
  document.getElementById("dark-p").style.display = "block";
  document.body.style.backgroundColor = "hsl(0, 20%, 97%)";
  document.getElementById("theme-div").style.backgroundColor = "hsl(0, 0%, 100%)";
  document.getElementById("filter-div").style.backgroundColor = "hsl(0, 0%, 100%)";
  document.getElementById("regions-div").style.backgroundColor = "hsl(0, 0%, 100%)";
  document.getElementById("country-input").style.backgroundColor = "hsl(0, 0%, 100%)";
  document.getElementById("back-div").style.backgroundColor = "hsl(0, 0%, 100%)";
  document.body.style.color = "hsl(200, 15%, 8%)";
} 

const backButton = () => {
  document.getElementById("searched-country").style.display="none";
  document.getElementById("default-countries").style.display="block";
  document.getElementById("filter-div").style.display="flex";
  document.getElementById("back-div").style.display="none";
}

// display regions
function displayRegions(){
  document.getElementById("caret-up").style.display="none";
  document.getElementById("caret-down").style.display="flex";
  document.getElementById("regions-div").style.display="block";
}

// not display regions
function closeRegions(){
  document.getElementById("caret-up").style.display="flex";
  document.getElementById("caret-down").style.display="none";
  document.getElementById("regions-div").style.display ="none";
}


    return (
      <>
        <div className="d-flex flex-column content">
          <div id="theme-div" className="theme-div d-flex justify-content-between ">
            <p className="m-3 fw-bold">Where in the world?</p>
            <p id="dark-p" onClick={darkMode} className="dark-p m-3 fw-bold"> <FontAwesomeIcon icon={faMoon} /> Dark Mode</p>
            <p id="light-p" onClick={lightMode} className="light-p m-3 fw-bold"> <FontAwesomeIcon icon={faSun} /> Light mode</p>
          </div>
          <input id="country-input" onChange={(e) => filterbySearch(e.target.value)} className="country-input text-center rounded p-2 m-3" type="text" placeholder="Search for a country ..." />

          <div id="filter-div" className="filter-div m-3 p-3 w-50 rounded flex-row">
            <p>Filter by region</p>
            <FontAwesomeIcon onClick={displayRegions} id="caret-up" className="caret-up" icon={faCaretUp} /> 
            <FontAwesomeIcon onClick={closeRegions} id="caret-down" className="caret-down" icon={faCaretDown} /> 
          </div>

          <div id="back-div" className="back-div m-3 p-3 w-50 rounded">
          <FontAwesomeIcon onClick={backButton} className="mx-2 mt-1" icon={faBackward} />
            Back
          </div>

          <div id="regions-div" className="regions-div mx-3 p-2 w-50 position-absolute rounded">
            <p onClick={() => filterByRegion("Africa")}>Africa</p>
            <p onClick={() => filterByRegion("Americas")}>Americas</p>
            <p onClick={() => filterByRegion("Asia")}>Asia</p>
            <p onClick={() => filterByRegion("Europe")}>Europe</p>
            <p onClick={() => filterByRegion("Oceania")}>Oceania</p>
          </div>

            <ul id="default-countries">
            {defaultCountries.map((country) => (
          <li
            className="job-li rounded list-item list-group-item mt-5"
            key={country.alpha3Code}
          >
            <img
              className="logo-img"
              style={{ width: "300px" }}
              src={country.flags.svg}
              alt={`{job.company} logo`}
            />
            <p className="mt-4 fw-bold h3"> {country.name}</p>
            <p><span className="fw-bold">Population:</span> {country.population}</p>
            <p><span className="fw-bold">Region:</span> {country.region}</p>
            <p><span className="fw-bold">Capital:</span> {country.capital}</p>
            </li>
             ))}
            </ul>

            <ul id="searched-country">
            {searchedCountry.map((country) => (
          <li
            className="job-li rounded list-item list-group-item mt-5"
            key={country.alpha3Code}
          >
            <img
              className="logo-img"
              style={{ width: "300px",
                height: "250px" 
              }}
              src={country.flags.svg}
              alt={`{job.company} logo`}
            />
            <p className="mt-4 country-name h1">{country.name? country.name : "Unknown Name"}</p>
            <p className="mt-3"><span className="fw-bold">Native Name:</span> {country.nativeName? country.nativeName : "Unknown Native Name"}</p>
            <p><span className="fw-bold">Population:</span> {country.population? country.population : "Unknown Population"}</p>
            <p><span className="fw-bold">Region:</span> {country.region? country.region : "Unknown Region"}</p>
            <p><span className="fw-bold">Sub Region:</span> {country.subregion? country.subregion : "Unknown Subregion"}</p>
            <p><span className="fw-bold">Capital:</span> {country.capital? country.capital: "Unknown Capital"}</p>
            <p className="mt-4"><span className="fw-bold">Top Level Domain:</span> { country.topLevelDomain? country.topLevelDomain : "Unknown Top Level Domain"}</p>
            <p><span className="fw-bold">Currencies:</span> {country.currencies?.[0]?.name || 'No currency available'}</p>
            <p><span className="fw-bold">Languages:</span> {country.languages?.length ? country.languages?.map(lang => lang.name).join(', ') : 'Unknown Language'}</p> {/* Displaying languages */}
            <div>
            <p><span className="fw-bold">Border Countries:</span> </p>
            <div>{country.borders?.join(', ') || 'No Border country'}</div>
            </div>
            </li>
             ))}
            </ul>
        </div>
      </>
    );
}

export default Countries;