import { ChevronDown, LayoutGrid, LogOut, Settings, Users } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs';
import { Separator } from '@/components/ui/separator';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export interface TEAM {
    createdBy: String;
    teamName: String;
    _id: String;
}

function SideNavTopSection({ user, setActiveTeamInfo }: any) {
    const menu = [
        { id: 1, name: 'Create Team', path: '/teams/create', icon: Users },
        { id: 2, name: 'Settings', path: '', icon: Settings },
    ];

    const router = useRouter();
    const convex = useConvex();
    const [activeTeam, setActiveTeam] = useState<TEAM>();
    const [teamList, setTeamList] = useState<TEAM[]>();

    useEffect(() => {
        if (user) {
            getTeamList();
        }
    }, [user]);

    useEffect(() => {
        if (activeTeam) {
            setActiveTeamInfo(activeTeam);
        }
    }, [activeTeam]);

    const getTeamList = async () => {
        const result = await convex.query(api.teams.getTeam, { email: user?.email });
        console.log('TeamList', result);
        setTeamList(result);
        setActiveTeam(result[0]);
    };

    const onMenuClick = (item: any) => {
        if (item.path) {
            router.push(item.path);
        }
    };

    return (
        <div className='bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white p-4 shadow-xl rounded-lg'>
            <Popover>
                <PopoverTrigger>
                <div className='flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-gray-300 to-gray-500 p-3 rounded-lg cursor-pointer hover:shadow-md'>
  <Image
    src='/logo_rotated.png'
    alt='logo'
    width={40}
    height={40}
  />

                        <h2 className='flex gap-2 items-center font-bold text-lg'>
                            {activeTeam?.teamName || 'Team Name'}
                            <ChevronDown />
                        </h2>
                    </div>
                </PopoverTrigger>
                <PopoverContent className='p-4 bg-gray-800 border border-gray-700 text-white rounded-lg shadow-lg'>
                    {/* Team Section */}
                    <div>
                        {teamList?.map((team, index) => (
                            <h2
                            key={index}
                            className={`p-2 rounded-lg cursor-pointer transition-colors ${
                              activeTeam?._id === team._id
                                ? 'bg-gradient-to-r from-yellow-400 via-gray-300 to-gray-500 text-white'
                                : 'hover:bg-gray-700'
                            }`}
                            onClick={() => setActiveTeam(team)}
                          >
                            {team.teamName}
                          </h2>
                          
                        ))}
                    </div>
                    <Separator className='my-4 bg-gray-600' />
                    {/* Option Section */}
                    <div>
                        {menu.map((item, index) => (
                            <h2
                                key={index}
                                className='flex items-center gap-2 p-2 text-sm hover:bg-gray-700 rounded-lg cursor-pointer'
                                onClick={() => onMenuClick(item)}
                            >
                                <item.icon className='h-4 w-4' />
                                {item.name}
                            </h2>
                        ))}
                        <LogoutLink>
                            <h2 className='flex items-center gap-2 p-2 text-sm hover:bg-gray-700 rounded-lg cursor-pointer'>
                                <LogOut className='h-4 w-4' />
                                Logout
                            </h2>
                        </LogoutLink>
                    </div>
                    <Separator className='my-4 bg-gray-600' />
                    {/* User Info Section */}
                    {user && (
                        <div className='mt-2 flex items-center gap-2'>
                            <Image
                                src={user?.picture}
                                alt='user'
                                width={30}
                                height={30}
                                className='rounded-full shadow-md'
                            />
                            <div>
                                <h2 className='text-sm font-bold'>{user?.given_name} {user?.family_name}</h2>
                                <h2 className='text-xs text-gray-400'>{user?.email}</h2>
                            </div>
                        </div>
                    )}
                </PopoverContent>
            </Popover>

            {/* All Files Button */}
            <Button
  variant='ghost'
  className='w-full justify-start gap-2 font-bold mt-6 bg-gradient-to-r from-yellow-400 via-gray-300 to-gray-500 hover:from-yellow-500 hover:to-gray-400 text-white'
>


                <LayoutGrid className='h-5 w-5' />
                All Files
            </Button>
        </div>
    );
}

export default SideNavTopSection;
