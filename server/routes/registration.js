const express = require("express");
const {RegisterAttendee, getAllAttendee, getAttendeeByID} = require("../controllers/registerAttendee");
const regRouter = express.Router();

regRouter.post("/",RegisterAttendee);
regRouter.get("/",getAllAttendee);
regRouter.get("/:id",getAttendeeByID);

module.exports = regRouter;