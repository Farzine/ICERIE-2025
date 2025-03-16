"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Sidebar from "@/components/Sidebar";

interface Message {
  _id: string;
  messages: string;
  show: boolean | undefined;
}

const Messages: React.FC = () => {
  const [message, setMessage] = useState<Message[]>([]);
  const [messages, setMessages] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [RevShow, setRevShow] = useState<boolean>(false);
  const router = useRouter();
  const token = Cookies.get("token");
  if (!token) router.push("/admin");

  // for Show on/off
  const handleShow = async (id: string, show: boolean | undefined) => {
    // console.log('msg id :'+id+' '+RevShow);
    setRevShow(!show);

    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/messages/show/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({ show: RevShow }),
        }
      );
      if (response.ok) {
        fetchMessages();
      } else {
        throw new Error("Failed to save message");
      }
    } catch (error) {
      console.error("Error saving message:", error);
      setError("Failed to save message. Please try again.");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
      setSuccess(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [success, error]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/messages`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setMessage(data);
      } else {
        throw new Error("Failed to fetch messages");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      setError("Failed to fetch messages. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMessages = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/messages/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({ messages }),
        }
      );
      if (response.ok) {
        fetchMessages();
        setMessages("");
        setSuccess(true);
      } else {
        throw new Error("Failed to add messages");
      }
    } catch (error) {
      console.error("Error adding messages:", error);
      setError("Failed to add messages. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMessages = async (id: string) => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      if (!token) router.push("/admin");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/messages/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        fetchMessages();
        setSuccess(true);
      } else {
        throw new Error("Failed to delete messages");
      }
    } catch (error) {
      console.error("Error deleting messages:", error);
      setError("Failed to delete messages. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditMessages = (notice: Message) => {
    setEditId(notice._id);
    setMessages(notice.messages);
  };

  const handleSaveEdit = async () => {
    if (!editId) return;

    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/messages/edit/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({ messages }),
        }
      );
      if (response.ok) {
        fetchMessages();
        setEditId(null);
        setMessages("");
        setSuccess(true);
      } else {
        throw new Error("Failed to save messages");
      }
    } catch (error) {
      console.error("Error saving messages:", error);
      setError("Failed to save messages. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen md:flex-row bg-white">
      <Sidebar />
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-60 z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500 border-solid"></div>
        </div>
      )}
      <div
        className={`flex-1 p-4 md:p-6 overflow-y-auto bg-white h-screen ${
          loading ? "filter blur-sm" : ""
        }`}
      >
        <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3">
          Chair Message
        </h1>

        {/* Success message display */}
        {success && (
          <div
            className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-sm mb-6"
            role="alert"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">
                  Message operation successful.
                </p>
              </div>
              <div className="ml-auto pl-3">
                <button
                  onClick={() => setSuccess(false)}
                  className="inline-flex text-green-500 hover:text-green-700"
                >
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error message display */}
        {error && (
          <div
            className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-sm mb-6"
            role="alert"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{error}</p>
              </div>
              <div className="ml-auto pl-3">
                <button
                  onClick={() => setError(null)}
                  className="inline-flex text-red-500 hover:text-red-700"
                >
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Compose Message
          </h2>
          <div className="flex flex-col space-y-4">
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message Content
              </label>
              <textarea
                id="message"
                placeholder="Enter your message here..."
                value={messages}
                onChange={(e) => setMessages(e.target.value)}
                className="p-3 border border-gray-300 rounded-md w-full md:w-2/3 h-56 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              ></textarea>
            </div>
            <div>
              <button
                onClick={editId ? handleSaveEdit : handleMessages}
                className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-sm"
              >
                {editId ? "Save Changes" : "Submit Message"}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold p-4 border-b text-gray-700">
            Manage Messages
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Message
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Visibility
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {message.map((notice) => (
                  <tr key={notice._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="max-h-20 overflow-y-auto">
                        {notice.messages}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleEditMessages(notice)}
                          className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-red-500 hover:text-red-500 transition duration-150"
                        >
                          <svg
                            className="h-4 w-4 mr-1"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteMessages(notice._id)}
                          className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-red-50 hover:border-red-500 hover:text-red-500 transition duration-150"
                        >
                          <svg
                            className="h-4 w-4 mr-1"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <label className="relative inline-flex items-center justify-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notice.show}
                          onChange={() => handleShow(notice._id, notice.show)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {message.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No messages found. Create your first message above.
              </div>
            )}
            {isLoading && (
              <div className="text-center py-4 text-gray-500">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-red-500 border-r-2 border-b-2  border-l-2 mr-2"></div>
                Loading...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
