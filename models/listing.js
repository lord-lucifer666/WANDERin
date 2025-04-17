const mongoose = require('mongoose')
const schema=mongoose.Schema
const listingSchema=new schema({
    title :{
        type: String,
        required : true
    },
    description :{
        type : String
    },
    price :{
        type: Number,
        required: true
    },
    image :{
        filename : String,
        url :{
            type : String,
            default:"https://vectorified.com/images/default-image-icon-16.jpg",
            set : (v)=> v===""?"https://vectorified.com/images/default-image-icon-16.jpg":v,
        }
    },
    location :{
        type: String,
        required: true
    },
    country :{
        type: String,
        required: true
    },
})
const Listing=new mongoose.model("Listing",listingSchema)
module.exports=Listing
