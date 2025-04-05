"use client"
import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import ProfileCard from "@/components/ProfileCard";
import Carousel from "@/js";

const profileData = [
  { name: "Professor Dr. A. M. Sarwaruddin Chowdhury", title: "Honorable Vice Chancellor, SUST", role: "CHIEF PATRON", imageUrl: "/teacher/vc.png" },
  { name: "Prof. Dr. Md. Reza Selim", title: "Dean, School of Applied Sciences and Technology, SUST", role: "CONFERENCE CHAIR", imageUrl: "/teacher/selim.jpeg" },
  { name: "Prof. Dr. Muhammad Muhsin Aziz Khan", title: "Professor, IPE SUST", role: "CONFERENCE TREASURER", imageUrl: "/teacher/Aziz Khan.png" },
  { name: "Prof. Dr. Md. Tamez Uddin", title: "Professor & Head, CEP SUST", role: "CONFERENCE SECRETARY", imageUrl: "/teacher/Tammiz Uddin.png" },
  { name: "Prof. Dr. Md. Forhad Rabbi", title: "Professor, CSE SUST", role: "JOINT SECRETARIE", imageUrl: "/teacher/Farhad Rabbi.png" },
  { name: "Prof. Dr. H.M.A Mahzuz", title: "Professor, CEE, SUST", role: "JOINT SECRETARY", imageUrl: "https://www.sust.edu/public/uploads/faculty/672cc88cbb76c.jpg" },
 
  { name: "Prof. Syed Misbah Uddin", title: "Professor, IPE, SUST", role: "JOINT SECRETARY", imageUrl: "https://www.sust.edu/public/uploads/faculty/672cc899e295a.jpg" },
  { name: "Prof. Dr. Mohammad Shaiful Alam Amin", title: "Professor, CEP, SUST", role: "JOINT SECRETARY", imageUrl: "https://api.gradnet.io/storage/profile-pictures/apUwIxOkMwtn6utjDiI07EIE9h838F0h8WVtzELy.png" },
  // member 
  { name: "Prof. Dr. Jahirul Islam", title: "Director, IICT SUST", role: "MEMBER", imageUrl: "/teacher/jahirul.jpg" },
  { name: "Prof. Dr. Muhammad Mahamood Hasan", title: "Professor & Head, IPE SUST.", role: "MEMBER", imageUrl: "/teacher/mahamood.jpg" },
  { name: "Prof. Dr. Md. Tamez Uddin", title: "Professor & Head, CEP SUST", role: "MEMBER", imageUrl: "/teacher/Tammiz Uddin.png" },
  { name: "Prof. Dr. Mohammad Shahidur Rahman", title: "Professor, CEE SUST", role: "MEMBER", imageUrl: "/teacher/shahidur.jpg" },
  { name: "Prof. Dr. Muhammad Farhad Howladar", title: "Professor, PME SUST", role: "MEMBER", imageUrl: "/teacher/farhad.jpg" },
  { name: "Prof. Dr. Wahiduzzaman", title: "Professor & Head, FET SUST", role: "MEMBER", imageUrl: "/teacher/wahid.jpg" },
  { name: "Prof. Dr. Md. Masum", title: "Professor & Head, CSE SUST", role: "MEMBER", imageUrl: "/teacher/masum.jpg" },
  { name: "Prof. Dr. Ar. Iftekhar Rahman", title: "Associate Professor & Head, ARC SUST", role: "MEMBER", imageUrl: "/teacher/ifti.jpg" },
  { name: "Mr. Md. Mahmud-Or-Rashid", title: "Assistant Professor & Head, MEE SUST", role: "MEMBER", imageUrl: "/teacher/rashid.jpg" },
  { name: "Mr. Abdur Rouf", title: "Principal, SEC", role: "MEMBER", imageUrl: "data:image/jpeg;base64,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" },
  { name: "Prof. Dr. Md. Shofiqul Islam", title: "Head, PME, SUST", role: "MEMBER", imageUrl: "https://www.sust.edu/public/uploads/faculty/672cc89bbdfcb.jpg" },
  { name: "Prof. Dr. Mohammad Abdullah Al Mumin", title: "Director, IICT, SUST", role: "MEMBER", imageUrl: "https://www.sust.edu/public/img/unknown.png" },
  { name: "Dr. Md. Rasedujjaman", title: "Head, EEE, SUST", role: "MEMBER", imageUrl: "https://www.sust.edu/public/uploads/faculty/672cc893de1c3.jpg" },
  { name: "Prof. Dr. Md. Misbah Uddin", title: "Head, CEE, SUST", role: "MEMBER", imageUrl: "https://www.sust.edu/public/uploads/faculty/672cc88c52682.jpg" },
  { name: "Mr. Md. Asaduzzaman", title: "Principal (additional Charge), SEC, Sylhet", role: "MEMBER", imageUrl: "data:image/jpeg;base64,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" }
];

