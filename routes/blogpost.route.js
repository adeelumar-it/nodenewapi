const express = require("express");
const router = express.Router();
const blogModel = require("../models/BlogPost");
const bcrypt = require('bcryptjs');

// Route to create a new user
router.post('/', async (req, res) => {
    const { userid, blogtitle, blogdescription, blgIMG_64, publishdate } = req.body;

    const newPost = new blogModel({
        userid,
        blogtitle,
        blogdescription,
        blgIMG_64,
        publishdate,
    });

    try {
        const newData = await newPost.save();
        res.status(201).json(newData);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
