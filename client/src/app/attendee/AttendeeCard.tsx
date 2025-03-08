// import { useRouter } from 'next/navigation';
// import React from 'react';
// import Image from 'next/image';

// interface AttendeeCardProps {
//   _id: string;
//   name: string;
//   email: string;
//   photoUrl: string;
//   university: string;
// }

// function AttendeeCard(props: AttendeeCardProps) {
//   const router = useRouter();

//   const handleClick = () => {
//     router.push(`/attendee/${props._id}`);
//   };

//   // Fallback image URL in case the provided photoUrl is not valid
//   const validPhotoUrl = props.photoUrl.startsWith('http') ? props.photoUrl : '/default-profile.jpg';

//   return (
//     <div 
//       className='bg-white p-4 rounded-md shadow-md m-3 hover:shadow-lg flex flex-col justify-center items-center cursor-pointer'
//       onClick={handleClick}
//     >
//       <Image 
//         src={validPhotoUrl} 
//         alt={props.name} 
//         className='h-32 w-32 rounded-full object-cover' 
//         width={128} 
//         height={128} 
//       />
//       <p className='text-xl font-semibold mt-4 text-center'>{props.name}</p>
//       <p className='text-md text-gray-500 text-center'>{props.email}</p>
//       <p className='text-md text-blue-500 text-center'>{props.university}</p>      
//     </div>
//   );
// }

// export default AttendeeCard;




import { useRouter } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import { UserIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

interface AttendeeCardProps {
  _id: string;
  name: string;
  email: string;
  photoUrl: string;
  university: string;
}

function AttendeeCard(props: AttendeeCardProps) {
  const router = useRouter();

  // Fallback image URL if the provided URL is invalid
  const validPhotoUrl = props.photoUrl.startsWith('http') ? props.photoUrl : '/default-profile.jpg';

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 w-full h-full flex flex-col items-center border border-gray-100">
      {/* Profile Picture with loading animation - larger size */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 mb-4">
        <div className="absolute inset-0 rounded-full bg-gray-200 animate-pulse"></div>
        <Image 
          src={validPhotoUrl} 
          alt={`${props.name}`} 
          className="rounded-full object-cover border-3 border-gray-50 shadow-sm" 
          fill
          sizes="(max-width: 768px) 112px, (max-width: 1024px) 128px, 160px"
          priority
          onLoadingComplete={(img) => img.classList.remove('opacity-0')}
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Name with larger font size */}
      <h3 className="text-xl sm:text-2xl md:text-2xl font-semibold text-gray-800 mt-2 truncate max-w-[95%] text-center">
        {props.name}
      </h3>
      
      {/* University with larger font size */}
      <p className="text-lg sm:text-xl text-gray-600 font-medium my-2 truncate max-w-[95%] text-center">
        {props.university}
      </p>

      {/* Email with larger font size */}
      <p className="text-base md:text-lg text-gray-500 mb-8 w-full text-center truncate px-3" title={props.email}>
        {props.email}
      </p>

      {/* Buttons with improved sizing and spacing */}
      <div className="mt-auto grid grid-cols-2 gap-3 w-full">
        <button
          onClick={() => router.push(`/attendee/${props._id}`)}
          className="flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-700 py-3 px-4 rounded-lg text-base font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
        >
          <UserIcon className="w-5 h-5" />
          <span>Profile</span>
        </button>
        
        <button
          onClick={() => router.push(`/attendee/${props._id}/papers`)}
          className="flex items-center justify-center gap-2 bg-red-500 text-white py-3 px-4 rounded-lg text-base font-medium hover:bg-red-400 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-1"
        >
          <DocumentTextIcon className="w-5 h-5" />
          <span>Papers</span>
        </button>
      </div>
    </div>
  );
}

export default AttendeeCard;



