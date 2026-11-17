
import React from 'react';
import Link from 'next/link';

// Define the props interface
interface ProfileCardProps {
    name: string;
    designation: string;
    imageSrc: string;
    bio: string;
    href?: string; // optional contributor page link
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, designation, imageSrc, bio, href }) => {
    return (
        <div className='break-inside-avoid'>

        <div className="w-full max-w-sm bg-white border rounded-xl shadow dark:bg-[#191919] border-[#EA4168]">
            <div className="flex flex-col items-center pb-8 pt-8">
                <img className="w-[140px] h-[140px] mb-3 rounded-full shadow-lg" src={imageSrc} alt={`${name} image`} />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {href ? (
                        <Link href={href} className="underline underline-offset-2 hover:text-[#EA4168] transition-colors">
                            {name}
                        </Link>
                    ) : (
                        name
                    )}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{designation}</span>
                <p className={`text-md text-gray-500 dark:text-gray-400 px-5 py-3 ${bio.length > 70 ? `text-left` : `text-center`}`}>{bio}</p>
            </div>
        </div>
        </div>
    );
};

export default ProfileCard;
