const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const UserModel = require("../models/user_model");

// signup route
router.post("/signup", (req, res) => {
    const { fullName, email, password, profileImg } = req.body;
    if (!fullName || !email || !password) {
        return res
            .status(400)
            .json({ error: "Please enter all mandotary fields" });
    }

    UserModel.findOne({ email: email })
        .then((userInDB) => {
            if (userInDB) {
                return res
                    .status(500)
                    .json({ error: "User with this email already exist" });
            }

            bcryptjs
                .hash(password, 16)
                .then((hashedPassword) => {
                    const user = new UserModel({
                        fullName,
                        email,
                        password: hashedPassword,
                        profileImg,
                    });
                    user.save()
                        .then((newUser) => {
                            res.status(201).json({
                                result: "User signed up successfully",
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
});

// login backend
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({ error: "Please enter all mandotary fields" });
    }
    UserModel.findOne({ email: email })
        .then((userInDB) => {
            if (!userInDB) {
                return res.status(401).json({ error: "Invalid Credentials" });
            }

            bcryptjs
                .hash(password, 16)
                .then((hashedPassword) => {
                    const user = new UserModel({
                        fullName,
                        email,
                        password: hashedPassword,
                        profileImg,
                    });
                    user.save()
                        .then((newUser) => {
                            res.status(201).json({
                                result: "User signed up successfully",
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;
