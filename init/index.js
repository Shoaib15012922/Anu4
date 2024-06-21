const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require("../models/listing.js");
require('dotenv').config();


const dbUrl = "mongodb+srv://Shoaib:Shoaib-1501@cluster0.vb1vuls.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
main()
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });    

async function main() {
    await mongoose.connect(dbUrl);};

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log('Data was initilized');
}

initDB();

