"use client";
import React, { useState } from "react";

interface AddPaperFormProps {
  /** If it's the first paper, we should ask for visaSupport, tourInterested. */
  isFirstPaper: boolean;
  /** Tells the parent if we're currently submitting to disable the button, etc. */
  formSubmitting: boolean;
  /** Callback to parent once the form is submitted. */
  onAddPaper: (formData: {
    paperId: string;
    track: string;
    proceedingsPublication: string;
    fullPaperPublication: string;
    presentationType: string;
    visaSupport?: string;
    tourInterested?: boolean;
    presentationMood: string;
    additionalPage?: number;
  }) => void;
}

/**
 * Renders a professional form for adding a new paper.
 * If isFirstPaper = true, we also show visaSupport and tourInterested fields.
 */
export default function AddPaperForm({
  isFirstPaper,
  formSubmitting,
  onAddPaper,
}: AddPaperFormProps) {
  // Local states for form fields
  const [paperId, setPaperId] = useState("");
  const [track, setTrack] = useState("");
  const [proceedingsPublication, setProceedingsPublication] = useState("");
  const [fullPaperPublication, setFullPaperPublication] = useState("");
  const [presentationType, setPresentationType] = useState("");
  const [presentationMood, setPresentationMood] = useState("");
  const [additionalPage, setAdditionalPage] = useState(0);

  // Only used if it's the first paper
  const [visaSupport, setVisaSupport] = useState("No");
  const [tourInterested, setTourInterested] = useState(false);

  // Field focus states for showing descriptions
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPaperData: any = {
      paperId,
      track,
      proceedingsPublication,
      fullPaperPublication,
      presentationType,
      presentationMood,
      additionalPage,
    };
    if (isFirstPaper) {
      newPaperData.visaSupport = visaSupport;
      newPaperData.tourInterested = tourInterested;
    }
    console.log("New paper data:", newPaperData);
    // Call parent's callback
    onAddPaper(newPaperData);

    // Clear fields after submission
    setPaperId("");
    setTrack("");
    setProceedingsPublication("");
    setFullPaperPublication("");
    setPresentationType("");
    setVisaSupport("No");
    setPresentationMood("");
    setTourInterested(false);
    setAdditionalPage(0);
  };

  // Descriptions for each field
  const fieldDescriptions = {
    proceedingsPublication:
      "(Only for papers accepted for oral presentation) Please note that if you are interested for published in our proceeding, an additional service charge (BDT 7500) will be added. A separate email will send to all authors regarding this publication. The publisher is Atlantis Press (part of Springer Nature)",
    fullPaperPublication:
      "The softcopy of the full paper may be distributed in Pen drive (included in registration fee)",
    presentationType:
      "Are you registering for poster or oral (According to your acceptance email)?",
    visaSupport: "Do you need visa support letter? (foreign delegates)",
    tourInterested:
      'An attractive tour will be arranged for delegates and accompanying persons to a beautiful location in Sylhet named "SADA PATHOR" in Volagonj. It is adjacent to the Indian boarder. The location is one-hour travelling distance from conference venue. Those who want to participate in the tour must registrar separately paying the required fees: BDT 1500 for Adults and BDT 1000 for Children above three years. Payment should make in cash during conference',
    additionalPage:
      "Registration fee covers a paper with 6 pages only. For additional each page the author should pay 1000 BDT per page.",
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full">
      <h3 className="text-2xl font-bold mb-6 text-red-500 border-b border-gray-200 pb-3">
        New Paper Submission
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Paper ID */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Paper ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent"
              value={paperId}
              onChange={(e) => setPaperId(e.target.value)}
              placeholder="Enter paper ID"
              required
            />
          </div>

          {/* Track */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Track <span className="text-red-500">*</span>
            </label>
            <select
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              value={track}
              onChange={(e) => setTrack(e.target.value)}
              required
            >
              <option value="">-- Select Track --</option>
              <option value="Architecture, Civil and Environmental Engineering">
                Architecture, Civil and Environmental Engineering
              </option>
              <option value="Chemical, Petroleum and Food Process Engineering">
                Chemical, Petroleum and Food Process Engineering
              </option>
              <option value="Electrical, Information and Communication Engineering">
                Electrical, Information and Communication Engineering
              </option>
              <option value="Mechanical, Industrial and Sustainable Engineering">
                Mechanical, Industrial and Sustainable Engineering
              </option>
            </select>
          </div>

          {/* Proceedings Publication */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Proceedings Publication <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              <select
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={proceedingsPublication}
                onChange={(e) => setProceedingsPublication(e.target.value)}
                onFocus={() => setFocusedField("proceedingsPublication")}
                onBlur={() => setFocusedField(null)}
                required
              >
                <option value="">-- Select Option --</option>
                <option value="I will publish">I will publish</option>
                <option value="I will not publish">I will not publish</option>
              </select>

              <div className="text-base md:text-lg bg-gray-50 p-2 md:p-3 border-l-4 border-red-500 rounded transition-all duration-200 opacity-100 max-h-40 md:max-h-60 overflow-y-auto">
                {fieldDescriptions.proceedingsPublication}
              </div>
            </div>
          </div>

          {/* Full Paper Publication */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Select Yes If you are interested to publish Softcopy{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              <select
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={fullPaperPublication}
                onChange={(e) => setFullPaperPublication(e.target.value)}
                onFocus={() => setFocusedField("fullPaperPublication")}
                onBlur={() => setFocusedField(null)}
                required
              >
                <option value="">-- Select Option --</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>

              <div className="text-base md:text-lg bg-gray-50 p-2 md:p-3 border-l-4 border-red-500 rounded transition-all duration-200 opacity-100 max-h-40 md:max-h-60 overflow-y-auto">
                {fieldDescriptions.fullPaperPublication}
              </div>
            </div>
          </div>

          {/* Presentation Type */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Presentation Type <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              <select
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={presentationType}
                onChange={(e) => setPresentationType(e.target.value)}
                onFocus={() => setFocusedField("presentationType")}
                onBlur={() => setFocusedField(null)}
                required
              >
                <option value="">-- Select Option --</option>
                <option value="poster">Poster</option>
                <option value="oral">Oral</option>
              </select>

              <div className="text-base md:text-lg bg-gray-50 p-2 md:p-3 border-l-4 border-red-500 rounded transition-all duration-200 opacity-100 max-h-40 md:max-h-60 overflow-y-auto">
                {fieldDescriptions.presentationType}
              </div>
            </div>
          </div>

          {/* Presentation Mode */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              What is you prefer mode of presentation ?{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              <select
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={presentationMood}
                onChange={(e) => setPresentationMood(e.target.value)}
                onFocus={() => setFocusedField("presentationMode")}
                onBlur={() => setFocusedField(null)}
                required
              >
                <option value="">-- Select Option --</option>
                <option value="physical">Physical</option>
                <option value="online">Online</option>
              </select>
            </div>
          </div>

          {/* Additional Page */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">
              Additional Page
              <span className="text-red-500">*</span>
            </label>
            <div className="space-y-3">
              <input
                type="number"
                min={0}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={additionalPage}
                onChange={(e) => setAdditionalPage(Number(e.target.value))}
                placeholder="Enter additional page count"
              />

              <div className="text-base md:text-lg bg-gray-50 p-2 md:p-3 border-l-4 border-red-500 rounded transition-all duration-200 opacity-100 max-h-40 md:max-h-60 overflow-y-auto">
                {fieldDescriptions.additionalPage}
              </div>
            </div>
          </div>

          {/* If first paper => visaSupport, tourInterested */}
          {isFirstPaper && (
            <>
              <div className="flex flex-col">
                <label className="mb-2 font-medium text-gray-700">
                  Visa Support
                </label>
                <div className="space-y-3">
                  <select
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    value={visaSupport}
                    onChange={(e) => setVisaSupport(e.target.value)}
                    onFocus={() => setFocusedField("visaSupport")}
                    onBlur={() => setFocusedField(null)}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>

                  <div className="text-base md:text-lg bg-gray-50 p-2 md:p-3 border-l-4 border-red-500 rounded transition-all duration-200 opacity-100 max-h-40 md:max-h-60 overflow-y-auto">
                    {fieldDescriptions.visaSupport}
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-medium text-gray-700">
                  Interested in Tour?
                </label>
                <div className="space-y-3">
                  <select
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    value={tourInterested ? "Yes" : "No"}
                    onChange={(e) =>
                      setTourInterested(e.target.value === "Yes")
                    }
                    onFocus={() => setFocusedField("tourInterested")}
                    onBlur={() => setFocusedField(null)}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>

                  <div className="text-base md:text-lg bg-gray-50 p-2 md:p-3 border-l-4 border-red-500 rounded transition-all duration-200 opacity-100 max-h-40 md:max-h-60 overflow-y-auto">
                    {fieldDescriptions.tourInterested}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-8">
          <button
            type="submit"
            disabled={formSubmitting}
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Submit Paper"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
