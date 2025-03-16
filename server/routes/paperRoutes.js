
// routes/paperRoutes.js
const express = require("express");
const router = express.Router();
const { addPaperToAttendee, deletePaper } = require("../controllers/paperController");

router.post("/:id/paper", addPaperToAttendee);
router.delete("/:id/paper/:paperId", deletePaper);

module.exports = router;
