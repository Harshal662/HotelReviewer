const mongoose = require('mongoose')
const Campground = require('../models/campground')  
const cities = require('./cities')
const { descriptors, places } = require('./seedHelper')

//mongoose.connect('mongodb://localhost:27017/YelpCamp')
mongoose.connect('')  //paste your DBURL here as it is not able to acccess it directly from env file
    .then(data => console.log("Database connected"))
    .catch(err => console.log("Database connection failed"))

const giveRandomElement = arr => arr[Math.floor(Math.random() * arr.length)]

const seedDb = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 400; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const camp = new Campground({
            title: `${giveRandomElement(descriptors)} ${giveRandomElement(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            description: 'Hi this is test description. hello, how are you.',
            images: [
                {
                    url: "https://res.cloudinary.com/dadofl3n9/image/upload/v1666765509/YelpCamp/h9vxoqkca451x6xgecoy.jpg",
                    filename: "YelpCamp/h9vxoqkca451x6xgecoy"
                }],
            price: random1000 / 10,
            author: '6215efde9cedc4e742d7b533'
        })
        await camp.save()
    }
}

seedDb()
    .then(() => {
        mongoose.connection.close() 
    })