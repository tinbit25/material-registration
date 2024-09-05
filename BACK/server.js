require('dotenv').config(); // Load environment variables at the top

const express = require('express');
const cors = require('cors');
const connectToDb = require('./config/connectToDb');
const Material = require('./models/material'); // Ensure the path and name match

const app = express();
app.use(cors());
app.use(express.json());

// Connect to the database
connectToDb();

app.get('/',(req,res)=>{
    Material.find({})
    .then(material=>res.json(material))
    .catch(err=>res.json(err))
})
app.get('/getuser/:id',(req,res)=>{
    const id=req.params.id
    Material.findById({_id:id})
    .then(material=>res.json(material))
    .catch(err=>res.json(err))
})
app.put('/EditMaterial/:id', (req, res) => {
    const id = req.params.id;
    
    Material.findByIdAndUpdate(
        id,  // Passing the `id` directly instead of an object
        {
            user: req.body.user,
            material_name: req.body.material_name,
            amount: req.body.amount,
            date: req.body.date,
            time: req.body.time
        },
        { new: true }  // This option ensures that the updated document is returned
    )
    .then(material => res.json(material))
    .catch(err => res.status(400).json(err));
});
app.delete('/deleteUser/:id',(req,res)=>{
    const id=req.params.id;
    Material.findByIdAndDelete({_id:id})
    .then(material=>res.json(material))
    .catch(err=>res.json(err))
})
// Add new material
app.post('/AddMaterial', (req, res) => {
    Material.create(req.body)
        .then(material => res.json(material))
        .catch(err => {
            console.error('Error adding material:', err); // Improved error logging
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

// Start the server
const port = process.env.PORT || 3003;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
