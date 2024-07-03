import React, { useState, useEffect } from 'react';
import './components/country.css';

function App() {
  const [country, setCountry] = useState('');
  const [province, setProvince] = useState('');
  const [universities, setUniversities] = useState([]);
  const [provinces, setProvinces] = useState([]);

  const searchUniversities = async () => {
    const response = await fetch('https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json');
    const data = await response.json();
    const filtered = data.filter(university => university.country.toLowerCase() === country.toLowerCase());
    setUniversities(filtered);

   
    const uniqueProvinces = [...new Set(filtered.map(university => university['state-province']).filter(Boolean))];
    setProvinces(uniqueProvinces);
    setProvince(''); 
  };

  const filterByProvince = () => {
    const filtered = universities.filter(university => university['state-province'] === province);
    setUniversities(filtered);
  };

  useEffect(() => {
    if (province) {
      filterByProvince();
    }
  }, [province]);

  return (
    <div className="App">
      <h1>Search Universities by Country</h1>
      <input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Enter country name"
      />
      <button onClick={searchUniversities}>Search</button>

      {provinces.length > 0 && (
        <div>
          <label htmlFor="province">Select State:</label>
          <select
            id="province"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          >
            <option value="">All</option>
            {provinces.map((prov, index) => (
              <option key={index} value={prov}>
                {prov}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="university-list">
        {universities.map((university, index) => (
          <div key={index} className="university-card">
            <h2>{university.name}</h2>
            <a href={`http://${university.web_pages[0]}`} target="_blank" rel="noopener noreferrer">
              {university.web_pages[0]}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;



