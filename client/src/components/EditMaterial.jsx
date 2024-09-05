import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


const EditMaterial = () => {
  const { id } = useParams();
  const [user, setUser] = useState('');
  const [material_name, setMaterialName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [updatedby, setUpdatedBy] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3003/getuser/${id}`)
      .then((result) => {
        setUser(result.data.user);
        setMaterialName(result.data.material_name);
        setAmount(result.data.amount);
        setDate(result.data.date);
        setTime(result.data.time);
        setUpdatedBy(result.data.updatedby);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const material = {
      user,
      material_name,
      amount: Number(amount),
      date: new Date(date).toISOString(),
      time,
      updatedby,
    };

    axios
      .put(`http://localhost:3003/EditMaterial/${id}`, material)
      .then((response) => {
        console.log('Material updated:', response.data);
        navigate('/');
      })
      .catch((err) => {
        console.error('Error updating material:', err);
      });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="  text-center py-4 text-3xl">
        Material Registration
      </header>
      <main className="flex-grow flex flex-col items-center py-6">
        <div className="container mx-auto px-4 w-full max-w-2xl">
          <Link
            to="/MaterialList"
            className="bg-gray-800 text-white px-4 py-2 rounded-md shadow hover:bg-gray-700 mb-4 inline-block"
          >
            History
          </Link>
          <h1 className=" text-2xl font-bold mb-4">Update MATERIALS</h1>
          <p className="mb-6">Complete the form below:</p>
          <form onSubmit={handleUpdate} className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <div className="mb-4">
              <label htmlFor="user" className="block text-gray-700 font-medium mb-2">User</label>
              <input
                type="text"
                id="user"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="material_name" className="block text-gray-700 font-medium mb-2">Material Name</label>
              <input
                type="text"
                id="material_name"
                value={material_name}
                onChange={(e) => setMaterialName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">Amount Used</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Date</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="time" className="block text-gray-700 font-medium mb-2">Time</label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Update
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditMaterial;
