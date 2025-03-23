"use client"
import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import ProfileCard from "@/components/ProfileCard";
import Carousel from "@/js";

const profileData = [
  { name: "Professor Dr. A. M. Sarwaruddin Chowdhury", title: "Vice Chancellor, SUST", role: "CHIEF PATRON", imageUrl: "/teacher/vc.png" },
  { name: "Prof. Dr. Md. Reza Selim", title: "Dean, School of Applied Sciences and Technology, SUST", role: "CONFERENCE CHAIR", imageUrl: "/teacher/selim.jpeg" },
  { name: "Prof. Dr. Muhammad Muhsin Aziz Khan", title: "Professor, IPE SUST", role: "CONFERENCE TREASURER", imageUrl: "/teacher/Aziz Khan.png" },
  { name: "Prof. Dr. Md. Tamez Uddin", title: "Professor & Head, CEP SUST", role: "CONFERENCE SECRETARY", imageUrl: "/teacher/Tammiz Uddin.png" },
  { name: "Prof. Dr. Md. Forhad Rabbi", title: "Professor, CSE SUST", role: "JOINT SECRETARIE", imageUrl: "/teacher/Farhad Rabbi.png" },
  { name: "Prof. Dr. Md. Rezaul Hasan Shumon", title: "Professor, IPE SUST", role: "JOINT SECRETARIE", imageUrl: "/teacher/shumon.png" },
  { name: "Prof. Dr. H.M.A Mahzuz", title: "Professor, CEE SUST", role: "JOINT SECRETARIE", imageUrl: "/teacher/mahzuz.jpg" },
  // member 
  { name: "Jahirul Islam", title: "Director, IICT SUST", role: "MEMBER", imageUrl: "/teacher/jahirul.jpg" },
  { name: "Prof. Dr. Muhammad Mahamood Hasan", title: "Professor & Head, IPE SUST.", role: "MEMBER", imageUrl: "/teacher/mahamood.jpg" },
  { name: "Prof. Dr. Md. Tamez Uddin", title: "Professor & Head, CEP SUST", role: "MEMBER", imageUrl: "/teacher/Tammiz Uddin.png" },
  { name: "Prof. Dr. Mohammad Shahidur Rahman", title: "Professor, CEE SUST", role: "MEMBER", imageUrl: "/teacher/shahidur.jpg" },
  { name: "Prof. Dr. Muhammad Farhad Howladar", title: "Professor, PME SUST", role: "MEMBER", imageUrl: "/teacher/farhad.jpg" },
  { name: "Prof. Dr. Wahiduzzaman", title: "Professor & Head, FET SUST", role: "MEMBER", imageUrl: "/teacher/wahid.jpg" },
  { name: "Prof. Dr. Md. Masum", title: "Professor & Head, CSE SUST", role: "MEMBER", imageUrl: "/teacher/masum.jpg" },
  { name: "Prof. Dr. Ar. Iftekhar Rahman", title: "Associate Professor & Head, ARC SUST", role: "MEMBER", imageUrl: "/teacher/ifti.jpg" },
  { name: "Mr. Md. Mahmud-Or-Rashid", title: "Assistant Professor & Head, MEE SUST", role: "MEMBER", imageUrl: "/teacher/rashid.jpg" },
  { name: "Mr. Abdur Rouf", title: "Principal, SEC", role: "MEMBER", imageUrl: "/teacher/" },
];

