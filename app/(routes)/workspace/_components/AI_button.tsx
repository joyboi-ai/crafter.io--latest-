import { useState, useRef, useEffect } from "react";
import { stagger, useAnimate, animate } from "framer-motion";
import { WandSparkles } from "lucide-react";
import { resultGamini } from "./Result";

const randomNumberBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
let out: any;
type AnimationSequence = Parameters<typeof animate>[0];

function AI_Button({ fileId }: { fileId: string }) {
  const [scope, animate] = useAnimate();
  const [isPromptVisible, setIsPromptVisible] = useState(false);
  const [userPrompt, setUserPrompt] = useState("");
  const [charCount, setCharCount] = useState(0); // For tracking the character count
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const MAX_PROMPT_LENGTH = 200; // Set a maximum character limit for the prompt
  const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  async function run() {
    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      // Use a simple prompt for testing or improve the handling
      const result = await chatSession.sendMessage("Who is Mona Lisa?");
      await resultGamini(result);

      if (result?.response?.blocked) {
        console.error(
          "The response was blocked due to:",
          result.response.reason || "unknown reason"
        );

        return result;
      }

      console.log("Generated Response:", result.response.text());
    } catch (error) {
      console.error("Error during AI interaction:");
    }
  }

  // Trigger animation on button click
  const onButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent row click

    // Toggle the prompt visibility
    setIsPromptVisible(true);

    // Handle the sparkles animation
    const sparkles = Array.from({ length: 10 });
    const sparklesAnimation: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        x: randomNumberBetween(-100, 100),
        y: randomNumberBetween(-100, 100),
        scale: randomNumberBetween(1.5, 2.5),
        opacity: 1,
      },
      {
        duration: 0.4,
        at: "<",
      },
    ]);

    const sparklesFadeOut: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        opacity: 0,
        scale: 0,
      },
      {
        duration: 0.3,
        at: "<",
      },
    ]);

    const sparklesReset: AnimationSequence = sparkles.map((_, index) => [
      `.sparkle-${index}`,
      {
        x: 0,
        y: 0,
      },
      {
        duration: 0.000001,
      },
    ]);

    animate([
      //@ts-ignore
      ...sparklesReset,
      [".letter", { y: -32 }, { duration: 0.2, delay: stagger(0.05) }],
      ["button", { scale: 0.8 }, { duration: 0.1, at: "<" }],
      ["button", { scale: 1 }, { duration: 0.1 }],
      //@ts-ignore
      ...sparklesAnimation,
      [".letter", { y: 0 }, { duration: 0.000001 }],
      //@ts-ignore
      ...sparklesFadeOut,
    ]);
  };

  // Handle changes in the prompt textarea
  const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPrompt = event.target.value;
    setCharCount(newPrompt.length); // Update character count

    if (newPrompt.length <= MAX_PROMPT_LENGTH) {
      setUserPrompt(newPrompt);
    }
  };

  // Handle prompt submission
  const handlePromptSubmit = async () => {
    console.log("User Prompt:", userPrompt);
    setIsPromptVisible(false); // Optionally close the prompt after submission
    const result = await model.generateContent("" + userPrompt);
    console.log(result.response.text());

    // <Result params={out} />;

    // return out
  };

  // Handle cancel action (close the prompt without saving)
  const handleCancel = () => {
    setIsPromptVisible(false);
    setUserPrompt(""); // Optionally reset the prompt text
  };

  // Dynamically adjust the textarea height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height before resizing
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [userPrompt]);

  return (
    <div ref={scope}>
      <button
        onClick={onButtonClick}
        className="relative flex items-center justify-center rounded-full border-4 border-amber-500 bg-gradient-to-r from-yellow-400 to-amber-500 w-12 h-12 p-2 text-sm font-semibold transition-all duration-300 transform hover:rounded-lg hover:w-36 hover:h-12 hover:px-3 hover:py-1.5 hover:text-white hover:bg-gradient-to-r hover:from-amber-500 hover:to-yellow-400 active:bg-yellow-600 active:text-amber-200 shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-300"
        style={{
          animation: "glittering 2s infinite linear", // Inline glittering animation
        }}
      >
        <span className="sr-only">Crafter.AI</span>
        <span className="block h-6 overflow-hidden" aria-hidden>
          {["C", "r", "a", "f", "t", "e", "r", ".", "A", "I"].map(
            (letter, index) => (
              <span
                data-letter={letter}
                key={`${letter}-${index}`}
                className="letter"
              >
                {letter}
              </span>
            )
          )}
        </span>

        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 block"
        >
          {Array.from({ length: 20 }).map((_, index) => (
            <svg
              className={`absolute left-1/2 top-1/2 opacity-0 sparkle-${index}`}
              key={index}
              viewBox="0 0 122 117"
              width="8"
              height="8"
            >
              <path
                className="fill-white"
                d="M64.39,2,80.11,38.76,120,42.33a3.2,3.2,0,0,1,1.83,5.59h0L91.64,74.25l8.92,39a3.2,3.2,0,0,1-4.87,3.4L61.44,96.19,27.09,116.73a3.2,3.2,0,0,1-4.76-3.46h0l8.92-39L1.09,47.92A3.2,3.2,0,0,1,3,42.32l39.74-3.56L58.49,2a3.2,3.2,0,0,1,5.9,0Z"
              />
            </svg>
          ))}
        </span>

        <div className="text-white">
          <WandSparkles size={18} />
        </div>
      </button>

      {isPromptVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-md">
          <div className="bg-gray-900 p-6 rounded-lg shadow-xl w-full sm:w-80">
            <textarea
              ref={textareaRef}
              value={userPrompt}
              //@ts-ignore
              onChange={handlePromptChange}
              placeholder="Enter your prompt"
              maxLength={MAX_PROMPT_LENGTH} // Set the max length for the textarea
              className="p-2 border border-amber-500 rounded-md w-full mb-4 text-gray-900 focus:ring-2 focus:ring-amber-500 resize-none overflow-hidden"
            />
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">
                {charCount}/{MAX_PROMPT_LENGTH} characters
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={handlePromptSubmit}
                  className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-4 py-2 rounded-md transition-colors hover:bg-gradient-to-r hover:from-amber-500 hover:to-yellow-400 active:bg-yellow-600"
                >
                  Submit
                </button>
                <button
                  onClick={handleCancel}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-md transition-colors hover:bg-gray-600 active:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
// exports out;
export default AI_Button;

// export default {
//   AI_Button,
//   out,
// };
