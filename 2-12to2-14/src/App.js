import { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("")
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      const countryList = response.data;
      setCountries(countryList);
    });
  }, []);

  return (
    <>
      Find Countries: <input value={filter} onChange={handleFilter} />
      <Countries countries={countries} filter={filter} setCountries={setCountries}/>
    </>
  )
};

export default App;