const advisoryCommittee = [
  "Dr. Md. Niamul Bari, Department of Civil Engineering, RUET",
  "Dr. Md. Ataur Rahman, Department of Water Resource Engineering, BUET",
  "Dr. Aysha Akter, Department of Civil Engineering, CUET",
  "M. Maniruzzaman, Applied Chemistry and Chemical Engineering, Islamic University, Kushtia",
  "Furuque Hasan, Department of Chemical Engineering, Texas A&M Energy Institute",
  "Dr. Rajeev Bhat, Food Science and Technology, Estonian University of Life Sciences, Estonia",
  "Dr. Mohammad Shafiur Rahman, Sultan Qaboos University, Oman",
  "Dr. Nurul Huda, Sustainable Agriculture, Universiti Malaysia Sabah, Malaysia",
  "Dr. Mustafizur Rahman, Distinguished Professor, IPE, SUST",
  "Dr. Md Abul Kalam, CEE, University of Technology Sydney",
  "Dr. Saidur Rahman, Sunway University, Malaysia",
  "Dr. A. S. M. A. Haseeb, Nanomaterials and Ceramic Engineering, BUET",
  "Dr. Muhammed Alamgir, Member, UGC, Bangladesh",
  "Dr. Subroto Kumar Shah, Dept. of Geology, University of Dhaka",
  "Dr. Md. Ashikur Rahman Joarder, Department of Architecture, BUET",
  "Dr. Domenico Pirozzi, University of Naples Federico II, Italy",
  "Dr. A. Rashid Hasan, Texas A & M University, USA",
  "Dr. Ryuji Shioya, Toyo University, Japan",
  "Dr. Bhavani Shankar, University of London, UK",
  "Dr. Muhammad Tamim, PMRE, BUET, Bangladesh",
  "Dr. Abdullahil Azeem, IPE, BUET, Bangladesh",
  "Dr. Sudipta Roy, Assam University, India",
  "Dr. Alauddin Bhuiyan, Icahn School of Medicine at Mount Sinai, USA",
  "Dr. Luca Romoli, University of Parma, Italy",
  "Dr. Md. Abdul Alim, CEE, RUET, Bangladesh",
  "Dr. Anirban Mostafa, Khulna University, Bangladesh",
  "Dr. Tapan Kumar Dhar, Khulna University, Bangladesh",
  "Dr. Md. Zahangir Alam, International Islamic University Malaysia, Malaysia",
  "Dr. M. Feroze Ahmed, Stamford University, Bangladesh",
  "Dr. Mohammad Jahangir Alam, BUET, Bangladesh",
  "Dr. Shimul (Md. Mazharul) Haque, Queensland University of Technology, Australia",
  "Dr. Mahmud Ashraf, Deakin University, Australia",
  "Ir. Dr. Mohammad Yeakub Ali, Universiti Teknologi Brunei, Brunei Darussalam",
  "Dr. Mohammad Nasim Hasan, BUET, Bangladesh",
  "Dr. A.K.M. Monjur Morshed, BUET, Bangladesh",
  "Dr. Jashim Uddin, Dept. of Chemistry, UTRGV, USA",
  "Prof. Dr. Marufuzzaman, ISE, Mississippi State University, USA"
];

const technicalCommittee = [
  "Prof. Dr. Md. Akharul Islam, CEP, SUST",
  "Prof. Dr. Engr. Mohammad Iqbal, IPE, SUST",
  "Prof. Dr. M. Aktarul Islam Chowdhury, CEE, SUST",
  "Prof. Dr. Md. Jahir Bin Alam, CEE, SUST",
  "Prof. Dr. Abul Mukid Mohammad Mukaddes, IPE, SUST",
  "Prof. Dr. Mushtaq Ahmed, CEE, SUST",
  "Prof. Dr. Mohammed Mastabur Rahman, CEP, SUST",
  "Prof. Dr. Engr Salma Akhter, CEP, SUST",
  "Prof. Dr. Mohammad Muhshin Aziz Khan, IPE, SUST",
  "Prof. Dr. Muhammad Mahamood Hasan, IPE, SUST",
  "Prof. Dr. Md. Abu Hayat Mithu, IPE, SUST",
  "Prof. Dr. Md. Shofiqul Islam, PME, SUST",
  "Prof. Dr. Ahmed Sayem, IPE, SUST",
  "Prof. Dr. G.M. Rabiul Islam, FET, SUST",
  "Prof. Dr. Mohammad Abdullah Al Mumin, CSE, SUST",
  "Prof. Dr. Bijit Kumar Banik, CEE, SUST",
  "Prof. Dr. Wahiduzzaman, FET, SUST",
  "Prof. Dr. Ar. Md. Mustafizur Rahman, ARC, SUST",
  "Prof. Dr. Farida Chowdhury, CSE, SUST",
  "Prof. Dr. Md. Forhad Rabbi, CSE, SUST",
  "Ar. Iftekhar Rahman, ARC, SUST",
  "Dr. Md. Rasedujjaman, EEE, SUST",
  "Mr. Md. Mahmud-Or-Rashid, MEE, SUST"
];

