import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const MaterialList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3003')
      .then(result => setItems(result.data))
      .catch(err => console.log(err));
  }, []); 

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      axios.delete(`http://localhost:3003/deleteUser/${id}`)
        .then(() => {
          setItems(items.filter(item => item._id !== id));
          toast.success('Item deleted successfully'); 
        })
        .catch(err => {
          console.error('Error deleting item:', err);
          toast.error('Failed to delete item'); 
        });
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <Link to="/AddMaterial" className="bg-gray-700 hover:bg-gray-300 text-white px-4 py-2 rounded-md mb-4 inline-block">Add Material</Link>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-700 hover:bg-gray-300 text-white">
          <tr>
            <th className="border-b px-4 py-2">ID</th>
            <th className="border-b px-4 py-2">User</th>
            <th className="border-b px-4 py-2">Material Name</th>
            <th className="border-b px-4 py-2">Amount</th>
            <th className="border-b px-4 py-2">Date</th>
            <th className="border-b px-4 py-2">Time</th>
            <th className="border-b px-4 py-2">Actions</th>
            <th className="border-b px-4 py-2">Updated By</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr className='bg-white hover:bg-gray-100' key={item._id}>
              <td className="border-b px-4 py-2">{item.id}</td>
              <td className="border-b px-4 py-2">{item.user}</td>
              <td className="border-b px-4 py-2">{item.material_name}</td>
              <td className="border-b px-4 py-2">{item.amount}</td>
              <td className="border-b px-4 py-2">{item.date}</td>
              <td className="border-b px-4 py-2">{item.time}</td>
              
              <td className="border-b px-4 py-2">
                <Link to={`/EditMaterial/${item._id}`} className="bg-green-500 text-white px-4 py-2 rounded-md mr-2">Edit</Link>
                <button 
                  onClick={() => handleDelete(item._id)} 
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Delete
                </button>
              </td>
              <td className="border-b px-4 py-2">{item.updatedby}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default MaterialList;