const advisoryCommittee = [
  "Prof. Dr. Md. Niamul Bari, Department of Civil Engineering, RUET",
  "Prof. Dr. Md. Ataur Rahman, Department of Water Resource Engineering, BUET",
  "Prof. Dr. Aysha Akter, Department of Civil Engineering, CUET",
  "Dr. M. Maniruzzaman, Applied Chemistry and Chemical Engineering, Islamic University, Kushtia",
  "Prof. Dr. Furuque Hasan, Department of Chemical Engineering, Texas A&M Energy Institute",
  "Prof. Dr. Rajeev Bhat, Food Science and Technology, Estonian University of Life Sciences, Estonia",
  "Prof. Dr. Mohammad Shafiur Rahman, Sultan Qaboos University, Oman",
  "Prof. Dr. Nurul Huda, Sustainable Agriculture, Universiti Malaysia Sabah, Malaysia",
  "Prof. Dr. Mustafizur Rahman, Distinguished Professor, IPE, SUST",
  "Prof. Dr. Md Abul Kalam, CEE, University of Technology Sydney",
  "Prof. Dr. Saidur Rahman, Sunway University, Malaysia",
  "Prof. Dr. A. S. M. A. Haseeb, Nanomaterials and Ceramic Engineering, BUET",
  "Prof. Dr. Muhammed Alamgir, Member, UGC, Bangladesh",
  "Prof. Dr. Subroto Kumar Shah, Dept. of Geology, University of Dhaka",
  "Prof. Dr. Md. Ashikur Rahman Joarder, Department of Architecture, BUET",
  "Prof. Dr. Domenico Pirozzi, University of Naples Federico II, Italy",
  "Prof. Dr. A. Rashid Hasan, Texas A & M University, USA",
  "Prof. Dr. Ryuji Shioya, Toyo University, Japan",
  "Prof. Dr. Bhavani Shankar, University of London, UK",
  "Prof. Dr. Muhammad Tamim, PMRE, BUET, Bangladesh",
  "Prof. Dr. Abdullahil Azeem, IPE, BUET, Bangladesh",
  "Prof. Dr. Sudipta Roy, Assam University, India",
  "Prof. Dr. Alauddin Bhuiyan, Icahn School of Medicine at Mount Sinai, USA",
  "Prof. Dr. Luca Romoli, University of Parma, Italy",
  "Prof. Dr. Md. Abdul Alim, CEE, RUET, Bangladesh",
  "Prof. Dr. Anirban Mostafa, Khulna University, Bangladesh",
  "Prof. Dr. Tapan Kumar Dhar, Khulna University, Bangladesh",
  "Prof. Dr. Md. Zahangir Alam, International Islamic University Malaysia, Malaysia",
  "Prof. Dr. M. Feroze Ahmed, Stamford University, Bangladesh",
  "Prof. Dr. Mohammad Jahangir Alam, BUET, Bangladesh",
  "Prof. Dr. Md. Mazharul Haque Shimul, Queensland University of Technology, Australia",
  "Prof. Dr. Mahmud Ashraf, Deakin University, Australia",
  "Prof. Ir. Dr. Mohammad Yeakub Ali, Universiti Teknologi Brunei, Brunei Darussalam",
  "Prof. Dr. Mohammad Nasim Hasan, BUET, Bangladesh",
  "Prof. Dr. A.K.M. Monjur Morshed, BUET, Bangladesh",
  "Prof. Dr. Jashim Uddin, Dept. of Chemistry, UTRGV, USA",
  "Prof. Dr. Marufuzzaman, ISE, Mississippi State University, USA"
];