const registrationCommittee = [
  "Prof. Dr. Md. Tamez Uddin, CEP, SUST",
  "Prof. Dr. Rowshon Ara, FET, SUST",
  "Prof. Dr. Razia Sultana Chowdhury",
  "Prof. Md. Mohibul Alam, CEP, SUST",
  "Mr. Syed Misbah Uddin, IPE, SUST",
  "Dr. Md. Zohorul Islam, FET, SUST",
  "Dr. Muhammad Zobayer Bin Mukhlish, CEP, SUST",
  "Dr. Md Fakar Uddin, CEP, SUST",
  "Ms. Mahruba Sharmin Chowdhury, CSE, SUST",
  "Mr. Tuhin Dev, EEE, SUST",
  "Mr. Arif Ahammed, EEE, SUST",
  "Ms. Mitu Samadder, FET, SUST",
  "Ms. Shanta Saha, IPE, SUST",
  "Ms. Syeda Kumrun Nahar, IPE, SUST",
  "Mr. Jahid Hasan, IPE, SUST",
  "Ms. Labiba Nusrat Jahan, PME, SUST",
  "Ar. Rupak Dash, ARC, SUST",
  "Ar. Sazdik Ahmed, ARC, SUST",
  "Mr. Md. Syamul Bashar, MEE, SUST",
  "Ms. Ayesha Ferdous Mita, CEE, SUST",
  "Ms. Sabrin Ara, CEE, SUST"
];

const publicationCommittee = [
  "Prof. Dr. Muhammad Mahamood Hasan, IPE, SUST",
  "Prof. Dr. Muhammad Farhad Howladar, PME, SUST",
  "Prof. Dr. Choudhury Abul Anam Rashed, IPE, SUST",
  "Prof. Dr. Bijit Kumar Banik, CEE, SUST",
  "Prof. Dr. Dr. Mst. Nasima Bagum, IPE, SUST",
  "Prof. Dr. Wahiduzzaman, FET, SUST",
  "Prof. Dr. Md. Mustafizur Rahman, ARC, SUST",
  "Prof. Dr. Razia Sultana Chowdhury, FET, SUST",
  "Prof. Dr. Md. Forhad Rabbi, CSE, SUST",
  "Dr. Md. Mostafizur Rahman, CEP, SUST",
  "Ar. Subrata Das, ARC, SUST",
  "Mr. Mohammad Kmruzzaman Khan Prince, EEE, SUST",
  "Ms. Ayesha Tasnim, CSE, SUST"
];

const foodCommittee = [
  "Prof. Dr. Engr. A.B.M. Abdul Malek, IPE, SUST",
  "Prof. Dr. Ahmed Sayem, IPE, SUST",
  "Prof. Dr. H. M. A. Mahzuz, CEE, SUST",
  "Prof. Md. Belal Hossain Sikder, FET, SUST",
  "Prof. Dr. Animesh Sarkar, FET, SUST",
  "Dr. Ifte Khairul Amin, EEE, SUST",
  "Ar. K. Taufiq Elahi, ARC, SUST",
  "Ar. Mohammad Shamsul Arefin, ARC, SUST",
  "Mr. Md. Jakaria, PME, SUST",
  "Mr. Mohammed Abdul Karim, IPE, SUST",
  "Mr. Jahid Hasan, IPE, SUST",
  "Mr. Abdullah Al Numan Bakth, PME, SUST",
  "Mr. Md. Mahmud-Or-Rashid, MEE, SUST",
  "Mr. Mahabub Alam, FET, SUST",
  "Mr. Saad Been Mosharof, MEE, SUST",
  "Mr. Jahid Hasan Shourove, FET, SUST"
];

