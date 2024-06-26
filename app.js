const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
require('dotenv').config();




const dbUrl = "mongodb+srv://Shoaib:Shoaib-1501@cluster0.vb1vuls.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
main()
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((err) => {
        console.log(err)
    });    

async function main() {
    await mongoose.connect(dbUrl);
}

app.listen(8080, () => {
    console.log('Server running on port 8080')
});
//CRUD OPERATIONS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('home/home.ejs');
}); 

app.get('/listings', async (req, res) => {
   const allListings = await Listing.find({});
   res.render('listings/index.ejs', {allListings});
});

app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
  });

app.get('/listings/:id', async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render('listings/show.ejs', {listing});
    });

app.post('/listings', async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

app.get('/listings/:id/edit', async (req, res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render('listings/edit.ejs', {listing});
});

app.put('/listings/:id', async (req, res) => {
    const {id} = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing, {...req.body.listing});
    res.redirect(`/listings/${id}`);
});

app.delete('/listings/:id', async (req, res) => {
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
});