import React from 'react';
import { useRouter } from 'next/navigation';

const TrackCard: React.FC = () => {
    const router = useRouter();

    return (
        <div className="bg-white rounded-lg border border-gray-300 shadow-md p-6 max-w-xs mx-auto">
            <div className="flex justify-between items-center mb-4">

                <h2 className="text-2xl font-bold">TRACKS</h2>

                <img
                    src="https://img.icons8.com/ios-filled/50/000000/running.png" 
                    alt="Tracks Icon"
                    className="w-6 h-6 ml-3" 
                    width={100} height={100}
                />
            </div>

            <div
                className="cursor-pointer mb-2 p-2 hover:bg-gray-200 rounded"
                onClick={() => router.push('/researchTracks')}
            >
                <p className="text-lg font-medium">Research Tracks</p>
                <p className="text-sm text-gray-500">Description</p>
            </div>
            <div
                className="cursor-pointer p-2 hover:bg-gray-200 rounded"
                onClick={() => router.push('/industryTracks')}
            >
                <p className="text-lg font-medium">Industry Tracks</p>
                <p className="text-sm text-gray-500">Description</p>
            </div>
        </div>
    );
};

export default TrackCard;