"use client";
import { Text, ListTodo, MessageSquareQuote, Link } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Checklist from '@editorjs/checklist';
import Paragraph from '@editorjs/paragraph';
import Warning from '@editorjs/warning';
import Quote from '@editorjs/quote';
import Embed from '@editorjs/embed';
import Code from '@editorjs/code';
import LinkTool from '@editorjs/link';
import Table from '@editorjs/table';
import Delimiter from '@editorjs/delimiter';
import Marker from '@editorjs/marker';
import InlineCode from '@editorjs/inline-code';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { FILE } from '../../dashboard/_components/FileList';
import { WandSparkles } from "lucide-react";

const rawDocument = {
  "time": 1550476186479,
  "blocks": [
    {
      data: {
        text: '',
        level: 1 
      },
      id: "1234",
      type: 'header'
    },
    {
      data: {
        text: '',
        level: 3
      },
      id: "1236",
      type: 'paragraph'
    },
  ],
  "version": "2.8.1"
};

function formatResponseToEditorJS(response: string): { blocks: any[] } {
  try {
    if (typeof response === "string") {
      return {
        blocks: [
          {
            type: "paragraph",
            data: { text: response },
            id: "response-1",
          },
        ],
      };
    }

    return {
      blocks: [
        {
          type: "paragraph",
          data: { text: "Unexpected response format." },
          id: "response-error",
        },
      ],
    };
  } catch (error) {
    console.error("Failed to format response:", error);
    return {
      blocks: [
        { type: "paragraph", data: { text: "Error: Unable to process the response." } },
      ],
    };
  }
}

