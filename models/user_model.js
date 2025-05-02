const bcrypt = require('bcrypt')
const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
})

userSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, 12)
    next()
})

userSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}

module.exports = model("User", userSchema);