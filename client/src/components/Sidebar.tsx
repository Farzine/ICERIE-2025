import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import { FaBell, FaImage, FaEnvelope, FaCalendarCheck, FaHandshake } from 'react-icons/fa';
import { FaMessage, FaNoteSticky, FaPeopleGroup } from 'react-icons/fa6';
import { RiListCheck, RiTimerLine } from "react-icons/ri";
import { FiMenu, FiX } from 'react-icons/fi';

const Sidebar: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [loggingOut, setLoggingOut] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = async () => {
        try {
            setLoggingOut(true);
            const token = Cookies.get('token');
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/admin/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
            });

            if (response.ok) {
                router.push('/admin');
                console.log('Logged out successfully');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setLoggingOut(false);
        }
    };

    const handleNavigation = (path: string) => {
        router.push(path);
        setIsSidebarOpen(false); // Close sidebar on mobile after navigation
    };

    const getActiveClass = (path: string) => {
        return pathname === path ? 'bg-[#EAEFEF] text-black pt-2 pb-2' : '';
    };

    return (
        <>
            {/* Mobile menu button */}
            <div className="fixed top-0 left-0 z-50 p-4 md:hidden">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="flex items-center justify-center w-10 h-10 bg-white rounded-md shadow-md text-red-400 hover:bg-gray-100 transition-colors"
                    aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
                >
                    {isSidebarOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 w-72 flex flex-col shadow-xl transform ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-300 ease-in-out md:translate-x-0 md:relative z-40 overflow-y-auto`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-200 bg-red-400 text-white">
                        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
                    </div>
                    
                    {/* Navigation links */}
                    <nav className="flex-1 overflow-y-auto py-4 px-3">
                        <div className="flex flex-col space-y-1">
                            {[
                            { path: '/admin/notices', icon: <FaBell />, label: 'Notice' },
                            { path: '/admin/messages', icon: <FaMessage />, label: 'Chair Message' },
                            { path: '/admin/uploadImage', icon: <FaImage />, label: 'Image' },
                            { path: '/admin/sponsor', icon: <FaHandshake />, label: 'Sponsors' },
                            { path: '/admin/importantDates', icon: <FaCalendarCheck />, label: 'Important Dates' },
                            { path: '/admin/importantUpdate', icon: <FaNoteSticky />, label: 'Important Update' },
                            { path: '/admin/schedule', icon: <RiTimerLine />, label: 'Schedule' },
                            { path: '/admin/sessionList', icon: <RiListCheck />, label: 'Session List' },
                            { path: '/admin/attendeeList', icon: <FaPeopleGroup />, label: 'Attendee List' },
                            { path: '/admin/updateEmailPassword', icon: <FaEnvelope />, label: 'Settings' },
                            ].map((item) => (
                                <div
                                    key={item.path}
                                    onClick={() => handleNavigation(item.path)}
                                    className={`flex items-center space-x-3 cursor-pointer rounded-md px-4 py-3 transition-all ${
                                        pathname === item.path 
                                            ? 'bg-red-400 text-white font-medium' 
                                            : 'hover:bg-gray-100 text-gray-700'
                                    }`}
                                >
                                    <span className={`text-lg ${pathname === item.path ? 'text-white' : 'text-red-500'}`}>
                                        {item.icon}
                                    </span>
                                    <span className="font-medium">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </nav>
                    
                    {/* Footer with logout */}
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                        {loggingOut ? (
                            <div className="flex items-center justify-center space-x-3 py-2">
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-red-500"></div>
                                <span className="text-gray-800">Logging out...</span>
                            </div>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="w-full py-2.5 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all flex items-center justify-center font-medium shadow-sm"
                            >
                                Log Out
                            </button>
                        )}
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile view */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                    aria-hidden="true"
                ></div>
            )}
        </>
    );
};

export default Sidebar;