const fundCommittee = [
  "Prof. Dr. Mohammad Iqbal, IPE, SUST",
  "Prof. Dr. Md. Jahir Bin Alam, CEE, SUST",
  "Prof. Dr. M. Shahidur Rahman, CSE, SUST",
  "Prof. Dr. Mushtaq Ahmed, CEE, SUST",
  "Prof. Dr. Muhammad Azizul Hoque, CEE, SUST",
  "Prof. Dr. M. Jahirul Islam, CSE, SUST",
  "Prof. Dr. Choudhury Abul Anam Rashed, IPE, SUST",
  "Prof. Dr. Mst. Nasima Bagum, IPE, SUST",
  "Prof. Dr. Md. Forhad Rabbi, CSE, SUST",
  "Dr. Md. Zohurul Islam, FET, SUST"
];

const websiteAndManuscriptCommittee = [
  "Prof. Dr. Md. Masum, CSE, SUST",
  "Prof. Dr. Md. Mustafizur Rahman, ARC, SUST",
  "Prof. Dr. Md. Forhad Rabbi, CSE, SUST",
  "Mrs. Sadia Sultana, CSE, SUST",
  "Mr. Md. Ashraf Hussain, PME, SUST",
  "Mr. A.K.M. Fakhrul Hossain, CSE, SUST",
  "Mr. Md. Shadmim Hasan Sifat",
  "Ms. Sayma Sultana Chowdhury, IICT, SUST",
  "Dr. Ahsan Habib, IICT, SUST",
  "Mr. Md. Shahid Iqbal, SEC",
  "Mr. Abdullah Al Noman, CSE, SUST"
];

const accommodationCommittee = [
  "Prof. Dr. Md. Misbah Uddin, CEE, SUST (Convener)",
  "Prof. Dr. Md. Saiful Alam, PME, SUST",
  "Mr. Chowdury Md. Luthfur Rahman, IPE, SUST",
  "Dr. Gulam Md. Munna, CEE, SUST",
  "Ms. Shilpy Rani Basak, CEE, SUST",
  "Mr. Muhammad Abdus Samad, IPE, SUST",
  "Mr. Md. Rahmatuzzaman Rana, FET, SUST",
  "Ms. Mukta Roy, FET, SUST",
  "Mr. Mizanur Rahman, FET, SUST",
  "Mr. A S M Sayem, FET, SUST",
  "Mr. Nafiz Imtiaz Rahman, EEE, SUST",
  "Mr. Md. Aminul Islam, CEE, SUST",
  "Mr. Majedul Islam Khan, PME, SUST",
  "Mr. Md. Sifat Tanveer, PME, SUST",
  "Mr. Md. Mahamudul Hashan, PME, SUST",
  "Mr. A K M Ashikuzzaman, MEE, SUST",
  "Mr. Md. Jahedul Alam, IPE, SUST"
];

