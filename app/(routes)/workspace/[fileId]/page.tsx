"use client";
import React, { useEffect, useState } from 'react';
import WorkspaceHeader from '../_components/WorkspaceHeader';
import Editor from '../_components/Editor';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { FILE } from '../../dashboard/_components/FileList';
import Canvas from '../_components/Canvas';

function Workspace({ params }: any) {
  const [triggerSave, setTriggerSave] = useState(false);
  const convex = useConvex();
  const [fileData, setFileData] = useState<FILE | null>(null);
  const [editorWidth, setEditorWidth] = useState(50);

  useEffect(() => {
    if (params.fileId) getFileData();
  }, [params.fileId]);

  const getFileData = async () => {
    try {
      const result = await convex.query(api.files.getFileById, { _id: params.fileId });
      setFileData(result);
    } catch (err) {
      console.error("Error fetching file data:", err);
    }
  };

  const handleDrag = (e: MouseEvent) => {
    const newWidth = (e.clientX / window.innerWidth) * 100;
    setEditorWidth(Math.min(Math.max(newWidth, 35), 80));
  };

  if (!fileData) {
    return <div className="text-center p-5 text-gray-400">Loading workspace...</div>;
  }

  return (
    <div>
      <WorkspaceHeader
        onSave={() => setTriggerSave(!triggerSave)}
        fileName={fileData.fileName}
        _id={fileData._id}
      />

      <div className="flex h-screen">
        <div className="flex-shrink-0" style={{ width: `${editorWidth}%` }}>
          <Editor onSaveTrigger={triggerSave} fileId={params.fileId} fileData={fileData} />
        </div>

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

        <div className="flex-grow border-l" style={{ width: `${100 - editorWidth}%` }}>
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
