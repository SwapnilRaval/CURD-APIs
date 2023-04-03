"use strict";
const db = require("../models");
const Contact = db.contact;

exports.searchContact = async (req, res)=> {
    try {
        const search  = req.body.search;
        console.log(search)
        Contact.find({
            $or: [
                {name : {$regex: search , $options: "i"}},
                {contact_no : {
                    $in: search}},
                {address : {$regex: search , $options: "i"}},
                {zip : {$regex: search , $options: "i"}}
            ]
    }).then((data)=> {
            res.status(200).send({
                success: true,
                data
            });
        }).catch((err) => {
            res.status(500).send({
                success: false,
                message: err.message
            });
        });
    } catch (err) {
        res.status(404).send({
            success: false,
            message: err.message
        });
    }
}