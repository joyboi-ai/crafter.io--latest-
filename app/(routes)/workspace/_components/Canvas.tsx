import React, { useEffect, useState } from 'react';
import { Excalidraw, MainMenu, WelcomeScreen } from '@excalidraw/excalidraw';
import { FILE } from '../../dashboard/_components/FileList';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
const imageUploadPath="public/images/IMG";
function Canvas({ onSaveTrigger, fileId, fileData, imageUploadPath }: { onSaveTrigger: any; fileId: any; fileData: FILE; imageUploadPath: string }) {
    const [whiteBoardData, setWhiteBoardData] = useState<any>();
    const [localImages, setLocalImages] = useState<any[]>([]);
    const updateWhiteboard = useMutation(api.files.updateWhiteboard);

    useEffect(() => {
        onSaveTrigger && saveWhiteboard();
    }, [onSaveTrigger]);

    const saveWhiteboard = () => {
        updateWhiteboard({
            _id: fileId,
            whiteboard: JSON.stringify(whiteBoardData)
        }).then(resp => console.log(resp));
    };

    return (
        <div className="flex flex-col h-full">
            {fileData && (
                <Excalidraw
                    theme="dark"
                    initialData={{
                        elements: fileData?.whiteboard && JSON.parse(fileData?.whiteboard),
                    }}
                    onChange={(excalidrawElements, appState, files) =>
                        setWhiteBoardData(excalidrawElements)
                    }
                >
                    <MainMenu position="top-left">
                        <MainMenu.DefaultItems.ClearCanvas />
                        <MainMenu.DefaultItems.SaveAsImage />z
                        <MainMenu.DefaultItems.ChangeCanvasBackground />
                    </MainMenu>

                    <WelcomeScreen position="center">
                        <WelcomeScreen.Hints.MenuHint />
                        <WelcomeScreen.Hints.ToolbarHint />
                        <div className="absolute top-0 right-0 p-4">
                            <WelcomeScreen.Center.MenuItemHelp />
                        </div>
                    </WelcomeScreen>
                </Excalidraw>
            )}

            <div>
                {localImages.map((image, index) => (
                    <img key={index} src={image} alt={`Local Image ${index}`} style={{ maxWidth: '100px', margin: '10px' }} />
                ))}
            </div>
        </div>
    );
}

export default Canvas;
