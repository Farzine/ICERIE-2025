"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { IoMdPrint } from "react-icons/io";
import { set } from "date-fns";

const PayslipPage = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  const paperId = searchParams.get("paperId");
  const [paymentsData, setPaymentsData] = useState<any>(null);
  const [paperData, setPaperData] = useState<any>(null);
  const invoiceRef = useRef<HTMLDivElement>(null);

  const BACKENDURL = process.env.NEXT_PUBLIC_APP_BACKEND_URL;

  useEffect(() => {
    if (!params.id) return;

    axios
      .get(`${BACKENDURL}/registration/${params.id}`)
      .then((response) => {
        console.log("Data fetched:", response.data);
        setPaymentsData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [BACKENDURL, params.id]);

  useEffect(() => {
    if (paymentsData && paperId) {
      const paper = paymentsData.papers.find(
        (paper: any) => paper.paperId === paperId
      );
      setPaperData(paper || null);
    }
  }, [paymentsData, paperId]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (invoiceRef.current) {
      const html2pdf = (await import("html2pdf.js")).default;
      html2pdf().from(invoiceRef.current).save(`Invoice-${paperData?.val_id}.pdf`);
    }
  };

  if (!params.id || !paperId || !paymentsData) {
    return (
      <div role="status" className="min-h-screen flex items-center justify-center">
    <svg aria-hidden="true" className="inline  w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>
    );
  }


  // console.log(paymentsData);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white text-slate-600 shadow-lg rounded-lg my-8 border border-gray-200 font-sans print:shadow-none print:border-0">
      <div ref={invoiceRef} className="p-3 sm:p-6">
        {/* Header */}
        <div className="border-b border-gray-200 pb-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="/icLogo.webp"
                  width={150}
                  height={80}
                  alt="ICERIE 2025 Logo"
                  className="h-10 sm:h-12 w-auto object-contain"
                />
                <img
                  src="/sustLogo.png"
                  alt="SUST Logo"
                  width={40}
                  height={40}
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              </div>
              <p className="text-lg sm:text-xl text-red-600 font-semibold text-center sm:text-left">
                8th International Conference on Engineering Research, Innovation
                and Education (ICERIE 2025)
              </p>
              <p className="text-sm text-slate-500 text-center sm:text-left">
                Shahjalal University of Science and Technology
              </p>
              <p className="text-sm text-slate-500 text-center sm:text-left">Sylhet, Bangladesh</p>
            </div>
            <div className="text-center sm:text-right mt-3 sm:mt-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 uppercase">Invoice</h1>
              <span className="text-lg sm:text-xl text-slate-700 font-semibold block"># {paperData?.val_id}</span>
            </div>
          </div>
        </div>

        {/* Attendee Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="font-semibold text-slate-800 mb-2 border-b pb-1">
              Participant Details
            </h2>
            <p className="text-slate-800 font-semibold">{paymentsData.name}</p>
            <p className="text-sm text-slate-600">{paymentsData.university}</p>
            <p className="text-sm text-slate-600 mt-2">
              <span className="font-medium">Email:</span> {paymentsData.email}
            </p>
            <p className="text-sm text-slate-600">
              <span className="font-medium">Phone:</span> {paymentsData.phone}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg sm:text-right">
            <h2 className="font-semibold text-slate-800 mb-2 border-b pb-1 sm:text-right">
              Payment Information
            </h2>
            <p className="text-sm text-slate-600">
              Validation ID: <span className="font-semibold text-slate-800">{paperData?.val_id}</span>
            </p>
            <p className="text-sm text-slate-600">
              Paper ID: <span className="font-semibold text-slate-800">{paperId}</span>
            </p>
            <p className="text-sm text-slate-600">
              Category: <span className="font-semibold text-slate-800">{paymentsData.category}</span>
            </p>
            <p className="text-sm text-slate-600 mt-2">
              Status: <span className="font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs">Paid</span>
            </p>
            <p className="text-sm text-slate-600 mt-2">
              Date: <span className="font-semibold text-slate-800">{new Date(paperData?.payment_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
            </p>
          </div>
        </div>

        {/* Paper Details */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border border-slate-200">Track</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border border-slate-200">Publication</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border border-slate-200">Presentation</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border border-slate-200">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border border-slate-200">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border border-slate-200">Phase</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border border-slate-200">Addi. Pages</th>
              </tr>
            </thead>
            <tbody>
              {paperData ? (
                <tr>
                  <td className="border border-slate-200 px-4 py-3 text-slate-600">{paperData.track}</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-600">{paperData.fullPaperPublication}</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-600">{paperData.presentationType}</td>
                  <td className="border border-slate-200 px-4 py-3">
                    {paperData.payment_status ? (
                      <span className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">Paid</span>
                    ) : (
                      <span className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold">Pending</span>
                    )}
                  </td>
                  {(() => {
                    const earlyBirdDeadline = new Date(
                      "2025-03-25T23:59:59Z"
                    );
                    const regularDeadline = new Date(
                      "2025-04-10T23:59:59Z"
                    );

                    // Get fee structure based on attendee category
                    const getFeeStructure = () => {
                      switch (paymentsData.category) {
                        case "Local Delegates (Author)":
                          return {
                            early: 6000,
                            regular: 7000,
                            currency: "BDT",
                          };
                        case "Local Delegates (Participant)":
                          return {
                            early: 5000,
                            regular: 6000,
                            currency: "BDT",
                          };
                        case "Local Students (Author/ Co-author)":
                          return {
                            early: 4000,
                            regular: 5000,
                            currency: "BDT",
                          };
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
                          return {
                            early: 5000,
                            regular: 6000,
                            currency: "BDT",
                          };
                      }
                    };

                    const fees = getFeeStructure();
                    const isForeign = paymentsData.category?.includes("Foreign");

                    // Determine which fee applies
                    let amount, phase;
                    const currentDate = new Date(paperData.payment_date);

                    if (currentDate <= earlyBirdDeadline) {
                      amount = fees.early;
                      phase = "Early Bird";
                    } else if (currentDate > earlyBirdDeadline && currentDate <= regularDeadline) {
                      amount = fees.regular;
                      phase = "Regular";
                    } else {
                      amount = fees.regular;
                      phase = "Regular";
                    }

                    // For foreign delegates, show USD equivalent in the phase description
                    if (isForeign) {
                      const usdAmount = phase === "Early Bird" ? fees.usd_early : fees.usd_regular;
                      phase = `${phase} (${usdAmount} USD)`;
                    }

                    const additionalPageFee = paperData.additionalPage
                      ? paperData.additionalPage * 1000
                      : 0;
                    const TotalAmount = amount + additionalPageFee;
                    return (
                      <>
                      <td className="border border-slate-200 px-4 py-3 text-slate-600">{TotalAmount} {fees.currency}</td>
                      <td className="border border-slate-200 px-4 py-3 text-slate-600">{phase}</td>
                      </>
                    );

                  })()}
                  <td className="border border-slate-200 px-4 py-3 text-slate-600">{paperData.additionalPage}</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={4} className="border px-4 py-3 text-center text-slate-500">
                    No Paper Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="text-sm text-slate-500 border-t border-gray-200 pt-6 mt-8">
          <div className="flex flex-col sm:flex-row justify-between">
            <div>
              <p className="mb-1">For payment inquiries: <a href="mailto:icerie2025@sust.edu" className="text-blue-600 hover:underline">icerie2025@sust.edu</a></p>
              <p>Thank you for your participation in ICERIE 2025!</p>
            </div>
            <div className="mt-3 sm:mt-0">
              <p className="text-xs text-slate-400">Document generated on: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Print & Download Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center justify-center px-4 py-2 border-2 border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition-colors duration-200 gap-2"
        >
          <IoMdPrint className="h-5 w-5" />
          <span>Print Invoice</span>
        </button>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center justify-center px-4 py-2 bg-slate-800 text-white border-2 border-slate-800 rounded-md hover:bg-white hover:text-slate-800 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default PayslipPage;
