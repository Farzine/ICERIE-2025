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
}

/**
 * Displays a list of papers. For each unpaid paper, shows "Pay Now" + "Delete" buttons.
 */
export default function PaperList({ papers, onPayPaper, onDeletePaper }: PaperListProps) {
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
                    <span className="font-medium text-gray-700 w-32 text-xl">Track:</span>
                    <span className="text-gray-800 text-xl">{paper.track}</span>
                  </p>
                  <p className="flex items-baseline">
                    <span className="font-medium text-gray-700 w-32 text-xl">Presentation:</span>
                    <span className="text-gray-800 text-xl">{paper.presentationType}</span>
                  </p>
                </div>
                <div>
                  <p className="flex items-baseline">
                    <span className="font-medium text-gray-700 w-32 text-xl">Proceedings:</span>
                    <span className="text-gray-800 text-xl">{paper.proceedingsPublication}</span>
                  </p>
                  <p className="flex items-baseline">
                    <span className="font-medium text-gray-700 w-32 text-xl">Full Paper:</span>
                    <span className="text-gray-800 text-xl">{paper.fullPaperPublication}</span>
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <span className=" text-gray-700 text-2xl font-bold">Status: </span>
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
        </div>
      ))}
    </div>
  );
}
