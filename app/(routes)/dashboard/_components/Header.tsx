import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import Image from 'next/image';
import React, { useState } from 'react';

function Header() {
    const { user }: any = useKindeBrowserClient();
    const [searchQuery, setSearchQuery] = useState('');

    // Handle the search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    // Optional: Define a function to trigger search action
    const handleSearch = () => {
        console.log('Searching for:', searchQuery);
        // Add your search logic here, like filtering data or calling an API
    };

    return (
        <div className="flex justify-between w-full gap-4 items-center bg-gray-900 p-3">
            {/* Search Input */}
            {/* You can uncomment and add search logic here */}
            {/* <div className="flex gap-2 items-center border border-gray-600 rounded-md p-1 bg-gray-800 text-gray-300">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Trigger search on Enter key press
                    className="bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm placeholder-gray-400"
                />
            </div> */}

            {/* User Info */}
            <div className="flex items-center gap-2">
                <div>
                    <Image
                        src="/img.png" // Replace with dynamic user image if needed
                        alt="user"
                        width={30}
                        height={30}
                        className="rounded-full border border-gray-500"
                    />
                </div>

                {/* User Name with Tooltip */}
                <div className="relative group">
                    <span className="text-white mr-2 cursor-pointer">
                        {user?.name || 'Madara Uchiha'}
                    </span>
                    <div className="absolute left-0 bg-gray-700 text-white text-sm rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {user?.email}
                    </div>
                </div>
            </div>

            {/* Invite Button Removed */}
        </div>
    );
}

export default Header;
