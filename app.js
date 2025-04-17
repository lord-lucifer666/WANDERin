const express = require('express')
const mongoose = require('mongoose')
const Listing = require('./models/listing.js')
const ejsMate = require('ejs-mate');
const path = require('path')
const methodOverride = require("method-override");

const app = express()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('ejs', ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
    .then(res => console.log("Connected to DB"))
    .catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/WANDERin');
}

const port = 8080;
app.get("/", (req, res) => {
    res.redirect("/home")
})
app.get("/home", async (req, res) => {
    let allListings = await Listing.find({})
    res.render('index', { allListings })
})

app.get("/listings/new", (req, res) => {
    res.render('listing/newListing')
})
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params
    let listing = await Listing.findById(id)
    res.render('listing/showListing', { listing })
})
app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.Listing)
    await newListing.save()
    res.redirect("/home")
})
app.get("/listings/edit/:id", async (req, res) => {
    let { id } = req.params
    let listing = await Listing.findById(id)
    res.render("listing/editListing", { listing })
})
app.patch("/listings/:id/", async (req, res) => {
    let { id } = req.params
    await Listing.findByIdAndUpdate(id, { ...req.body.Listing })
    res.redirect(`/listings/${id}`)
})
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params
    await Listing.findByIdAndDelete(id)
    res.redirect("/home")
})

app.listen(port, () => {
    console.log(`Listening on port ${port} !`)
})