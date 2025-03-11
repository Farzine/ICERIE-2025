import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaAngleDown, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [state, setState] = useState({
    activeLink: "",
    dropdownOpen: "",
    menuOpen: false,
  });

  const router = useRouter();

  // Close menu if clicked outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Element;
      if (state.menuOpen && target && !target.closest(".nav-links")) {
        setState((prevState) => ({
          ...prevState,
          menuOpen: false,
        }));
      }
    };

    if (state.menuOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [state.menuOpen]);

  // Handle clicking a link
  const handleLinkClick = (link: string) => {
    setState((prevState) => ({
      ...prevState,
      dropdownOpen: prevState.dropdownOpen === link ? "" : link,
      activeLink: prevState.activeLink === link ? "" : link, // Toggle active link
    }));
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setState((prevState) => ({
      ...prevState,
      menuOpen: !prevState.menuOpen,
    }));
  };

  // Handle navigation and close the menu
  const handleNavigation = (path: string) => {
    setState((prevState) => ({
      ...prevState,
      menuOpen: false,
      activeLink: prevState.activeLink === path ? "" : path, // Toggle active link
    }));
    router.push(path);
  };

  const home = process.env.NEXT_PUBLIC_APP_FRONTEND_URL;
  const tracks = `${home}/tracks`;
  const submissionUrl = `${home}/authors/submission`;
  const callForPaperUrl = `${home}/authors/callForPaper`;
  const conferenceTracks = `${home}/tracks`;
  const importantDates = `${home}/authors/importantDates`;
  const registrationFees = `${home}/registration/registrationFees`;
  const attendee = `${home}/attendee`;
  const schedule = `${home}/schedule`;
  const gallery = `${home}/gallery`;
  const aboutIcerie = `${home}/about/icerie`;
  const committee = `${home}/about/committee`;
  const sponsors = `${home}/about/sponsors`;
  const accommodation = `${home}/about/accommodation`;
  const venue = `${home}/about/venue`;
  const contactUs = `${home}/contact`;

  const navLinks = [
    { name: "Home", href: home },
    { name: "Tracks", href: tracks },
    {
      name: "For Authors",
      href: "#For-Authors",
      dropdown: [
        { name: "Submission", href: submissionUrl },
        { name: "Call For Paper", href: callForPaperUrl },
        { name: "Conference Tracks", href: conferenceTracks },
        { name: "Important Dates", href: importantDates },
      ],
    },
    {
      name: "Registration",
      href: "#registration",
      dropdown: [
        { name: "Registration Fees", href: registrationFees },
        { name: "Attending", href: attendee },
      ],
    },
    { name: "Schedule", href: schedule },
    { name: "Gallery", href: gallery },
    {
      name: "Previous Conferences",
      href: "#Previous-Conferences",
      dropdown: [
        { name: "ICERIE 2023", href: "#Previous-Conferences" },
        { name: "ICERIE 2022", href: "#Previous-Conferences" },
        { name: "ICERIE 2021", href: "#Previous-Conferences" },
        { name: "ICERIE 2020", href: "#Previous-Conferences" },
      ],
    },
    {
      name: "About",
      href: "#about",
      dropdown: [
        { name: "About ICERIE", href: aboutIcerie },
        { name: "Committee", href: committee },
        { name: "Sponsors", href: sponsors },
        { name: "Accommodation", href: accommodation },
        { name: "Venue", href: venue },
      ],
    },
    { name: "Contact Us", href: contactUs },
    {
      name: "Register",
      href: "/registration",
    },
  ];

  return (
    <header className="bg-white shadow-lg p-3 z-50 relative">
      <nav className="flex justify-between items-center w-full h-14 mx-auto">
   
        <div className="flex items-center justify-between w-full md:w-auto">
         
        <Link href='/'>
          <div className="flex">
            <Image
              className="ml-5 md:ml-10 w-16 cursor-pointer"
              src="/icerieLogo.jpg"
              alt="Logo"
              width={1000}
              height={1000}
              priority
            />
            <span className="ml-5 text-nowrap mt-3 font-semibold text-red-500">
              ICERIE 2025
            </span>
          </div>
          </Link>
          <div className="md:hidden ml-2">
            <button onClick={toggleMenu} aria-expanded={state.menuOpen}>
              {state.menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {state.menuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-30 z-40"></div>
        )}

        <div
          className={`nav-links md:static absolute bg-white md:min-h-fit min-h-[50vh] left-0 top-0 md:w-auto w-full flex items-center px-5 z-50 transition-all duration-500 ${
            state.menuOpen ? "top-14 opacity-100" : "top-[-490px] opacity-0"
          } md:opacity-100`}
        >
          <ul className="flex md:flex-row flex-col md:items-center md:gap-8 gap-4 text-black md:text-2xl text-2xl font-bold mt-5 w-full">
            {navLinks.map((link, index) => (
              <li key={index} className="relative">
                {link.name === "Register" ? (
                  <button
                    className={`bg-red-500 text-white px-5 py-2 text-2xl font-semibold rounded-full hover:bg-red-400 flex justify-between items-center mx-5 ${
                      state.activeLink === link.href && "bg-red-600"
                    }`}
                    onClick={() => handleNavigation(link.href ?? "")}
                  >
                    Register
                  </button>
                ) : (
                  <>
                    <Link
                      className={`relative inline-block group ${
                        state.activeLink === link.href
                          ? "text-black"
                          : "text-gray-700"
                      }`}
                      href={link.dropdown ? "#" : (link.href as string)}
                      onClick={() =>
                        link.dropdown
                          ? handleLinkClick(link.href)
                          : handleNavigation(link.href as string)
                      }
                    >
                      {link.name}
                      {link.dropdown && <FaAngleDown className="inline ml-1" />}
                      <span
                        className={`${
                          state.activeLink === link.href
                            ? "absolute w-full h-1 bg-red-500 top-7 md:mt-3 my-1 left-0 scale-x-100"
                            : "absolute w-full h-1 bg-red-500 top-7 md:mt-3 my-1 left-0 transition ease-in-out duration-300 transform origin-center scale-x-0 group-hover:scale-x-100"
                        }`}
                      ></span>
                    </Link>
                    {state.dropdownOpen === link.href && link.dropdown && (
                      <ul className="absolute bg-white shadow-lg rounded w-48 z-50 pt-5">
                        {link.dropdown.map((sublink, subIndex) => (
                          <li
                            key={subIndex}
                            className="hover:bg-gray-200 mx-2 mr-2 mb-2"
                          >
                            <Link
                              href={sublink.href}
                              className="block px-4 py-2 text-xl font-semibold"
                              onClick={() => handleNavigation(sublink.href)}
                            >
                              {sublink.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;