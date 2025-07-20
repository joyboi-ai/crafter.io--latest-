import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Share, Clipboard } from 'lucide-react';
import { FaWhatsapp, FaFacebook, FaLinkedin } from "react-icons/fa";
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { Id } from '@/convex/_generated/dataModel';

interface WorkspaceHeaderProps {
  onSave: () => void;
  fileName: string;
  _id: Id<"files">;
}

function WorkspaceHeader({ onSave, fileName, _id }: WorkspaceHeaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newFileName, setNewFileName] = useState(fileName);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const url = typeof window !== "undefined" ? window.location.href : "";

  const shareOptions = [
    {
      name: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=Check this out: ${url}`,
      icon: <FaWhatsapp className="text-green-500 w-5 h-5" />,
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      icon: <FaFacebook className="text-blue-600 w-5 h-5" />,
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      icon: <FaLinkedin className="text-blue-500 w-5 h-5" />,
    },
    {
      name: 'Copy to Clipboard',
      action: () => {
        navigator.clipboard.writeText(url);
        alert('URL copied to clipboard.');
      },
      icon: <Clipboard className="text-gray-300 w-5 h-5" />,
    },
  ];

  const renameFile = useMutation(api.files.renameFile);

  const handleMouseMove = (e: MouseEvent) => {
    setIsVisible(e.clientY < 20);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  const handleRename = async () => {
    if (newFileName !== fileName) {
      try {
        await renameFile({ _id, newFileName });
      } catch (error) {
        console.error("Failed to rename file", error);
      }
    }
    setIsEditing(false);
  };

  const handleShareClick = () => {
    setTimeout(() => {
      setIsDropdownOpen(true);
    }, 300);
  };

  return (
    <div
      className={`p-3 flex justify-between items-center fixed top-0 left-1/2 transform -translate-x-1/2 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      style={{
        backgroundColor: 'rgba(34, 34, 34, 0.95)',
        color: '#e0e0e0',
        width: '80%',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
      }}
    >
      <div className="flex gap-2 items-center">
        <Image
          src="/img.png"
          alt="user"
          width={30}
          height={30}
          className="rounded-full border border-gray-600"
        />
        {!isEditing ? (
          <h1
            className="h-8 text-[16px] text-white font-bold px-2 flex items-center cursor-pointer"
            onDoubleClick={() => setIsEditing(true)}
          >
            <strong>{fileName || "test1"}</strong>
          </h1>
        ) : (
          <input
            className="text-[18px] bg-[#2a2a2a] text-white px-2 py-1 rounded border border-gray-600"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            onBlur={handleRename}
            autoFocus
          />
        )}
      </div>

      <div className="flex items-center gap-4 relative">
        <Button
          className="h-8 text-[12px] gap-2 bg-gray-700 hover:bg-gray-600"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" /> Go Back
        </Button>

        <Button
          className="h-8 text-[12px] gap-2 bg-blue-600 hover:bg-blue-700"
          onClick={onSave}
        >
          <Save className="h-4 w-4" /> Save
        </Button>

        {/* Share Button */}
        <div className="relative">
          <Button
            className="h-8 text-[12px] gap-2 bg-amber-400 hover:bg-amber-700"
            onClick={handleShareClick}
          >
            <Share className="h-4 w-4" /> Share
          </Button>

          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-lg"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setTimeout(() => setIsDropdownOpen(false), 500)}
            >
              {shareOptions.map((option, index) => (
                <a
                  key={index}
                  href={option.url || '#'}
                  onClick={(e) => {
                    if (option.action) {
                      e.preventDefault();
                      option.action();
                    }
                  }}
                  target={option.url ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-2 text-white hover:bg-gray-700 cursor-pointer"
                >
                  {option.icon}
                  {option.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkspaceHeader;
