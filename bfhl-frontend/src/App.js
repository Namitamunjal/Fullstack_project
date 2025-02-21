import React, { useState } from "react";
import axios from "axios";
import './App.css'

const App = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const backendURL = "http://localhost:5000/bfhl"; // Change this to your hosted backend URL

  // Validate JSON input
  const handleInputChange = (event) => {
    setJsonInput(event.target.value);
    setError("");
  };

  const handleSubmit = async () => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      if (!parsedJson.data || !Array.isArray(parsedJson.data)) {
        setError("Invalid JSON format. Ensure it contains a 'data' array.");
        return;
      }

      // Send request to backend
      const response = await axios.post(backendURL, parsedJson);
      setResponse(response.data);
    } catch (error) {
      setError("Invalid JSON format. Please enter valid JSON.");
    }
  };

  const handleDropdownChange = (event) => {
    const selectedValues = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedOptions(selectedValues);
  };

  return (
    <div style={{ maxWidth: "100%", margin: "auto", padding: "20px",fontFamily:"monospace",fontSize:"20px" }}>
      <h2>BFHL Frontend</h2>

      {/* JSON Input Field */}
      <textarea
        rows="5"
        style={{ width: "100%" }}
        placeholder='Enter JSON (e.g., { "data": ["A", "1", "B", "2"] })'
        value={jsonInput}
        onChange={handleInputChange}
      />
      <button
        onClick={handleSubmit}
        style={{ marginTop: "10px", padding: "10px", backgroundColor: "blue", color: "white", border: "none", cursor: "pointer" }}
      >
        Submit
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Dropdown (Visible only if response exists) */}
      {response && (
        <>
          <h3>Select Data to View</h3>
          <div className="dropdown-container">
            <label className="dropdown-label">Select Data to View</label>
            <select multiple onChange={handleDropdownChange} style={{ width: "100%", padding: "5px" }}>
              <option value="alphabets">Alphabets</option>
              <option value="numbers">Numbers</option>
              <option value="highest_alphabet">Highest Alphabet</option>
            </select>
          </div>

        </>
      )}

      {/* Display Response Based on Selected Options */}
      {response && (
        <div>
          <h3>Response Data</h3>
          {selectedOptions.includes("alphabets") && (
            <p><b>Alphabets:</b> {response.alphabets.join(", ")}</p>
          )}
          {selectedOptions.includes("numbers") && (
            <p><b>Numbers:</b> {JSON.stringify(response.numbers)}</p>
          )}
          {selectedOptions.includes("highest_alphabet") && (
            <p><b>Highest Alphabet:</b> {JSON.stringify(response.highest_alphabet)}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
