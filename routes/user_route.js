const router = require('express').Router();
const { check } = require('express-validator');
const userController = require('../controllers/user_controller');
const catchAsync = require('../utils/catch_async');

router.get('/signup', (req, res) => {
    const msgErrors = req.flash('errors');
    res.render('user/signup', {
        messages: msgErrors,
    });
});

router.post(
    '/signup',
    [
        check('email')
            .notEmpty()
            .withMessage('Email is Required')
            .isEmail()
            .withMessage('Email is not valid'),
        check('password')
            .notEmpty()
            .withMessage('Password is Required')
            .isLength({ min: 4 })
            .withMessage('Password must be at least 6 characters long')
            .matches(`^[A-Za-z0-9]+$`)
            .withMessage('Invalid Password'),
        check('confirmPassword')
            .notEmpty()
            .withMessage('Confirm Password is Required')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Passwords do not match');
                }
                return true;
            }),
    ],
    catchAsync(userController.signup)
);

module.exports = router;
