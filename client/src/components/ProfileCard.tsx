
interface ProfileCardProps {
  profile: {
    name: string;
    title: string;
    role: string;
    imageUrl: string;
  };
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <div className="w-full sm:w-11/12 mx-auto p-6 bg-gradient-to-br from-red-50 to-white border-0 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="flex flex-col items-center">
        <div className="w-28 h-28 sm:w-40 sm:h-40 overflow-hidden rounded-full border-1 border-red-500 shadow-md">
          <img src={profile.imageUrl} alt={profile.name} className="object-cover w-full h-full transition-transform hover:scale-110 duration-500" />
        </div>
        <div className="mt-6 text-center px-4 w-full">
          <h2 className="text-2xl sm:text-3xl font-bold text-red-800">{profile.name}</h2>
          <div className="w-16 h-1 bg-red-500 mx-auto my-3 rounded-full"></div>
          <p className="mt-2 text-xl sm:text-2xl text-gray-700 font-medium">{profile.title}</p>
          <p className="mt-2 text-lg sm:text-xl text-red-600 font-semibold">{profile.role}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
