"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import { IoMdPrint } from "react-icons/io";

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
    <div className="max-w-4xl mx-auto my-auto p-6 bg-white text-slate-500 shadow-md rounded mt-10 border font-sans">
      <div ref={invoiceRef} className="p-6">
        {/* Header */}
        <div className="border-b pb-6 mb-6 flex items-center">
          <div className="flex-1">
            <div className="logo flex gap-2">
            <Image
              src="https://res.cloudinary.com/djmgdgx86/image/upload/v1724840698/icerieLogo_zkafbk.jpg"
              width={150}
              height={150}
              alt="ICERIE 2025 Logo"
              className="h-12 w-auto"
            />
            <Image
              src="/sustLogo.png"
              alt="sust logo"
              width={40}
              height={40}
            
            />
            </div>
            <p className="text-xl text-red-500 font-semibold ">
              8th International Conference on Engineering Research, Innovation
              and Education (ICERIE 2025)
            </p>
            <p className="text-sm text-slate-500">
              Shahjalal University of Science and Technology
            </p>
            <p className="text-sm text-slate-500">Sylhet, Bangladesh</p>
          </div>
          <h1 className="text-3xl font-bold text-slate-700 flex flex-col uppercase text-right">
            #Invoice
            <span className="text-xl">{paperData?.val_id}</span> 
          </h1>
          
        </div>

        {/* Attendee Info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h2 className="font-semibold text-slate-700">
              Participant Details:
            </h2>
            <p className="text-black font-semibold">{paymentsData.name}</p>
            <p className="text-sm text-slate-500">{paymentsData.university}</p>
            <p className="text-sm text-slate-500">
              Email: {paymentsData.email}
            </p>
            <p className="text-sm text-slate-500">
              Phone: {paymentsData.phone}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500">
              Validation ID #:{" "}
              <span className="font-semibold text-black">
                {paperData?.val_id}
              </span>
            </p>
            <p className="text-sm text-slate-500">Paper ID: {paperId}</p>
            <p className="text-sm text-slate-500">
              Category: {paymentsData.category}
            </p>
            <p className="text-sm text-slate-500 my-2">
              Payment Status:{" "}
              <span className="font-semibold text-md text-green-700">
                Paid
              </span>
            </p>
            <p className="text-sm text-slate-500 my-2">
             Payment Date :  <span className="font-semibold text-black">{new Date(paperData?.payment_date).toLocaleDateString()}</span>
             
            </p>
          </div>
        </div>

        {/* Paper Details */}
        <table className="min-w-full table-auto mb-6 border border-slate-200">
          <thead>
            <tr className="bg-slate-100">
              <th className="px-4 py-2 text-left">Track</th>
              <th className="px-4 py-2 text-left">Publication</th>
              <th className="px-4 py-2 text-left">Presentation</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {paperData ? (
              <tr>
                <td className="border px-4 py-2">{paperData.track}</td>
                <td className="border px-4 py-2">
                  {paperData.fullPaperPublication}
                </td>
                <td className="border px-4 py-2">
                  {paperData.presentationType}
                </td>
                <td className="border px-4 py-2 text-green-700 font-semibold">
                  {paperData.payment_status ? "Paid" : "Pending"}
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={4} className="border px-4 py-2 text-center">
                  No Paper Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
         
        {/* Footer */}
        <div className="text-sm text-slate-500 border-t pt-6">
          <p>Payment inquiries: icerie2025@sust.edu</p>
          <p>Thank you for your participation!</p>
        </div>
      </div>

      {/* Print & Download Buttons */}
      <div className="flex justify-end space-x-4 mt-4">
        <button
          onClick={handlePrint}
          className="group px-4 py-2 border-2 border-red-500 text-red-500 rounded shadow hover:bg-red-500 hover:text-white"
        >
          <IoMdPrint className="inline-block text-red-500 mr-2 h-5 w-5 group-hover:text-white" />
          Print
        </button>
        <button
          onClick={handleDownloadPDF}
          className="px-4 py-2 bg-black text-white rounded shadow hover:bg-white hover:text-black hover:border-black border-2"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default PayslipPage;
