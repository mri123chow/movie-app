
const express = require('express');
const mongoose = require('mongoose');
const cors = require ('cors');
const mongoString = "mongodb+srv://baponc703:baponc703@cluster0.axmtkmm.mongodb.net/Institution_Project";
const Signup = require('./Signup');
const Movie = require('./Movie');
const Booking = require('./Booking');
const AdminSignup = require('./AdminSignup');
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

app.use(express.json());
app.use(cors())



//post api for signup

app.post('/signup', async (req, res) => {
    const data = new Signup({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
       

    })
    

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//get all signup details

app.get('/getAllSignup', async (req, res) => {
    try{
        const data = await Signup.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// login api

app.post('/userlogin', async (req, res) => {
    try{
        const data = await Signup.find({email: req.body.email,password: req.body.password});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


//Movie api
app.post('/movie', async (req, res) => {
    const data = new Movie({
        title: req.body.title,
        description: req.body.description,
        releaseDate: req.body.releaseDate,
        posterUrl: req.body.posterUrl,
        actors: req.body.actors,
        ticketPrice: req.body.ticketPrice

    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

// get all movie

app.get('/getAllMovie', async (req, res) => {
    try{
        const data = await Movie.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// get Movie by Id
app.get('/movie/:id', async (req, res) => {
    try{
        const data = await Movie.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// update Movie


app.get("/update/:id", async (req, res) => {
    let result = await Movie.findOne({ _id: req.params.id });
  
    if (result) {
      res.send(result);
    } else {
      res.send({ result: "No record found" });
    }
  });


  app.put("/update/:id", async (req, res) => {
    let result = await Movie.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.send(result);
  });


// delete the movie

app.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Movie.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// post api for booking

app.post('/bookingMovie', async (req, res) => {
    const data = new Booking({
        date: req.body.date,
        seatNumber: req.body.seatNumber,
        movie: req.body.movie,
       
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

// get all bookings

app.get('/getAllBooking', async (req, res) => {
    try{
        const data = await Booking.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//  get booking by id

app.get('/bookingMovie/:id', async (req, res) => {
    try{
        const data = await Booking.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


// post api for admin signup

app.post('/adminsignup', async (req, res) => {
    const data = new AdminSignup({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
       

    })
    

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})


// admin login

app.post('/adminlogin', async (req, res) => {
    try{
        const data = await AdminSignup.find({email: req.body.email,password: req.body.password});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})




 
 
 







app.listen(8000, () => {
    console.log(`Server Started at ${8000}`)
})