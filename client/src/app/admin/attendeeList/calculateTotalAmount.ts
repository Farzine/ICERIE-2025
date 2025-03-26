import { useState, useEffect } from "react";

interface PaymentHistory {
    val_id: string;
    amount: number;
    date: string;
  }
  
  interface Paper {
    paperId: string;
    track: string;
    proceedingsPublication: string;
    fullPaperPublication: string;
    presentationType: string;
    presentationMood: string;
    payment_status: boolean;
    payment_date?: string;
    val_id?: string;
    additionalPage?: number;
    payment_history?: PaymentHistory[];
  }
  
  interface Attendee {
    _id: string;
    name: string;
    email: string;
    phone: string;
    category: string;
    university: string;
    photoUrl: string;
    currency: string;
    regular_fee: number;
    early_bird_fee: number;
    visaSupport: "Yes" | "No";
    tourInterested: boolean;
    papers: Paper[];
  }


// You can place this anywhere outside your component (e.g., top of file).
export default function calculatePaidAmount(attendee: Attendee, paper: Paper, paymentHistory: PaymentHistory | null): number {
    // For demonstration, we’ll replicate the same logic you used in the table:
    // Deadlines
    const earlyBirdDeadline = new Date("2025-03-25T23:59:59Z");
    const regularDeadline = new Date("2025-04-10T23:59:59Z");
  
    
    // If you want to base it on the paper.payment_date (when the user actually paid):
    // If there's no payment_date, fallback to "now" or do any default you like.
    let paymentDate;
    if(paymentHistory) {
      paymentDate = new Date(paymentHistory?.date);
    } else if (paper.payment_date) {
      paymentDate = new Date(paper.payment_date);
    }
    else {
      paymentDate = new Date();
    }
  
    // Helper function to get the fee structure based on category
    const getFeeStructure = () => {
      switch (attendee.category) {
        case "Local Delegates (Author)":
          return { early: 6000, regular: 7000, currency: "BDT" };
        case "Local Delegates (Participant)":
          return { early: 5000, regular: 6000, currency: "BDT" };
        case "Local Students (Author/ Co-author)":
          return { early: 4000, regular: 5000, currency: "BDT" };
        case "Foreign Delegates":
          return {
            early: 43750,
            regular: 56250,
            currency: "BDT",
            usd_early: 350,
            usd_regular: 450,
          };
        case "Foreign Students":
          return {
            early: 25000,
            regular: 31250,
            currency: "BDT",
            usd_early: 200,
            usd_regular: 250,
          };
        default:
          // Some sensible default
          return { early: 5000, regular: 6000, currency: "BDT" };
      }
    };
  
    const fees = getFeeStructure();
  
    // Decide which fee applies based on paymentDate
    let baseFee = 0;
    if (paymentDate <= earlyBirdDeadline) {
      baseFee = fees.early; // Early Bird
    } else if (paymentDate <= regularDeadline) {
      baseFee = fees.regular; // Regular
    } else {
      baseFee = fees.regular; // Late (for demonstration, same as regular)
    }
  
    // Additional pages
    const additionalPageFee = paper.additionalPage
      ? paper.additionalPage * 1000
      : 0;
  
    return baseFee + additionalPageFee;
  }
  