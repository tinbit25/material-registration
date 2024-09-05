import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddMaterial = () => {
  const [user, setUser] = useState('');
  const [materialName, setMaterialName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [updatedBy, setUpdatedBy] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !materialName || !amount || !date || !time) {
      setError('Please fill out all fields');
      return;
    }

    const material = {
      user,
      material_name: materialName,
      amount: Number(amount),
      date,
      time,
      updatedby: updatedBy
    };

    try {
      await axios.post("http://localhost:3003/AddMaterial", material);
      navigate('/');
    } catch (err) {
      setError('Error adding material: ' + err.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="text-center py-4 text-3xl mb-5">
        Material Registration
      </header>
      <div className="container mx-auto px-4 py-4">
      <Link
            to="/MaterialList"
            className="bg-gray-800 text-white px-4 py-2 rounded-md shadow hover:bg-gray-700 mb-4 inline-block"
          >
            History
          </Link>
        <h2 className="text-center text-xl mb-4">Add Materials</h2>
        <p className="text-center text-gray-600 mb-6">Complete the form</p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="flex justify-center">
          <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label htmlFor="user" className="block text-gray-700">User</label>
              <input
                type="text"
                id="user"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="material_name" className="block text-gray-700">Material Name</label>
              <input
                type="text"
                id="material_name"
                value={materialName}
                onChange={(e) => setMaterialName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="amount" className="block text-gray-700">Amount Used</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block text-gray-700">Date</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="time" className="block text-gray-700">Time</label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600"
              >
                Save
              </button>
              <Link
                to="/used_registration"
                className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMaterial;
