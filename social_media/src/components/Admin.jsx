import React, { useState } from 'react';
import axios from 'axios';
import './Admin.css';
const AdminPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);

  const submitQuery = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/admin/query', { query }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error submitting query:', error);
      setResults({ error: 'An error occurred while submitting the query.' });
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your query in English"
      />
      <button onClick={submitQuery}>Submit</button>
      <div>
        {results && <pre>{JSON.stringify(results, null, 2)}</pre>}
      </div>
    </div>
  );
};

export default AdminPage;