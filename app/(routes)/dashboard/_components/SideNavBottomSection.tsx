import { Button } from '@/components/ui/button'
import { Archive, Flag, Github, Linkedin } from 'lucide-react' // Import Linkedin icon
import React, { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'

function SideNavBottomSection({ onFileCreate, totalFiles }: any) {
  const menuList = [
    {
      id: 1,
      name: 'Getting Started',
      icon: Flag,
      path: ''
    },
    {
      id: 2,
      name: 'Github',
      icon: Github,
      path: 'https://github.com/joyboi-ai/joyboi-ai'
    },
    {
      id: 3,
      name: 'LinkedIn',
      icon: Linkedin,
      path: 'https://www.linkedin.com/in/suryaprasad-yadav-932b22304/' // Replace with your LinkedIn profile URL
    }
  ]

  const [fileInput, setFileInput] = useState('');

  const handleMenuClick = (path: string) => {
    if (path) {
      window.open(path, '_blank'); // Open in a new tab
    }
  };

  return (
    <div>
      {menuList.map((menu, index) => (
        <h2
          key={index}
          className='flex gap-2 p-1 px-2 text-[14px] hover:bg-amber-400 rounded-md cursor-pointer'
          onClick={() => handleMenuClick(menu.path)}
        >
          <menu.icon className='h-5 w-5' />
          {menu.name}
        </h2>
      ))}

      {/* Add New File Button */}
      <Dialog>
        <DialogTrigger className='w-full' asChild>
          <Button className='w-full bg-yellow-600 hover:bg-yellow-700 justify-start mt-3'>New File</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New File</DialogTitle>
            <DialogDescription>
              <Input
                placeholder='Enter File Name'
                className='mt-3'
                onChange={(e) => setFileInput(e.target.value)}
              />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                className='bg-yellow-600 hover:bg-yellow-700'
                disabled={!(fileInput && fileInput.length > 3)}
                onClick={() => onFileCreate(fileInput)}
              >
                Create
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <h2 className='text-[12px] mt-3'>
        <strong>Stay hungry, stay foolish.</strong> 
      </h2>
      <h2 className='text-[12px] mt-1'>Dont Forget to check my Github and LinkedIn pages.</h2>
    </div>
  )
}

export default SideNavBottomSection
