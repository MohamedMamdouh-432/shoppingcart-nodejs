const {Schema, model} = require('mongoose')

const productSchema = new Schema({
    imgUrl: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    info: {
        required: true,
        type: {
            storageCapacity: Number,
            numberOfSIM: String,
            cameraResolution: Number,
            displaySize: Number,
        },
    },
    price: {
        type: Number,
        required: true,
    },
})

module.exports = model("Product", productSchema);
