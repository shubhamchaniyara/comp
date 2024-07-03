// import React from 'react'


// function Country() {

//     search()
//     {

//     }
//   return (
//     <div>
//     <input type="text" />
//     <button onClick={search}/>
//     </div>
//   )
// }

// export default Country


import React, { useState } from 'react';
import './components/country.css';

function App() {
  const [country, setCountry] = useState('');
  const [universities, setUniversities] = useState([]);

  const searchUniversities = async () => {
    const response = await fetch('https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json');
    const data = await response.json();
    const filtered = data.filter(university => university.country.toLowerCase() === country.toLowerCase());
    setUniversities(filtered);
  };

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
