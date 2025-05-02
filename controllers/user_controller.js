const User = require('../models/user_model');
const { validationResult } = require('express-validator');

exports.signup = async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
        console.log(result.errors)
        res.render('error', {
            message: result.errors[0].msg,
        })
    } else {
        const user = await User.create(req.body)
        res.send({
            status: 'success',
            message: 'User created successfully',
            data: {
                id: user._id,
                user: user,
            },
        })
    }
}