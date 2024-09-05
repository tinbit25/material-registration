import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import MaterialList from './components/MaterialList';
import AddMaterial from './components/AddMaterial';
import EditMaterial from './components/EditMaterial';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MaterialList />} />
          <Route path='/MaterialList' element={<MaterialList />} />
          <Route path='/AddMaterial' element={<AddMaterial />} />
          <Route path='/EditMaterial/:id' element={<EditMaterial />} />
        </Routes>
       
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
