// const express = require("express");
// const router = express.Router();
// const {
//   addPaperToAttendee,
//   payForPaper,
//   paySuccessForPaper,
//   payFailForPaper,
//   payCancelForPaper,
//   deletePaper,
// } = require("../controllers/paperPay");

// // 1) Add paper
// router.post("/:id/papers", addPaperToAttendee);

// // 2) Pay for a specific paper
// router.post("/:id/papers/:paperId/pay", payForPaper);

// // 3) Payment results
// router.post("/:id/papers/:paperId/paySuccess", paySuccessForPaper);
// router.post("/:id/papers/:paperId/payFail", payFailForPaper);
// router.post("/:id/papers/:paperId/payCancel", payCancelForPaper);
// router.delete("/:id/papers/:paperId", deletePaper);

// module.exports = router;


// routes/paperRoutes.js
const express = require("express");
const router = express.Router();
const { addPaperToAttendee, deletePaper } = require("../controllers/paperController");

router.post("/:id/paper", addPaperToAttendee);
router.delete("/:id/paper/:paperId", deletePaper);

module.exports = router;
