import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import { web3, contract } from "./web3";

function App() {
  const [properties, setProperties] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [propertyId, setPropertyId] = useState("");

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    const propertyCount = await contract.methods.propertyCount().call();
    const propertiesArray = [];
    for (let i = 1; i <= propertyCount; i++) {
      const property = await contract.methods.getProperty(i).call();
      propertiesArray.push(property);
    }
    setProperties(propertiesArray);
  };

  const addProperty = async () => {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.addProperty(name, location).send({ from: accounts[0] });
    loadProperties();
  };

  const transferProperty = async () => {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.transferProperty(propertyId, newOwner).send({ from: accounts[0] });
    loadProperties();
  };

  return (
    <div>
      <h1>Property Management DApp</h1>
      <div>
        <h2>Add Property</h2>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <button onClick={addProperty}>Add Property</button>
      </div>
      <div>
        <h2>Transfer Property</h2>
        <input type="text" placeholder="Property ID" value={propertyId} onChange={(e) => setPropertyId(e.target.value)} />
        <input type="text" placeholder="New Owner Address" value={newOwner} onChange={(e) => setNewOwner(e.target.value)} />
        <button onClick={transferProperty}>Transfer Property</button>
      </div>
      <div>
        <h2>Properties</h2>
        <button onClick={loadProperties}>Load Properties</button>
        <ul>
          {properties.map((property) => (
            <li key={property.id}>
              ID: {property.id}, Name: {property.name}, Location: {property.location}, Owner: {property.owner}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;