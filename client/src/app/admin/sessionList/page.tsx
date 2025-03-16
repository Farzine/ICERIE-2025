"use client";

import ScrollToTopButton from "@/components/ScrollToTopButton";
import Sidebar from "@/components/Sidebar";
import { format } from "date-fns";
import { se } from "date-fns/locale";
import Cookies from "js-cookie";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

interface SessionListItem {
  _id: string;
  sessionTheme: string;
  venue: string;
  start_time: string;
  end_time: string;
}

const SessionList: React.FC = () => {
  const [sessionListItems, setSessionListItems] = useState<SessionListItem[]>(
    []
  );
  const [sessionTheme, setSessionTheme] = useState<string>("");
  const [venue, setVenue] = useState<string>("");
  const [start_time, setStartTime] = useState<string | null>(null);
  const [end_time, setEndTime] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const token = Cookies.get("token");
  if (!token) router.push("/admin");

  useEffect(() => {
    fetchSessionListItems();
  }, []);

  const fetchSessionListItems = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/sessionList`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setSessionListItems(data);
      } else {
        throw new Error("Failed to fetch SessionList items");
      }
    } catch (error) {
      console.error("Error fetching SessionList items:", error);
      setError("Failed to fetch SessionList items. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSessionListItem = async () => {
    if (!sessionTheme || !venue || !start_time || !end_time) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);

    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/sessionList/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({
            sessionTheme: sessionTheme,
            venue: venue,
            start_time,
            end_time,
          }),
        }
      );
      if (response.ok) {
        fetchSessionListItems();
        setSessionTheme("");
        setVenue("");
        setStartTime(null);
        setEndTime(null);
        setError(null);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        throw new Error("Failed to add SessionList item");
      }
    } catch (error) {
      console.error("Error adding SessionList item:", error);
      setError("Failed to add SessionList item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSessionListItem = async (id: string) => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      if (!token) router.push("/admin");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/sessionList/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        fetchSessionListItems();
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        throw new Error("Failed to delete SessionList item");
      }
    } catch (error) {
      console.error("Error deleting SessionList item:", error);
      setError("Failed to delete SessionList item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditSessionListItem = async () => {
    if (!editId || !sessionTheme || !venue || !start_time || !end_time) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);

    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/sessionList/edit/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({
            sessionTheme: sessionTheme,
            venue: venue,
            start_time,
            end_time,
          }),
        }
      );
      if (response.ok) {
        fetchSessionListItems();
        setSessionTheme("");
        setVenue("");
        setStartTime(null);
        setEndTime(null);
        setEditId(null);
        setError(null);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        throw new Error("Failed to edit SessionList item");
      }
    } catch (error) {
      console.error("Error editing SessionList item:", error);
      setError("Failed to edit SessionList item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (item: SessionListItem) => {
    setSessionTheme(item.sessionTheme);
    setVenue(item.venue);
    setStartTime(item.start_time);
    setEndTime(item.end_time);
    setEditId(item._id);
  };

  const handleCancelEdit = () => {
    setSessionTheme("");
    setVenue("");
    setStartTime(null);
    setEndTime(null);
    setEditId(null);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />

      {/* Loading Spinner Overlay */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-60 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
        </div>
      )}

      {/* Main Content Area */}
      <div
        className={`flex-1 p-5 md:p-8 overflow-y-auto bg-gray-50 h-screen transition-all ${
          loading ? "filter blur-sm" : ""
        }`}
      >
        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 border-b pb-3">
          Session List Management
        </h1>

        {/* Error Alert */}
        {error && (
          <div
            className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6 shadow-sm"
            role="alert"
          >
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div
            className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-md mb-6 shadow-sm"
            role="alert"
          >
            <p className="font-medium">Success</p>
            <p>Operation successful.</p>
          </div>
        )}

        {/* Form Inputs */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            {editId ? "Edit Session Item" : "Add New Session Item"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Session Theme */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Session Theme
              </label>
              <textarea
                placeholder="Session Theme"
                value={sessionTheme}
                onChange={(e) => setSessionTheme(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Venue/Building */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Venue/Building
              </label>
              <textarea
                placeholder="Venue/Building"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Start Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Time
              </label>
              <TimePicker
                onChange={(start_time: string | null) =>
                  setStartTime(start_time)
                }
                value={start_time}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                disableClock
                format="h:mm a"
              />
            </div>

            {/* End Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Time
              </label>
              <TimePicker
                onChange={(end_time: string | null) => setEndTime(end_time)}
                value={end_time}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                disableClock
                format="h:mm a"
              />
            </div>
          </div>

          {/* Form Buttons */}
          <div className="flex flex-wrap gap-3 mt-4">
            <button
              onClick={
                editId ? handleEditSessionListItem : handleAddSessionListItem
              }
              className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              {editId ? "Update Session" : "Add Session"}
            </button>
            {editId && (
              <button
                onClick={handleCancelEdit}
                className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Session List Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <h2 className="text-xl font-semibold p-4 border-b text-gray-700">
            Session Items
          </h2>

          {isLoading && (
            <div className="p-8 text-center text-gray-500">
              <div className="animate-spin inline-block h-8 w-8 border-4 border-gray-300 border-t-red-600 rounded-full mb-2"></div>
              <p>Loading session data...</p>
            </div>
          )}

          {!isLoading && sessionListItems.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No session list items found
            </div>
          ) : (
            !isLoading && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Session Theme
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Room/Building
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Start Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        End Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sessionListItems.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.sessionTheme}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {item.venue}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {moment(item.start_time, "HH:mm").format("h:mm A")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {moment(item.end_time, "HH:mm").format("h:mm A")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditClick(item)}
                              className="inline-flex items-center px-3 py-1.5 border border-red-500 text-red-500 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteSessionListItem(item._id)
                              }
                              className="inline-flex items-center px-3 py-1.5 border border-gray-600 text-gray-600 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {isLoading && (
                  <div className="p-8 text-center text-gray-500">
                    Loading...
                  </div>
                )}
              </div>
            )
          )}
        </div>

        <ScrollToTopButton />
      </div>
    </div>
  );
};

export default SessionList;