const eventManagementCommittee = [
  "Prof. Dr. Mohammad Shahidur Rahman, CEE, SUST (Convener)",
  "Prof. Dr. Md. Imran Kabir, CEE, SUST",
  "Prof. Dr. Choudhury Abul Anam Rashed, IPE, SUST",
  "Prof. Dr. Md. Bashirul Haque, CEE, SUST",
  "Prof. Dr. Mohammad Shaiful Alam Amin, CEP, SUST",
  "Dr. Shriful Islam, CEE, SUST",
  "Dr. Kamrunnaher Monalisa, FET, SUST",
  "Ar. Mohammad Tanvir Hasan, ARC, SUST",
  "Ar. Subrata Das, ARC, SUST",
  "Ar. Hossain Mohammad Nahyan, ARC, SUST",
  "Ar. Shubhajit Chowdhury, ARC, SUST",
  "Ar. Gourpada Dey, ARC, SUST",
  "Mr. Mohaiminul Haque, CEE, SUST",
  "Ms. Syeda Kumrun Nahar, IPE, SUST",
  "Mr. Md. Mehedi Hasan Kibria, IPE, SUST",
  "Mr. Pritidipto Paul Chowdhury, IPE, SUST",
  "Ar. Md. Arifur Rahman, ARC, SUST",
  "Mr. Mostafa Rafid, MEE, SUST",
  "Mr. Md. Shariful Islam, EEE, SUST",
  "Mr. Md. Sibbir Ahmed, SEC"
];

const virtualSessionManagementCommittee = [
  "Prof. Dr. M. Jahirul Islam, CSE, SUST (Convener)",
  "Prof. Dr. M. Forhad Howladar, PME, SUST",
  "Prof. Dr. Mohammad Abdullah Al Mumin, CSE, SUST",
  "Prof. Dr. Wahiduzzaman, FET, SUST",
  "Prof. Dr. Md. Forhad Rabbi, CSE, SUST",
  "Dr. Md. Mostafizur Rahman, CEP, SUST",
  "Dr. Ifte Khairul Amin, EEE, SUST",
  "Mr. Mohammed Raihan Ullah, IICT, SUST",
  "Mr. Partha Protim Paul, IICT, SUST"
];

const posterSessionManagementCommittee = [
  "Dr. Ahmad Hasan Nury, CEE, SUST",
  "Ar. Shahidul Islam, ARC, SUST",
  "Ar. Shahla Safwat Ravhee, ARC, SUST",
  "Ar. Abhijit Mazumdar, ARC, SUST",
  "Ms. Rahatun Akter, CEP, SUST"
];