function Editor({ onSaveTrigger, fileId, fileData }: { onSaveTrigger: any, fileId: any, fileData: FILE }) {

  const ref = useRef<EditorJS | null>(null);
  const updateDocument = useMutation(api.files.updateDocument);
  const [isPromptVisible, setIsPromptVisible] = useState(false);
  const [userPrompt, setUserPrompt] = useState("");
  const [charCount, setCharCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const MAX_PROMPT_LENGTH = 200;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fileData && initEditor();
  }, [fileData]);

  useEffect(() => {
    onSaveTrigger && onSaveDocument();
  }, [onSaveTrigger]);
  
  const initEditor = () => {
    const editor = new EditorJS({
      tools: {
        header: {
          class: Header,
          shortcut: 'CMD+SHIFT+H',
          inlineToolbar: true,
          config: {
            placeholder: 'Enter a Header',
            levels: [1, 2, 3, 4, 5, 6],
          }
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered'
          }
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
          config: {
            placeholder: 'One word leads to paragraph, paragraph leads to sentence and sentences lead to pages'
          }
        },
        warning: Warning,
        quote: Quote,
        embed: Embed,
        code: Code,
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: 'http://localhost:3000',
          }
        },
        table: Table,
        delimiter: Delimiter,
        marker: Marker,
        inlineCode: InlineCode,
      },
      holder: 'editorjs',
      data: fileData?.document ? JSON.parse(fileData.document) : rawDocument
    });
    ref.current = editor;
  };

  const onSaveDocument = () => {
    if (ref.current) {
      ref.current.save().then((outputData) => {
        updateDocument({
          _id: fileId,
          document: JSON.stringify(outputData)
        })
        .then(() => {
          toast('Document Updated!');
        })
        .catch((error) => {
          console.log('Saving failed: ', error);
          toast("Server Error!");
        });
      }).catch((error) => {
        console.log('Saving failed: ', error);
      });
    }
  };

  const addHeader = () => {
    ref.current?.blocks.insert("header", { text: "New Header" });
  };
  const addList = () => {
    ref.current?.blocks.insert("list", { items: ["Item 1", "Item 2", "Item 3"] });
  };
  const addQuote = () => {
    ref.current?.blocks.insert("quote", { text: "This is a quote" });
  };
  const addEmbed = () => {
    ref.current?.blocks.insert("code", {}); // Assuming code block for embed
  };
  const buttonStyle = {
    padding: "6px 12px",
    backgroundColor: "#4b4b4b",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const handleButtonClick = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      setIsPromptVisible(true);
    }
  };
  const handlePromptSubmit = async () => {
    setIsLoading(true);
    try {
      const { GoogleGenerativeAI } = require("@google/generative-ai");
      const apiKey = "AIzaSyDm7a1Vw4-Gp8h2GMsjHlFg438PDc2x574";
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-exp",
      });
      const chatSession = model.startChat({
        generationConfig: {
          temperature: 1,
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 8192,
          responseMimeType: "text/plain",
        },
        history: [],
      });
      const result = await chatSession.sendMessage(userPrompt);
      const response = await result.response.text();
      console.log("Response from Gemini:", response);

      const formattedData = formatResponseForEditorJS(response);

      if (ref.current) {
        ref.current.blocks.clear();
        ref.current.blocks.insert("header", { text: userPrompt });
        formattedData.blocks.forEach((block) =>
          ref.current.blocks.insert(block.type, block.data)
        );
      }

      setIsPromptVisible(false);
    } catch (error) {
      console.error("Error during Gemini interaction:", error);
    } finally {
      setIsLoading(false); 
    }
  };
  // Helper function to format response
  function formatResponseForEditorJS(response: string): { blocks: any[] } {
    const blocks: any[] = [];
    const lines = response.split("\n");

    lines.forEach((line) => {
      const trimmedLine = line.trim();

      if (trimmedLine.startsWith("- ") || trimmedLine.startsWith("* ")) {
        // It's a bullet point
        const lastBlock = blocks[blocks.length - 1];
        if (lastBlock && lastBlock.type === "list") {
          // Add to existing list
          lastBlock.data.items.push(trimmedLine.slice(2));
        } else {
          // Create a new list
          blocks.push({
            type: "list",
            data: { items: [trimmedLine.slice(2)] },
          });
        }
      } else if (trimmedLine) {
        // It's a paragraph
        blocks.push({
          type: "paragraph",
          data: { text: trimmedLine },
        });
      }
    });

    return { blocks };
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#1a202c',
        color: '#e2e2e2',
        padding: 0,
        margin: 0,
      }}
    >
      {/* Toolbar Wrapper */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backgroundColor: '#3b3b3b',
          padding: '5px 10px',
          borderRadius: '10px 10px 0 0',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
          height: '40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Toolbar Buttons */}
        <button className="toolbar-button hover:bg-gray-300 rounded border  inline-flex items-center h-8 px-3 text-sm" onClick={addHeader}>
          <Text size={18} />
          <span style={{ marginLeft: '5px' }}>Header</span>
        </button>
        <button className="toolbar-button hover:bg-gray-300 rounded border  inline-flex items-center h-8 px-3 text-sm" onClick={addList}>
          <ListTodo size={20} />
          <span style={{ marginLeft: '5px' }}>List</span>
        </button>
        <button className="toolbar-button hover:bg-gray-300 rounded border  inline-flex items-center h-8 px-3 text-sm" onClick={addQuote}>
          <MessageSquareQuote size={20} />
          <span style={{ marginLeft: '5px' }}>Quote</span>
        </button>
        <button className="toolbar-button hover:bg-gray-300 rounded border  inline-flex items-center h-8 px-3 text-sm" onClick={addEmbed}>
          <Link size={20} />
          <span style={{ marginLeft: '5px' }}>Embed</span>
        </button>

        {/* AI Button */}
        <button
          onClick={handleButtonClick}
          style={{
            ...buttonStyle,
            width: 'auto',
            height: '40px',
            borderRadius: '20px',
            padding: '0 10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
          }}
          className="ai-button hover:bg-gradient-to-r hover:from-amber-500 hover:to-yellow-400"
        >
          <WandSparkles size={18} />
          <span>AI</span>
        </button>
      </div>

      {/* Draggable Container */}
      <div
        style={{
          flex: 1,
          padding: '20px',
          backgroundColor: '#2a2a2a',
          borderRadius: '0 0 10px 10px',
          border: '1px solid #444',
          overflowY: 'auto',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
          maxHeight: 'calc(100vh - 40px)',
        }}
      >
        {/* Editor */}
        <div id="editorjs"></div>
      </div>

      {/* Prompt Modal */}
      {isPromptVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-md">
          <div className="bg-gray-900 p-6 rounded-lg shadow-xl w-full sm:w-96">
            <textarea
              ref={textareaRef}
              value={userPrompt}
              onChange={(e) => {
                const prompt = e.target.value;
                setCharCount(prompt.length);
                if (prompt.length <= MAX_PROMPT_LENGTH) setUserPrompt(prompt);
              }}
              placeholder="Enter your prompt"
              maxLength={MAX_PROMPT_LENGTH}
              className="p-3 border border-amber-500 rounded-md w-full mb-4 text-gray-900 focus:ring-2 focus:ring-amber-500 resize-none overflow-hidden"
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">
                {charCount}/{MAX_PROMPT_LENGTH}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={handlePromptSubmit}
                  className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-4 py-2 rounded-md transition-colors hover:bg-gradient-to-r hover:from-amber-500 hover:to-yellow-400 active:bg-yellow-600"
                >
                  Submit
                </button>
                <button
                  onClick={() => setIsPromptVisible(false)}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-md transition-colors hover:bg-gray-600 active:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-md">
          <div className="bg-gray-900 p-6 rounded-lg shadow-xl w-full sm:w-96">
            <div className="flex justify-center items-center">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" fill="currentColor" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span className="text-white ml-3">Loading...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Editor;