const technicalCommittee = [
  "Prof. Dr. Md. Akhtarul Islam, CEP, SUST",
  "Prof. Dr. Engr. Mohammad Iqbal, IPE, SUST",
  "Prof. Dr. Md. Jahir Bin Alam, CEE, SUST",
  "Prof. Dr. Abul Mukid Mohammad Mukaddes, IPE, SUST",
  "Prof. Dr. Mohammed Mastabur Rahman, CEP, SUST",
  "Prof. Dr. Engr. Salma Akhter, CEP, SUST",
  "Prof. Dr. Mushtaq Ahmed, CEE, SUST",
  "Prof. Dr. Md. Abu Hayat Mithu, IPE, SUST",
  "Prof. Dr. Md. Misbah Uddin, CEE, SUST",
  "Prof. Dr. Md. Salatul Islam Mozumder, CEP, SUST",
  "Prof. Dr. Md. Shofiqul Islam, PME, SUST",
  "Prof. Dr. Ahmed Sayem, IPE, SUST",
  "Prof. Dr. G.M. Rabiul Islam, FET, SUST",
  "Prof. Dr. Mohammad Abdullah Al Mumin, CSE, SUST",
  "Prof. Dr. Mohammad Shahidur Rahman, CEE, SUST",
  "Prof. Dr. Bijit Kumar Banik, CEE, SUST",
  "Prof. Dr. Wahiduzzaman, FET, SUST",
  "Prof. Dr. Ar. Md. Mustafizur Rahman, ARC, SUST",
  "Prof. Dr. Md. Bashirul Haque, CEE, SUST",
  "Prof. Dr. Ahmad Hasan Nury, CEE, SUST",
  "Ar. Iftekhar Rahman, ARC, SUST",
  "Ar. Kawshik Saha, ARC, SUST",
  "Ar. Mohammad Shamsul Arefin, ARC, SUST",
  "Dr. Md. Rasedujjaman, EEE, SUST",
  "Mr. Md. Mahmud-Or-Rashid, MEE, SUST"
];


const registrationCommittee = [
  "Dr. Iftekhar Ahmad",
  "Prof. Dr. Engr. A.B.M. Abdul Malek, IPE, SUST",
  "Prof. Dr. Rowshon Ara, FET, SUST",
  "Prof. Dr. Razia Sultana Chowdhury, FET, SUST",
  "Dr. Muhammad Zobayer Bin Mukhlish, CEP, SUST",
  "Prof. Syed Misbah Uddin, IPE, SUST",
  "Prof. Dr. Md. Zohurul Islam, FET, SUST",
  "Prof. Dr. Md. Mostafizur Rahman, CEP, SUST",
  "Dr. Md. Fakar Uddin, CEP, SUST",
  "Ms. Mahruba Sharmin Chowdhury, CSE, SUST",
  "Mr. Arif Ahammed, EEE, SUST",
  "Ms. Mitu Samadder, FET, SUST",
  "Ms. Syeda Kumrun Nahar, IPE, SUST",
  "Ms. Shanta Saha, IPE, SUST",
  "Mr. Jahid Hasan, IPE, SUST",
  "Ms. Labiba Nusrat Jahan, PME, SUST",
  "Ar. Nuuhash Akando, ARC, SUST"
];


