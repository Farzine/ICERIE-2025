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
  val_id?: string;
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

            {!paper.payment_status && (
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
            )}
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
                          {amount.toLocaleString()} {fees.currency}
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
        </div>
      ))}
    </div>
  );
}
