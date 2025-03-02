"use client";
import React, { useEffect, useState } from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader'
import Editor from '../_components/Editor'
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { FILE } from '../../dashboard/_components/FileList';
import Canvas from '../_components/Canvas';
// import AI_Button from '../_components/AI_button';
// import * from '../_components/AI_button';

function Workspace({ params }: any) {
  const [triggerSave, setTriggerSave] = useState(false);
  const convex = useConvex();
  const [fileData, setFileData] = useState<FILE | any>();
  const [editorWidth, setEditorWidth] = useState(50); // Set initial width as percentage (50%)

  useEffect(() => {
    console.log("FILEID", params.fileId);
    if (params.fileId) getFileData();
  }, [params.fileId]);

  const getFileData = async () => {
    const result = await convex.query(api.files.getFileById, { _id: params.fileId });
    setFileData(result);
  };

  // Function to handle drag resize
  const handleDrag = (e: any) => {
    const newWidth = (e.clientX / window.innerWidth) * 100;
    setEditorWidth(Math.min(Math.max(newWidth, 35), 80)); // Keep width between 35% and 80%
  };

  return (
    <div>
      <WorkspaceHeader onSave={() => setTriggerSave(!triggerSave)} />

      {/* Workspace Layout */}
      <div className="flex h-screen">
        {/* Resizable Document */}
        <div
          className="flex-shrink-0"
          style={{ width: `${editorWidth}%` }}
        >
          <Editor onSaveTrigger={triggerSave} fileId={params.fileId} fileData={fileData} />
        </div>

        {/* Resizer handle */}
        <div
          onMouseDown={(e) => {
            e.preventDefault();
            document.addEventListener("mousemove", handleDrag);
            document.addEventListener("mouseup", () => {
              document.removeEventListener("mousemove", handleDrag);
            });
          }}
          className="cursor-col-resize w-1 bg-gray-900"
        ></div>

        {/* Whiteboard/canvas */}
        <div
          className="flex-grow border-l"
          style={{ width: `${100 - editorWidth}%` }}
        >
          <Canvas
            onSaveTrigger={triggerSave}
            fileId={params.fileId}
            fileData={fileData}
            imageUploadPath={"/home/surayo/Music/Next-js/crafter.io/public/images"}
          />
        </div>
      </div>
    </div>
  );
}

export default Workspace;