const publicationCommittee = [
  "Prof. Dr. Muhammad Farhad Howladar, PME, SUST",
  "Prof. Dr. Choudhury Abul Anam Rashed, IPE, SUST",
  "Prof. Dr. Bijit Kumar Banik, CEE, SUST",
  "Prof. Dr. Dr. Mst. Nasima Bagum, IPE, SUST",
  "Prof. Dr. Wahiduzzaman, FET, SUST",
  "Prof. Dr. Md. Mustafizur Rahman, ARC, SUST",
  "Prof. Md. Belal Hossain Sikder, FET, SUST",
  "Prof. Dr. Razia Sultana Chowdhury, FET, SUST",
  "Dr. Husne Ara Chowdhury, CSE, SUST",
  "Majedul Islam Khan, PME, SUST",
  "Mr. Md. Numan Hossain, PME, SUST",
  "Mostafa Rafid, MEE, SUST",
  "Ar. Subrata Das, ARC, SUST",
  "Md. Syamul Bashar, MEE, SUST"
];


const foodCommittee = [
  "Prof. Dr. Animesh Sarkar, FET, SUST",
  "Prof. Dr. Gulam Md. Munna, CEE, SUST",
  "Dr. Tajmunnaher, CEE, SUST",
  "Ar. K. Taufiq Elahi, ARC, SUST",
  "Ar. Mohammad Shamsul Arefin, ARC, SUST",
  "Mr. Mohammad Shahedul Hossain, PME, SUST",
  "Mr. Md. Jakaria, PME, SUST",
  "Mr. Mohammed Abdul Karim, IPE, SUST",
  "Mr. Abdullah Al Numan Bakth, PME, SUST",
  "Mr. Md. Mahmud-Or-Rashid, MEE, SUST",
  "Mr. Saad Been Mosharof, MEE, SUST",
  "Mr. Jahid Hasan Shourove, FET, SUST"
];

const fundCommittee = [
  "Prof. Dr. Md. Akhtarul Islam, CEP, SUST",
  "Prof. Dr. Mohammad Iqbal, IPE, SUST",
  "Prof. Dr. Md. Jahir Bin Alam, CEE, SUST",
  "Prof. Dr. M. Shahidur Rahman, CSE, SUST",
  "Prof. Dr. Abul Mukid Mohammad Mukaddes, IPE, SUST",
  "Prof. Dr. Md. Ariful Islam, Dept. IPE, SUST",
  "Prof. Dr. Mohammed Mastabur Rahman, CEP, SUST",
  "Prof. Dr. Mushtaq Ahmed, CEE, SUST",
  "Prof. Dr. Md. Mozammel Hoque, FET, SUST",
  "Prof. Dr. Mohammad Muhshin Aziz Khan, IPE, SUST",
  "Prof. Dr. M. Jahirul Islam, CSE, SUST",
  "Prof. Dr. Md. Shofiqul Islam, PME, SUST",
  "Prof. Dr. Muhammad Farhad Howladar, PME, SUST",
  "Prof. Dr. Mst. Nasima Bagum, IPE, SUST"
];

const websiteAndManuscriptCommittee = [
  "Prof. Mr. Md. Masum, CSE, SUST",
  "Prof. Dr. Md. Mustafizur Rahman, ARC, SUST",
  "Mrs. Sadia Sultana, CSE, SUST",
  "Mr. Md. Ashraf Hussain, PME, SUST",
  "Ms. Sayma Sultana Chowdhury, IICT, SUST",
  "Dr. Ahsan Habib, IICT, SUST",
  "Mr. Md. Mehedi Hasan Kibria, IPE, SUST",
  "Mr. Mahfuzur Rahman Emon, IICT, SUST",
  "HM Toufik Ahmed Zisan, MEE, SUST.",
  "A.K.M. Fakhrul Hossain, CSE, SUST",
  "Mr. Fazle Rabbi Rakib, IICT, SUST",
  "Mr. Md. Shahid Iqbal, SEC"
];

