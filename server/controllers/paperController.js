// controllers/paperController.js
const Attendee = require("../models/attendee");

const addPaperToAttendee = async (req, res) => {
    try {
        const { id } = req.params;
        const {
          // For the paper
          paperId,
          track,
          proceedingsPublication,
          fullPaperPublication,
          presentationType,
          // Only used if first paper
          visaSupport,
          tourInterested,
          presentationMood
        } = req.body;


      
        const attendee = await Attendee.findById(id);
        if (!attendee) {
          return res.status(404).json({ message: "Attendee not found" });
        }
    
        // If this is the first paper, set visaSupport and tourInterested
        if (attendee.papers.length === 0) {
          attendee.visaSupport = visaSupport;
          attendee.tourInterested = tourInterested;
         
        }
    
        // Create a new paper object
        const newPaper = {
          paperId,
          track,
          proceedingsPublication,
          fullPaperPublication,
          presentationType,
          presentationMood,
        };
    
        // Add it to the attendee’s papers array
        attendee.papers.push(newPaper);
    
        // Save
        await attendee.save();
    
        return res.status(201).json({
          message: "Paper added successfully",
          attendee,
        });
      } catch (error) {
        console.error("Error adding paper:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
};



const deletePaper = async (req, res) => {
    try {
      const { id, paperId } = req.params;
  
      const attendee = await Attendee.findById(id);
      if (!attendee) {
        return res.status(404).json({ message: "Attendee not found" });
      }
  
      // Find the paper index in the array
      const paperIndex = attendee.papers.findIndex(
        (p) => p.paperId === paperId
      );
      if (paperIndex === -1) {
        return res.status(404).json({ message: "Paper not found" });
      }
  
      // If the paper is paid, forbid deletion
      if (attendee.papers[paperIndex].payment_status) {
        return res.status(400).json({ message: "Paper is already paid. Cannot delete." });
      }
  
      // Remove the paper from the array
      attendee.papers.splice(paperIndex, 1);
      await attendee.save();
  
      return res.json({
        message: "Paper deleted successfully",
        attendee,
      });
    } catch (error) {
      console.error("Error deleting paper:", error);
      return res.status(500).json({ message: error.message });
    }
  };

  
  module.exports = { addPaperToAttendee, deletePaper };
