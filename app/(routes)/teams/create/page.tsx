"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { api } from '@/convex/_generated/api'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useMutation } from 'convex/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

function CreateTeam() {

  const [teamName, setTeamName] = useState('');
  const createTeam = useMutation(api.teams.createTeam);
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();

  const createNewTeam = () => {
    createTeam({
      teamName: teamName,
      createdBy: user?.email
    }).then(resp => {
      console.log(resp);
      if (resp) {
        router.push('/dashboard');
        toast('Team created successfully!!!');
      }
    });
  };

  return (
    <div className='bg-black text-white flex justify-center items-center min-h-screen'>
      <div className='px-6 md:px-16'>
        <div className="flex items-center space-x-2">
          
          
          {/* Crafter.io Text */}
          <div className='flex items-center'>
            <Image 
              src='/logo_rotated.png' 
              alt='logo' 
              width={180} 
              height={60} 
            />
            <h1 className="gradient-text-teams text-5xl font-bold ml-5">Crafter.io</h1>

          </div>
        </div>
        <div className='flex flex-col items-center mt-8'>
          <h2 className='font-bold text-[40px] py-3 text-white'>
            What should we call your team?
          </h2>
          <h2 className='text-gray-400'>
            Remember project name is permanent !.
          </h2>
          <div className='mt-7 w-[40%]'>
            <label className='text-gray-400'>
              Team Name
            </label>
            <Input 
              placeholder='Team Name' 
              className='mt-3 bg-gray-800 border border-gray-600 text-white' 
              onChange={(e) => setTeamName(e.target.value)} 
            />
          </div>
          <Button 
            className='bg-amber-300 mt-9 w-[30%] hover:bg-orange-600'
            disabled={!(teamName && teamName.length > 0)}
            onClick={createNewTeam}
          >
            Create Team
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateTeam;
