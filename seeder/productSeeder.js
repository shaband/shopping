const mongoose = require('mongoose');
const Product = require('../models/Product');
const faker = require('faker');
mongoose.connect('mongodb://localhost/shopping');


for (var i = 0; i < 10; i++) {
    product = new Product({
        image: faker.image.image(),
        title: faker.commerce.product(),
        desctiption: faker.lorem.paragraph(),
        price: faker.commerce.price()
    }).save().then(() => {
        console.log(i);
        if (i === 10) {
            exit();
        }
    });

};

function exit() {
    mongoose.disconnect();
    console.log('done');
}