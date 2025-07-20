import React, { useContext, useEffect, useState } from "react";
import { FileListContext } from "@/app/_context/FilesListContext";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Archive, File, MoreHorizontal } from "lucide-react";
import moment from "moment";
import { Id } from '@/convex/_generated/dataModel';
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useMutation } from "convex/react";

export interface FILE {
  archive: boolean;
  createdBy: string;
  document: string;
  fileName: string;
  teamId: string;
  whiteboard: string;
  _id: Id<"files">;
  _creationTime: number;
  _lastEditedTime: number;
  _proirity: string;
}

const COOKIE_KEY = "priorityMapping";

function FileList() {
  const { fileList_, setFileList_ } = useContext(FileListContext);
  const [fileList, setFileList] = useState<FILE[]>();
  const { user }: any = useKindeBrowserClient();
  const router = useRouter();

  // Convex mutation for deleting a file
  // const deleteFile = useMutation(api.teams.deleteFile);

  // On mount or when fileList_ updates, merge cookie mapping into the file list.
  useEffect(() => {
    if (fileList_) {
      let newList = fileList_;
      // Get the cookie mapping for priorities (structured by teamId and fileName)
      let mapping: Record<string, Record<string, string>> = {};
      const cookieData = Cookies.get(COOKIE_KEY);
      if (cookieData) {
        try {
          mapping = JSON.parse(cookieData);
        } catch (error) {
          console.error("Error parsing cookie mapping:", error);
        }
      }
      // For each file, use the mapping if available; otherwise, set a default value ("Unassigned")
      newList = newList.map(
        (file: { teamId: string | number; fileName: string | number }) => {
          if (!mapping[file.teamId]) {
            mapping[file.teamId] = {};
          }
          if (!mapping[file.teamId][file.fileName]) {
            // Set default if not present
            mapping[file.teamId][file.fileName] = "Unassigned";
          }
          return { ...file, _proirity: mapping[file.teamId][file.fileName] };
        }
      );
      // Update the cookie with any new default mappings (expires in 30 days)
      Cookies.set(COOKIE_KEY, JSON.stringify(mapping), {
        expires: 30,
        path: "/",
      });
      setFileList(newList);
    }
  }, [fileList_]);

  // Handle changing priority and update both state and cookie mapping.
  const handlePriorityChange = (id: string, priority: string) => {
    // Update local state and context.
    const updatedList = fileList?.map((file) =>
      file._id === id ? { ...file, _proirity: priority } : file
    );
    setFileList(updatedList);
    setFileList_?.(updatedList);

    // Get the existing mapping from the cookie.
    let mapping: Record<string, Record<string, string>> = {};
    const cookieData = Cookies.get(COOKIE_KEY);
    if (cookieData) {
      try {
        mapping = JSON.parse(cookieData);
      } catch (error) {
        console.error("Error parsing cookie mapping:", error);
      }
    }
    // Find the file to update (to access its teamId and fileName).
    const fileToUpdate = fileList?.find((file) => file._id === id);
    if (fileToUpdate) {
      if (!mapping[fileToUpdate.teamId]) {
        mapping[fileToUpdate.teamId] = {};
      }
      mapping[fileToUpdate.teamId][fileToUpdate.fileName] = priority;
      // Persist the updated mapping.
      Cookies.set(COOKIE_KEY, JSON.stringify(mapping), {
        expires: 30,
        path: "/",
      });
    }
  };

  // Handle file deletion using Convex backend.
  const handleDelete = async (fileId: string) => {
    try {
      // Call the Convex mutation to delete the file from the backend.
      // await deleteFile(fileId);
      // Remove file from the list locally.
      const updatedList = fileList?.filter((file) => file._id !== fileId);
      setFileList(updatedList);
      setFileList_?.(updatedList);
      console.log(`Deleted file with ID: ${fileId}`);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const priorityFill: Record<string, string> = {
    High: "bg-red-500",
    Medium: "bg-yellow-500",
    Low: "bg-green-500",
    Unassigned: "bg-gray-500",
  };

  const priorityTextColor: Record<string, string> = {
    High: "text-red-400",
    Medium: "text-yellow-400",
    Low: "text-green-400",
    Unassigned: "text-gray-400",
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="mt-10 p-4">
        <div className="overflow-x-auto bg-gray-800 text-white rounded-lg shadow-lg">
          <table className="min-w-full divide-y-2 divide-gray-700">
            <thead className="text-left">
              <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium">
                  File Name
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium">
                  Created At
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium">
                  Priority
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium"></td>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {fileList &&
                fileList.map((file: FILE, index: number) => (
                  <tr
                    key={index}
                    className="odd:bg-gray-700 cursor-pointer"
                    onClick={() => router.push(`/workspace/${file._id}`)}
                  >
                    <td className="whitespace-nowrap px-4 py-2">
                      {file.fileName}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      {moment(file._creationTime).format("DD MMM YYYY, h:mm A")}
                    </td>
                    <td
                      className="whitespace-nowrap px-4 py-2"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <div className="flex items-center gap-2 cursor-pointer">
                            <div
                              className={`h-4 w-4 rounded-full ${priorityFill[file._proirity]}`}
                            ></div>
                            <span
                              className={`text-sm font-medium ${priorityTextColor[file._proirity]}`}
                            >
                              {file._proirity || "Unassigned"}
                            </span>
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {["High", "Medium", "Low", "Unassigned"].map(
                            (priority) => (
                              <DropdownMenuItem
                                key={priority}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  handlePriorityChange(file._id, priority);
                                }}
                                className="flex items-center gap-2 cursor-pointer"
                              >
                                <div
                                  className={`h-4 w-4 rounded-full ${priorityFill[priority]}`}
                                ></div>
                                <span
                                  className={`text-sm font-medium ${priorityTextColor[priority]}`}
                                >
                                  {priority}
                                </span>
                              </DropdownMenuItem>
                            )
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      {user && (
                        <Image
                          src="/img.png"
                          alt="user"
                          width={30}
                          height={30}
                          className="rounded-full"
                        />
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={(event) => {
                              event.stopPropagation();
                              router.push(`/workspace/${file._id}`);
                            }}
                            className="flex items-center gap-3"
                          >
                            <File className="h-4 w-4" /> Open
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(event) => {
                              event.stopPropagation();
                              // Call the delete functionality using Convex
                              handleDelete(file._id);
                            }}
                            className="flex items-center gap-3"
                          >
                            <Archive className="h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FileList;
