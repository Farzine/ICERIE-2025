// app/attendee/[id]/papers/components/PaperList.tsx
"use client";
import React from "react";

interface PaperInterface {
  _id?: string;
  paperId: string;
  track: string;
  proceedingsPublication: string;
  fullPaperPublication: string;
  presentationType: string;
  payment_status: boolean;
  additionalPage?: number;
  val_id?: string;
  presentationMood?: string;
}

interface PaperListProps {
  papers: PaperInterface[];
  onPayPaper: (paper: PaperInterface) => void;
  onDeletePaper: (paper: PaperInterface) => void;
  category: string;
}

/**
 * Displays a list of papers. For each unpaid paper, shows "Pay Now" + "Delete" buttons.
 */
export default function PaperList({
  papers,
  onPayPaper,
  onDeletePaper,
  category,
}: PaperListProps) {
  if (!papers || papers.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 text-center">
        <p className="text-gray-600">No papers have been submitted yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {papers.map((paper) => (
        <div
          key={paper.paperId}
          className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-5"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <h3 className="font-bold text-2xl text-gray-800 mb-3">
                Paper ID: {paper.paperId}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 text-sm my-5">
                <div>
                  <p className="flex items-baseline">
                    <span className="font-medium text-gray-700 w-32 text-xl">
                      Track:
                    </span>
                    <span className="text-gray-800 text-xl">{paper.track}</span>
                  </p>
                  <p className="flex items-baseline">
                    <span className="font-medium text-gray-700 w-32 text-xl">
                      Presentation:
                    </span>
                    <span className="text-gray-800 text-xl">
                      {paper.presentationType}
                    </span>
                  </p>
                  { (
                    <p className="flex items-baseline">
                      <span className="font-medium text-gray-700 w-32 text-xl">
                        Addi. Pages:
                      </span>
                      <span className="text-gray-800 text-xl">
                        {paper.additionalPage}
                      </span>
                    </p>
                  )}
                </div>
                <div>
                  <p className="flex items-baseline">
                    <span className="font-medium text-gray-700 w-32 text-xl">
                      Proceedings:
                    </span>
                    <span className="text-gray-800 text-xl">
                      {paper.proceedingsPublication}
                    </span>
                  </p>
                  <p className="flex items-baseline">
                    <span className="font-medium text-gray-700 w-32 text-xl">
                      Full Paper:
                    </span>
                    <span className="text-gray-800 text-xl">
                      {paper.fullPaperPublication}
                    </span>
                  </p>
                  <p className="flex items-baseline">
                    <span className="font-medium text-gray-700 w-32 text-xl">
                      Presentation:
                    </span>
                    <span className="text-gray-800 text-xl">
                      {paper.presentationMood}
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <span className=" text-gray-700 text-2xl font-bold">
                  Status:{" "}
                </span>
                {paper.payment_status ? (
                  <span className="bg-green-100 text-green-800 font-semibold px-2.5 py-0.5 rounded-md text-xl">
                    Paid
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800 font-semibold px-2.5 py-0.5 rounded-md text-xl">
                    Unpaid
                  </span>
                )}
              </div>
            </div>

            {/* {!paper.payment_status && (
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row justify-center lg:justify-end items-center gap-3">
                <button
                  onClick={() => onPayPaper(paper)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-red-500 text-white rounded-md hover:bg-red-400 focus:ring-2 focus:ring-red-300 transition-colors font-medium text-xl"
                  aria-label={`Pay now for paper ${paper.paperId}`}
                >
                  Pay Now
                </button>
                <button
                  onClick={() => onDeletePaper(paper)}
                  className="w-full sm:w-auto px-5 py-2.5 border border-red-500 text-red-500 rounded-md hover:bg-red-50 focus:ring-2 focus:ring-red-300 transition-colors font-medium text-xl"
                  aria-label={`Delete paper ${paper.paperId}`}
                >
                  Delete
                </button>
              </div>
            )} */}
          </div>
          {/* Payment Amount Information */}
          {!paper.payment_status && (
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">
                Payment Information:
              </h4>
              <div className="space-y-2">
                {(() => {
                  const earlyBirdDeadline = new Date("2025-03-25T23:59:59Z");
                  const regularDeadline = new Date("2025-04-10T23:59:59Z");
                  const currentDate = new Date();

                  // Get fee structure based on attendee category
                  const getFeeStructure = () => {
                    switch (category) {
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
                        return { early: 5000, regular: 6000, currency: "BDT" };
                    }
                  };

                  const fees = getFeeStructure();
                  const isForeign = category?.includes("Foreign");

                  // Determine which fee applies
                  let amount, phase;
                  if (currentDate <= earlyBirdDeadline) {
                    amount = fees.early;
                    phase = "Early Bird";
                  } else if (currentDate <= regularDeadline) {
                    amount = fees.regular;
                    phase = "Regular";
                  } else {
                    phase = "Late";
                    amount = fees.regular; // Use regular fee but mark as late
                  }

                  const additionalPageFee = paper.additionalPage
                    ? paper.additionalPage * 1000
                    : 0;
                  const TotalAmount = amount + additionalPageFee;

                  return (
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">
                          Registration Phase:
                        </span>
                        <span
                          className={`font-medium ${
                            phase === "Late" ? "text-red-600" : "text-green-600"
                          }`}
                        >
                          {phase} Registration
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-gray-600">Payable Amount:</span>
                        <span className="font-bold text-gray-800">
                          {TotalAmount.toLocaleString()} {fees.currency}
                          {isForeign && (
                            <span className="ml-2 text-lg font-semibold text-gray-500">
                              (
                              {phase === "Early Bird"
                                ? fees.usd_early
                                : fees.usd_regular}{" "}
                              USD)
                            </span>
                          )}
                        </span>
                      </div>
                      {phase === "Late" && (
                        <p className="text-sm text-red-600 mt-1">
                          Note: Late registration fees apply.
                        </p>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

        {/* Payment Deadline Expired */}
          {!paper.payment_status && (
            <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between p-5 bg-white border-l-4 border-red-500 rounded-lg shadow-md">
            <div className="flex flex-col">
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-red-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900">
                  Payment Deadline Expired
                </h3>
              </div>
              <p className="text-base text-gray-600 mt-2 ml-8">
                The payment window for this paper closed on{" "}
                <span className="font-medium text-red-600">
                  10th April 2025
                </span>
                . Please contact the conference organizers for
                further assistance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:ml-4">
              <button
                onClick={() => onDeletePaper(paper)}
                className="inline-flex items-center justify-center px-5 py-2.5 bg-red-500 hover:bg-red-400 text-white rounded-md transition-all duration-300 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-base font-medium"
              >
                <svg
                  className="w-10 h-10 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Remove Paper
              </button>
            </div>
          </div>
          )}
          
        </div>
      ))}
    </div>
  );
}