const accommodationCommittee = [
  "Prof. Dr. Md. Misbah Uddin, CEE, SUST (Convener)",
  "Prof. Dr. Md. Saiful Alam, PME, SUST",
  "Mr. Chowdury Md. Luthfur Rahman, IPE, SUST",
  "Ms. Shilpy Rani Basak, CEE, SUST",
  "Mr. Muhammad Abdus Samad, IPE, SUST",
  "Ms. Mukta Roy, FET, SUST",
  "Mr. A S M Sayem, FET, SUST",
  "Mr. Nafiz Imtiaz Rahman, EEE, SUST",
  "Dr. Md. Monir Hossain, FET, SUST",
  "Mr. Md. Aminul Islam, CEE, SUST",
  "Dr. Humayun Ahmad, Associate Prof. CEP, SUST",
  "Mr. Majedul Islam Khan, PME, SUST",
  "Mr. Mahamudul Hashan, PME, SUST",
  "Mr. Md. Jahedul Alam, IPE, SUST"
];

const eventManagementCommittee = [
  "Prof. Dr. Md. Imran Kabir, CEE, SUST",
  "Prof. Dr. Md. Bashirul Haque, CEE, SUST",
  "Prof. Dr. Mohammad Shaiful Alam Amin, CEP, SUST",
  "Prof. Dr. Shriful Islam, CEE, SUST",
  "Dr. Ifte Khairul Amin, EEE, SUST",
  "Mr. Mohammad Afzal Hossain, FET, SUST",
  "Ar. Mohammad Tanvir Hasan, ARC, SUST",
  "Ar. Subrata Das, ARC, SUST",
  "Ar. Gourpada Dey, ARC, SUST",
  "Mr. Md. Sibbir Ahmed, SEC",
  "Ms. Kamrunnaher Monalisa, FET, SUST",
  "Mr. Pritidipto Paul Chowdhury, IPE, SUST",
  "Md. Nazmul Islam Rafi, CEE, SUST",
  "Nusrat Jahan Ekra, CEE, SUST",
  "Mr. Md. Shamim Hasan Sifat, CEE, SUST",
  "Mr. Abdullah Al Noman, CEE, SUST"
];

const virtualSessionManagementCommittee = [
  "Prof. Dr. M. Forhad Howladar, PME, SUST",
  "Prof. Mohammad Abdullah Al Mumin, CSE, SUST",
  "Prof. Dr. Wahiduzzaman, FET, SUST",
  "Prof. Dr. Md. Mustafizur Rahman, ARC",
  "Prof. Dr. Md. Forhad Rabbi, CSE, SUST",
  "Dr. Ifte Khairul Amin, EEE, SUST",
  "Mr. Mahabub Alam, FET, SUST",
  "Mr. Md. Eamin Rahman, IICT, SUST",
  "Mr. Md. Mehedi Hasan, CSE, SUST",
  "Mr. Ishtiaque Zahid, CSE, SUST"
];

const posterSessionManagementCommittee = [
  "Dr. Ahmad Hasan Nury, CEE, SUST",
  "Mr. Mohaiminul Haque, CEE, SUST",
  "Ar. Nuuhash Akando, ARC, SUST",
  "Ar. Shahidul Islam, ARC, SUST",
  "Ar. Shahla Safwat Ravhee, ARC, SUST",
  "Ar. Abhijit Mazumdar, ARC, SUST",
  "Ar. Shataparna Das, ARC, SUST",
  "Mrs. Mitu Samadder, FET, SUST",
  "Ms. Syeda Kumrun Nahar, IPE, SUST",
  "Mr. Md. Mehedi Hasan Kibria, IPE, SUST",
  "Mr. Md. Amjad Patwary, FET, SUST"
];