export default function Committees() {
  return (
    <main className="Committees-screen flex flex-col min-h-screen bg-gray-200">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <div className="mt-32 flex-grow container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center my-8">
          Organizing Committee
          <div className="border-b-2 border-black w-1/2 mx-auto mt-5"></div>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-20">
          {profileData.map((profile, index) => (
            <ProfileCard key={index} profile={profile} />
          ))}
        </div>

        {/* Conference Secretariat Section */}
        <div className="text-center my-56">
          <h2 className="text-4xl md:text-5xl font-semibold text-red-600">Conference Secretariat</h2>
          <p className="mt-4 font-semibold">School of Applied Sciences and Technology, SUST, Sylhet</p>
        </div>

        {/* Advisory Committee Section */}
        <div className="mt-32 mb-32">
          <h2 className="text-4xl md:text-5xl font-semibold text-center mb-10 text-red-600">Advisory Committee</h2>
          <div className="bg-gradient-to-br from-red-50 to-white rounded-lg py-6 mt-4 mx-4 sm:mx-10 my-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
              {advisoryCommittee.map((member, index) => (
                <div key={index} className="text-xl md:text-2xl text-start mb-2 mx-6 md:mx-16">
                  <li>{member}</li>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Programme Committee Section */}
        <div className="mt-32 mb-32">
          <h2 className="text-4xl md:text-5xl font-semibold text-center mb-10 text-red-600">Technical Programme Committee</h2>
          <div className="bg-gradient-to-br from-red-50 to-white rounded-lg py-6 mt-4 mx-4 sm:mx-10 my-16">
            <div className="text-center mb-6 mt-6">
              <h3 className="md:text-3xl text-2xl px-2 font-semibold">CONVENER: Prof. Dr. M. Shahidur Rahman, CSE, SUST</h3>
              <p className="mt-5 mb-8">(Not as per seniority)</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
              {technicalCommittee.map((member, index) => (
                <div key={index} className="text-xl md:text-2xl text-start mb-2 mx-6 md:mx-16">
                  <li>{member}</li>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Registration and Certification Committee */}
        <div className="mt-32 mb-32">
          <h2 className="text-4xl md:text-5xl font-semibold text-center mb-10 text-red-600">Registration and Certification Committee</h2>
          <div className="bg-gradient-to-br from-red-50 to-white rounded-lg py-6 mt-4 mx-4 sm:mx-10 my-16">
            <div className="text-center mb-6 mt-6">
              <h3 className="md:text-3xl text-2xl px-2 font-semibold">CONVENER: Prof. Dr. Mohammad Muhshin Aziz Khan, IPE, SUST</h3>
              <p className="mt-5 mb-8">(Not as per seniority)</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
              {registrationCommittee.map((member, index) => (
                <div key={index} className="text-xl md:text-2xl text-start mb-2 mx-6 md:mx-16">
                  <li>{member}</li>
                </div>
              ))}
            </div>
          </div>
        </div>



        {/* Publication and Media Committee */}
        <div className="mt-32 mb-32">
          <h2 className="text-4xl md:text-5xl font-semibold text-center mb-10 text-red-600">Publication and Media Committee</h2>
          <div className="bg-gradient-to-br from-red-50 to-white rounded-lg py-6 mt-4 mx-4 sm:mx-10 my-16">
            <div className="text-center mb-6 mt-6">
              <h3 className="md:text-3xl text-2xl px-2 font-semibold">CONVENER: Prof. Dr. Mohammad Muhshin Aziz Khan, IPE, SUST</h3>
              <p className="mt-5 mb-8">(Not as per seniority)</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
              {publicationCommittee.map((member, index) => (
                <div key={index} className="text-xl md:text-2xl text-start mb-2 mx-6 md:mx-16">
                  <li>{member}</li>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Food and Refreshment Committee */}
        <div className="mt-32 mb-32">
          <h2 className="text-4xl md:text-5xl font-semibold text-center mb-10 text-red-600">Food and Refreshment Committee</h2>
          <div className="bg-gradient-to-br from-red-50 to-white rounded-lg py-6 mt-4 mx-4 sm:mx-10 my-16">
            <div className="text-center mb-6 mt-6">
              <h3 className="md:text-3xl text-2xl px-2 font-semibold">CONVENER: Prof. Dr. Iftekhar Ahmad, FET, SUST</h3>
              <p className="mt-5 mb-8">(Not as per seniority)</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
              {foodCommittee.map((member, index) => (
                <div key={index} className="text-xl md:text-2xl text-start mb-2 mx-6 md:mx-16">
                  <li>{member}</li>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fund Raising Committee */}
        <div className="mt-32 mb-32">
          <h2 className="text-4xl md:text-5xl font-semibold text-center mb-10 text-red-600">Fund Raising Committee</h2>
          <div className="bg-gradient-to-br from-red-50 to-white rounded-lg py-6 mt-4 mx-4 sm:mx-10 my-16">
            <div className="text-center mb-6 mt-6">
              <h3 className="md:text-3xl text-2xl px-2 font-semibold">CONVENER: Prof. Dr. Md. Ariful Islam, Dept. IPE, SUST</h3>
              <p className="mt-5 mb-8">(Not as per seniority)</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
              {fundCommittee.map((member, index) => (
                <div key={index} className="text-xl md:text-2xl text-start mb-2 mx-6 md:mx-16">
                  <li>{member}</li>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Website and Manuscript Submission Committee */}
        <div className="mt-32 mb-32">
          <h2 className="text-4xl md:text-5xl font-semibold text-center mb-10 text-red-600">Website and Manuscript Submission Committee</h2>
          <div className="bg-gradient-to-br from-red-50 to-white rounded-lg py-6 mt-4 mx-4 sm:mx-10 my-16">
            <div className="text-center mb-6 mt-6">
              <h3 className="md:text-3xl text-2xl px-2 font-semibold">CONVENER: Prof. Dr. Mohammad Abdullah Al Mumin, CSE, SUST</h3>
              <p className="mt-5 mb-8">(Not as per seniority)</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
              {websiteAndManuscriptCommittee.map((member, index) => (
                <div key={index} className="text-xl md:text-2xl text-start mb-2 mx-6 md:mx-16">
                  <li>{member}</li>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Accommodation, Transport and Tour Committee */}
        <div className="mt-32 mb-32">
          <h2 className="text-4xl md:text-5xl font-semibold text-center mb-10 text-red-600">Accommodation, Transport and Tour Committee</h2>
          <div className="bg-gradient-to-br from-red-50 to-white rounded-lg py-6 mt-4 mx-4 sm:mx-10 my-16">
            <div className="text-center mb-6 mt-6">
              <h3 className="md:text-3xl text-2xl px-2 font-semibold">CONVENER: Prof. Dr. Md. Misbah Uddin, CEE, SUST</h3>
              <p className="mt-5 mb-8">(Not as per seniority)</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
              {accommodationCommittee.map((member, index) => (
                <div key={index} className="text-xl md:text-2xl text-start mb-2 mx-6 md:mx-16">
                  <li>{member}</li>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Event Management Committee */}
        <div className="mt-32 mb-32">
          <h2 className="text-4xl md:text-5xl font-semibold text-center mb-10 text-red-600">Event Management Committee</h2>
          <div className="bg-gradient-to-br from-red-50 to-white rounded-lg py-6 mt-4 mx-4 sm:mx-10 my-16">
            <div className="text-center mb-6 mt-6">
              <h3 className="md:text-3xl text-2xl px-2 font-semibold">CONVENER: Prof. Dr. Mohammad Shahidur Rahman, CEE, SUST</h3>
              <p className="mt-5 mb-8">(Not as per seniority)</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
              {eventManagementCommittee.map((member, index) => (
                <div key={index} className="text-xl md:text-2xl text-start mb-2 mx-6 md:mx-16">
                  <li>{member}</li>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Virtual Session Management Committee */}
        <div className="mt-32 mb-32">
          <h2 className="text-4xl md:text-5xl font-semibold text-center mb-10 text-red-600">Virtual Session Management Committee</h2>
          <div className="bg-gradient-to-br from-red-50 to-white rounded-lg py-6 mt-4 mx-4 sm:mx-10 my-16">
            <div className="text-center mb-6 mt-6">
              <h3 className="md:text-3xl text-2xl px-2 font-semibold">CONVENER: Prof. Dr. M. Jahirul Islam, CSE, SUST</h3>
              <p className="mt-5 mb-8">(Not as per seniority)</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
              {virtualSessionManagementCommittee.map((member, index) => (
                <div key={index} className="text-xl md:text-2xl text-start mb-2 mx-6 md:mx-16">
                  <li>{member}</li>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* POSTER SESSION MANAGEMENT */}
        <div className="mt-32 mb-32">
          <h2 className="text-4xl md:text-5xl font-semibold text-center mb-10 text-red-600">Poster Session Management Committee</h2>
          <div className="bg-gradient-to-br from-red-50 to-white rounded-lg py-6 mt-4 mx-4 sm:mx-10 my-16">
            <div className="text-center mb-6 mt-6">
              <h3 className="md:text-3xl text-2xl px-2 font-semibold">CONVENER: Ar. Kawshik Saha, ARC, SUST</h3>
              <p className="mt-5 mb-8">(Not as per seniority)</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5">
              {posterSessionManagementCommittee.map((member, index) => (
                <div key={index} className="text-xl md:text-2xl text-start mb-2 mx-6 md:mx-16">
                  <li>{member}</li>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
          {/* Carousel Section */}
          <div className="container mx-auto px-4 py-8 hidden">
        <Carousel />
      </div>
      <div className="mt-12">
        <Footer />
      </div>
    </main>
  );
}
