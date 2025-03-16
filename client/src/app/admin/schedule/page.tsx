"use client";

import ScrollToTopButton from "@/components/ScrollToTopButton";
import Sidebar from "@/components/Sidebar";
import { format } from "date-fns";
import Cookies from "js-cookie";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

interface ScheduleItem {
  _id: string;
  session: string;
  date: string;
  start_time: string;
  end_time: string;
}

const Schedule: React.FC = () => {
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
  const [session, setSession] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [start_time, setStartTime] = useState<string | null>(null);
  const [end_time, setEndTime] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const token = Cookies.get('token');
      if (!token) router.push('/admin');

  useEffect(() => {
    fetchScheduleItems();
  }, []);

  const fetchScheduleItems = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/schedule`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setScheduleItems(data);
      } else {
        throw new Error("Failed to fetch schedule items");
      }
    } catch (error) {
      console.error("Error fetching schedule items:", error);
      setError("Failed to fetch schedule items. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddScheduleItem = async () => {
    if (!session || !date || !start_time || !end_time) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const token = Cookies.get("token");
      const formattedDate = date ? format(date, "dd MMMM yyyy") : "";
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/schedule/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({
            session,
            date: formattedDate,
            start_time,
            end_time,
          }),
        }
      );
      if (response.ok) {
        fetchScheduleItems();
        setSession("");
        setDate(null);
        setStartTime(null);
        setEndTime(null);
        setError(null);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        throw new Error("Failed to add schedule item");
      }
    } catch (error) {
      console.error("Error adding schedule item:", error);
      setError("Failed to add schedule item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteScheduleItem = async (id: string) => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      if (!token) router.push("/admin");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/schedule/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        fetchScheduleItems();
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        throw new Error("Failed to delete schedule item");
      }
    } catch (error) {
      console.error("Error deleting schedule item:", error);
      setError("Failed to delete schedule item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditScheduleItem = async () => {
    if (!editId || !session || !date || !start_time || !end_time) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const token = Cookies.get("token");
      const formattedDate = date ? format(date, "dd MMMM yyyy") : "";
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/schedule/edit/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({
            session,
            date: formattedDate,
            start_time,
            end_time,
          }),
        }
      );
      if (response.ok) {
        fetchScheduleItems();
        setSession("");
        setDate(null);
        setStartTime(null);
        setEndTime(null);
        setEditId(null);
        setError(null);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        throw new Error("Failed to edit schedule item");
      }
    } catch (error) {
      console.error("Error editing schedule item:", error);
      setError("Failed to edit schedule item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (item: ScheduleItem) => {
    setSession(item.session);
    setDate(moment(item.date, "DD MMMM yyyy").toDate());
    setStartTime(item.start_time);
    setEndTime(item.end_time);
    setEditId(item._id);
  };

  const handleCancelEdit = () => {
    setSession("");
    setDate(null);
    setStartTime(null);
    setEndTime(null);
    setEditId(null);
  };

  const [activeTab, setActiveTab] = useState('schedule');
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-60 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
        </div>
      )}
      <div className={`flex-1 p-5 md:p-8 overflow-y-auto bg-gray-50 h-screen transition-all ${loading ? 'filter blur-sm' : ''}`}>
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 border-b pb-3">Schedule Management</h1>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setActiveTab('schedule')}
            className={`py-3 px-6 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 
              ${activeTab === 'schedule' ? 'bg-red-500 text-white shadow-md' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
          >
            View Schedule
          </button>
          <button
            onClick={() => {
              setActiveTab('addUpdate');
              if (editId) handleCancelEdit();
            }}
            className={`py-3 px-6 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 
              ${activeTab === 'addUpdate' ? 'bg-red-500 text-white shadow-md' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
          >
            {editId ? "Update Schedule" : "Add Schedule"}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6 shadow-sm" role="alert">
            <p className="font-medium">Error</p>
            <p>{error}</p>
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-md mb-6 shadow-sm" role="alert">
            <p className="font-medium">Success</p>
            <p>Operation completed successfully.</p>
          </div>
        )}

        {activeTab === 'addUpdate' && (
          <div className="mb-8 p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">{editId ? "Edit Schedule Item" : "Add New Schedule Item"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <DatePicker
                  selected={date}
                  onChange={(date: Date | null) => setDate(date)}
                  dateFormat="dd MMMM, yyyy"
                  placeholderText="Select a date"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  popperPlacement="bottom-start"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Session</label>
                <textarea
                  placeholder="Session description"
                  value={session}
                  onChange={(e) => setSession(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  rows={2}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                <TimePicker
                  onChange={(start_time: string | null) => setStartTime(start_time)}
                  value={start_time}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  disableClock
                  format="h:mm a"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                <TimePicker
                  onChange={(end_time: string | null) => setEndTime(end_time)}
                  value={end_time}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  disableClock
                  format="h:mm a"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              <button
                onClick={editId ? handleEditScheduleItem : handleAddScheduleItem}
                className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                {editId ? "Update Schedule" : "Add Schedule"}
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
        )}

        {activeTab === 'schedule' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <h2 className="text-xl font-semibold p-4 border-b text-gray-700">Schedule Items</h2>
            
            {isLoading ? (
              <div className="p-8 text-center text-gray-500">
                <div className="animate-spin inline-block h-8 w-8 border-4 border-gray-300 border-t-red-600 rounded-full mb-2"></div>
                <p>Loading schedule data...</p>
              </div>
            ) : scheduleItems.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No schedule items found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {scheduleItems.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {moment(item.date).format("DD MMMM, YYYY")}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.session}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{moment(item.start_time, "HH:mm").format("h:mm A")}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{moment(item.end_time, "HH:mm").format("h:mm A")}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                handleEditClick(item);
                                setActiveTab('addUpdate');
                              }}
                              className="inline-flex items-center px-3 py-1.5 border border-red-500 text-red-500 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteScheduleItem(item._id)}
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
              </div>
            )}
          </div>
        )}
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default Schedule;
