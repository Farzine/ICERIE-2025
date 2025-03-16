"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';
import Sidebar from '@/components/Sidebar';

interface Dates {
  _id: string;
  date: string;
  description: string;
  show: boolean | undefined;
}

const ImportantDates: React.FC = () => {
  const [importantDates, setImportantDates] = useState<Dates[]>([]);
  const [dates, setDates] = useState<Date | null>(null);
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [RevShow, setRevShow] = useState<boolean>(false);
  const router = useRouter();
  const token = Cookies.get('token');
  if (!token) router.push('/admin');

  // for Show on/off
  const handleShow = async (id: string, show: boolean | undefined) => {

    setRevShow(!show);

    try {
      const token = Cookies.get("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/important-dates/show/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({ "show": RevShow }),
        }
      );
      if (response.ok) {
        fetchImportantDates();

      } else {
        throw new Error("Failed to save important dates");
      }
    } catch (error) {
      console.error("Error saving important dates:", error);
      setError("Failed to save important dates. Please try again.");
    }


  };

  useEffect(() => {
    fetchImportantDates();
  }, []);

  const fetchImportantDates = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/important-dates`, {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setImportantDates(data);
      } else {
        throw new Error('Failed to fetch important dates');
      }
    } catch (error) {
      console.error('Error fetching important dates:', error);
      setError('Failed to fetch important dates. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddOrEditImportantDates = async () => {
    setLoading(true);
    try {
      const token = Cookies.get('token');
      const formattedDate = dates ? format(dates, 'dd MMMM yyyy') : '';

      const url = editId
        ? `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/important-dates/edit/${editId}`
        : `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/important-dates/add`;
      const method = editId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({
          date: formattedDate,
          description
        }),
      });

      if (response.ok) {
        fetchImportantDates();
        setDates(null);
        setDescription('');
        setEditId(null);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        throw new Error(editId ? 'Failed to edit important date' : 'Failed to add important date');
      }
    } catch (error) {
      console.error(editId ? 'Error editing important date:' : 'Error adding important date:', error);
      setError(editId ? 'Failed to edit important date. Please try again.' : 'Failed to add important date. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImportantDates = async (id: string) => {
    setLoading(true);
    try {
      const token = Cookies.get('token');
      if (!token) router.push('/admin');
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/important-dates/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
      });
      if (response.ok) {
        fetchImportantDates();
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        throw new Error('Failed to delete important date');
      }
    } catch (error) {
      console.error('Error deleting important date:', error);
      setError('Failed to delete important date. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (date: Dates) => {
    setDates(moment(date.date, 'DD MMMM yyyy').toDate());
    setDescription(date.description);
    setEditId(date._id);
  };

  const handleCancelEdit = () => {
    setDates(null);
    setDescription('');
    setEditId(null);
  };

  return (
    <div className="flex flex-col min-h-screen md:flex-row bg-gray-100">
      <Sidebar />
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      <div className={`flex-1 p-4 md:p-8 overflow-y-auto bg-gray-100 h-screen ${loading ? 'filter blur-sm' : ''}`}>
        <h1 className="text-3xl font-bold mb-4">Important Dates</h1>

        {importantDates.length === 0 && <p>No important dates found</p>}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> Operation successful.</span>
          </div>
        )}

        <div className="flex flex-col space-y-2 mb-4">
          <DatePicker
            selected={dates}
            onChange={(date: Date | null) => setDates(date)}
            dateFormat="dd MMMM, yyyy"
            placeholderText="Select a date"
            className="p-2 border rounded w-full sm:w-1/3"
            popperPlacement="bottom-start"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border rounded w-full sm:w-1/3"
          ></textarea>
          <div className="flex space-x-2">
            <button
              onClick={handleAddOrEditImportantDates}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 w-40"
            >
              {editId ? 'Update Date' : 'Submit Date'}
            </button>
            {editId && (
              <button
                onClick={handleCancelEdit}
                className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 w-40"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        <div className="bg-gray-100">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Description</th>
                <th className="py-2 px-4 border">Actions</th>
                <th className="py-2 px-4 border">Show/Hide</th>
              </tr>
            </thead>
            <tbody>
              {importantDates.map((date) => (
                <tr key={date._id}>
                  <td className="py-2 px-4 border">{moment(date.date).format('DD MMMM, YYYY')}</td>
                  <td className="py-2 px-4 border">{date.description}</td>
                  <td className="py-2 px-4 border space-x-2">
                    <button
                      onClick={() => handleEditClick(date)}
                      className="text-black py-1 px-3 m-2 rounded hover:bg-green-600 border-2 border-green-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteImportantDates(date._id)}
                      className="text-black py-1 px-3 rounded hover:bg-red-600 border-2 border-red-600"
                    >
                      Delete
                    </button>
                  </td>

                  <td className=" border space-x-2 ">
                    <label className="flex items-center justify-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={date.show}
                        onChange={()=>handleShow(date._id,date.show)} // Trigger state update on change
                      />
                      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-red-600 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-500"></div>
                      
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isLoading && <div>Loading...</div>}
        </div>
      </div>
    </div>
  );
};

export default ImportantDates;