export default function Committees() { 
  return (
    <main className="Committees-screen flex flex-col min-h-screen bg-[url(/bg-texture.jpg)]">
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
          <p className="mt-4 font-semibold">Prof. Dr. Md. Tamez Uddin, CEP, SUST</p>
        </div>

        {/* Advisory Committee Section */}
        <div className="mt-32 mb-32">
          <h2 className="text-4xl md:text-5xl font-semibold text-center mb-10 text-red-600">Advisory Committee</h2>
          <div className="bg-white rounded-lg py-6 mt-4 mx-4 sm:mx-10 my-16">
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
          <div className="bg-white rounded-lg py-6 mt-4 mx-4 sm:mx-10 my-16">
            <div className="text-center mb-6 mt-6">
              <h3 className="md:text-3xl text-2xl px-2 font-semibold">CONVENER: Prof. Dr. M. Shahidur Rahman, CSE, SUST</h3>
              <p className="mt-5 mb-8">Members (Not as per seniority)</p>
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
          <div className="bg-white rounded-lg py-6 mt-4 mx-4 sm:mx-10 my-16">
            <div className="text-center mb-6 mt-6">
              <h3 className="md:text-3xl text-2xl px-2 font-semibold">CONVENER: Prof. Dr. Md. Mozammel Hoque, FET, SUST</h3>
              <p className="mt-5 mb-8">Member (Not as per seniority)</p>
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
          <div className="bg-white rounded-lg py-6 mt-4 mx-4 sm:mx-10 my-16">
            <div className="text-center mb-6 mt-6">
              <h3 className="md:text-3xl text-2xl px-2 font-semibold">Prof. Dr Md. Saiful Alam, PME, SUST</h3>
              <p className="mt-5 mb-8">Member (Not as per seniority)</p>
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
          <div className="bg-white rounded-lg py-6 mt-4 mx-4 sm:mx-10 my-16">
            <div className="text-center mb-6 mt-6">
              <h3 className="md:text-3xl text-2xl px-2 font-semibold">CONVENER: Prof. Dr. Ahmed Sayem, IPE, SUST</h3>
              <p className="mt-5 mb-8">Member (Not as per seniority)</p>
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
          <div className="bg-white rounded-lg py-6 mt-4 mx-4 sm:mx-10 my-16">
            <div className="text-center mb-6 mt-6">
              <h3 className="md:text-3xl text-2xl px-2 font-semibold">CONVENER: Prof. Dr. Md. Reza Selim, CSE, SUST</h3>
              <p className="mt-5 mb-8">Member (Not as per seniority)</p>
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
          <div className="bg-white rounded-lg py-6 mt-4 mx-4 sm:mx-10 my-16">
            <div className="text-center mb-6 mt-6">
              <h3 className="md:text-3xl text-2xl px-2 font-semibold">CONVENER: Prof. Dr. Mohammad Abdullah Al Mumin, CSE, SUST</h3>
              <p className="mt-5 mb-8">Member (Not as per seniority)</p>
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
          <div className="bg-white rounded-lg py-6 mt-4 mx-4 sm:mx-10 my-16">
            <div className="text-center mb-6 mt-6">
              <h3 className="md:text-3xl text-2xl px-2 font-semibold">CONVENER: Prof. Md. Mohibul Alam, CEP, SUST</h3>
              <p className="mt-5 mb-8">Member (Not as per seniority)</p>
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
          <div className="bg-white rounded-lg py-6 mt-4 mx-4 sm:mx-10 my-16">
            <div className="text-center mb-6 mt-6">
              <h3 className="md:text-3xl text-2xl px-2 font-semibold">CONVENER: Prof. Dr. Mohammad Shahidur Rahman, CEE, SUST</h3>
              <p className="mt-5 mb-8">Member (Not as per seniority)</p>
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
          <div className="bg-white rounded-lg py-6 mt-4 mx-4 sm:mx-10 my-16">
            <div className="text-center mb-6 mt-6">
              <h3 className="md:text-3xl text-2xl px-2 font-semibold">CONVENER: Prof. Dr. M. Jahirul Islam, CSE, SUST</h3>
              <p className="mt-5 mb-8">Member (Not as per seniority)</p>
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
          <div className="bg-white rounded-lg py-6 mt-4 mx-4 sm:mx-10 my-16">
            <div className="text-center mb-6 mt-6">
              <h3 className="md:text-3xl text-2xl px-2 font-semibold">CONVENER:  Ar. Kawshik Saha, ARC, SUST</h3>
              <p className="mt-5 mb-8">Member (Not as per seniority)</p>
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
