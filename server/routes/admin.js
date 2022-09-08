const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');


const { sendUser, replaceKeys } = require('../utils/helpers');
const { ensureAuth, ensureGuast } = require('../config/auth');

const { GENERAL, SUPER } = require("../utils/Role");

const Admin = require('../models/Admin');
const Event = require('../models/Event');


// curl --location -X POST 'http://localhost:4000/api/admin/register' -H 'Content-Type: application/json' -H 'Cookie: connect.sid=s%3AzL3n82ulv33g6ZGI9JI866DTawUrP9sX.u13Y%2Fn7Sf0XJLRNB7%2Bxw7RTwpVqeRIQkeiPG%2BkIY2iE' --data-raw '{ "email": "ronaldo@mutd.com", "username": "Ronaldo",  "password": "Ronaldo1234" }'
/* ⛏️⛏️ ALL ROUTES WILL BE PROTECTED EXCEPT LOGIN ROUTE  */
router.post('/register',
    ensureAuth,
    check('username', "Must input a name").notEmpty(),
    // username must be an email
    check('email', "Email must not empty and a valid email").notEmpty().isEmail(),
    // password must be at least 5 chars long
    check('password', "Password should be more than 5 character long").isLength({ min: 5 }),
    // check('role', "You must select a role").notEmpty(),
    (req, res, next) => {
        const allErr = new Array();
        if (req.user.role === SUPER) {
            // console.log(req.body);
            const { email, username, password } = req.body;
            const valErrs = validationResult(req);
            if (!valErrs.isEmpty()) {
                const errArr = allErr.concat(valErrs.errors);
                return res.status(400).json({ errors: errArr });
            }
            Admin.findOne({ email }, (err, emailResult) => {
                if (err) throw err;
                if (emailResult) {
                    allErr.push({ msg: "Email already exist" });
                    return res.status(400).json({ errors: allErr });
                } else {
                    // SAVE ADMIN 
                    bcrypt.genSalt(10, (saltErr, salt) => {
                        bcrypt.hash(password, salt, (hashErr, hash) => {
                            // const newAdmin = new Admin({ name: username, email, role, password: hash });
                            // newAdmin.save();
                            // console.log(username, email, role, password, hash);
                            Admin.create({ name: username, email, role: GENERAL, password: hash }, (err, docs) => {
                                if (err) throw err;
                                return res.status(201).json({ admin: docs });
                            })
                        });
                    });
                }
            });
        } else {
            allErr.push({ msg: "You are not a super user" });
            return res.status(400).json({ errors: allErr });
        }
    });

/* ⛏️⛏️ LOGIN USERS ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */
router.post('/login',
    passport.authenticate('local'),
    function (req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        // console.log("User - ", req.user);
        res.status(200).json({ user: sendUser(req.user) });
    });


router.get('/list', ensureAuth, async (req, res, next) => {
    // console.log(req.user.role);
    try {
        const admin = await Admin.find();
        const newAdmins = admin.map((a, i) => {
            return {
                name: a.name,
                role: a.role,
                _id: a._id,
                email: a.email
            }
        });
        // for (let index = 0; index < admin.length; index++) {
        //     newAdmins.push({})
        // }
        res.status(200).json({ admin: newAdmins });
    } catch (error) {
        console.log(error);
    }
});

router.delete("/delete/:adminID", ensureAuth, async (req, res, next) => {
    const errors = [];
    // console.log(req.params.adminID , req.user._id);
    if (req.user.role === SUPER) {
        if (req.params.adminID === req.user._id) {
            errors.push("Can't delete a super user");
            res.status(400).json({ errors });
        } else {
            try {
                const deleteAdmin = await Admin.deleteOne({ _id: req.params.adminID });
                res.status(200).json({ deleteAdmin });
            } catch (error) {
                console.log(error);
            }
        }
    } else {
        errors.push("You are not a super user")
        res.status(400).json({ errors });
    }
});


/* ⛏️⛏️ LOGOUT USERS ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */
router.get('/logout', ensureAuth, (req, res) => {
    req.session.destroy(null);
    req.logout();
    // console.log(req.user);
    res.status(200).json({ user: null });
});






/* ⛏️⛏️ LIST ALL ADMINS, EVENTS, PARTICIPANTS ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */
router.get('/dashboard', ensureAuth, (req, res, next) => {
    res.status(200).json({ user: sendUser(req.user) });
});









module.exports = router;