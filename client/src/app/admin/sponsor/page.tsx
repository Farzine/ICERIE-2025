"use client";
import React, { useState, useEffect, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const UploadSponsorImagePage: React.FC = () => {
  const [images, setImages] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [sponsorName, setSponsorName] = useState("");
  const [sponsorType, setSponsorType] = useState(""); // New state for sponsor type
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const token = Cookies.get("token");
  if (!token) router.push("/admin");

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/sponsors`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched images:", data);
        setImages(data);
      } else {
        console.error("Error fetching images:", response.statusText);
        if (response.status === 403) {
          alert("Unauthorized: Please log in again.");
          router.push("/admin");
        }
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSponsorName(event.target.value);
  };

  const handleSponsorTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSponsorType(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("sponsorName", sponsorName);
    formData.append("sponsorType", sponsorType); // Include sponsorType in form data

    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/sponsors/upload`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      if (response.ok) {
        fetchImages();
        setFile(null);
        setSponsorName("");
        setSponsorType(""); // Reset sponsor type
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setSuccessMessage("Image uploaded successfully");
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        const errorText = await response.text();
        console.error("Error uploading image:", errorText);
        setErrorMessage("Failed to upload image. Please try again.");
        setTimeout(() => setErrorMessage(null), 3000);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setErrorMessage("Failed to upload image. Please try again.");
      setTimeout(() => setErrorMessage(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);

    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/sponsors/${id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        fetchImages();
        setSuccessMessage("Image deleted successfully");
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        console.error("Error deleting image:", response.statusText);
        if (response.status === 403) {
          alert("Unauthorized: Please log in again.");
          router.push("/admin");
        }
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      setErrorMessage("Failed to delete image. Please try again.");
      setTimeout(() => setErrorMessage(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-100">
      <Sidebar />

      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      <div
        className={`flex-1 p-4 md:p-8 overflow-y-auto bg-gray-100 h-screen ${
          loading ? "filter blur-sm" : ""
        }`}
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          Sponsor Management
        </h1>
        {images.length === 0 && <p>No sponsor items found</p>}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 mb-8 w-full md:w-1/3"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="border-4 border-white p-1"
          />
          <input
            type="text"
            value={sponsorName}
            onChange={handleDescriptionChange}
            placeholder="Enter Sponsor Name"
            className="border p-2"
          />
          <select
            value={sponsorType}
            onChange={handleSponsorTypeChange}
            className="border p-2"
          >
            <option value="" disabled>
              Select Sponsor Type
            </option>
            <option value="Media Partner">Media Partner</option>
            <option value="Technical Partner">Technical Partner</option>
            <option value="Supported By">Supported By</option>
          </select>
          <button
            type="submit"
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-full md:w-40"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Sponsor"}
          </button>
        </form>
        {/* Success message display */}
        {successMessage && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> {successMessage}</span>
          </div>
        )}

        {/* Error message display */}
        {errorMessage && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {errorMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image: any) => (
            <div
              key={image._id}
              className="flex flex-col md:flex-row justify-between items-center border p-4 rounded shadow-lg bg-[#eaefef]"
            >
              <div className="flex-1">
                <p className="mb-2 text-gray-700 truncate">
                  {truncateText(image.sponsorName, 30)}
                </p>
                <p className="mb-2 text-gray-500 truncate">
                  {image.sponsorType}
                </p>{" "}
                {/* Display sponsor type */}
                <button
                  onClick={() => handleDelete(image._id)}
                  className="mt-2 px-2 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors duration-200"
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </div>
              <div className="flex justify-center items-center h-24 sm:h-32 md:h-40">
                <img
                  src={image.path}
                  alt={image.sponsorName}
                  loading="eager"
                  className="object-contain max-h-full"
                  width="120"
                  height="120"
                />
              </div>
            </div>
          ))}
          {isLoading && <div>Loading...</div>}
        </div>
      </div>
    </div>
  );
};

export default UploadSponsorImagePage;
