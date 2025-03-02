import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";
import React from "react";
import {
  PenTool,
  Diamond,
  Ruler,
  Brush,
  Pencil,
  PaintBucket,
  FileText,
  Award,
  Layout,
  Workflow,
  Code,
  CircuitBoard,
  Database,
} from "lucide-react";

function Hero() {
  const iconStyles: React.CSSProperties = {
    width: "4rem",
    height: "4rem",
    position: "absolute",
    opacity: 0.2,
    pointerEvents: "none", 
  };

  return (
    <section
      className="relative bg-black overflow-hidden"
      style={{
        height: "100vh", // Full viewport height
        overflow: "hidden", // Prevent scrolling due to overflow
      }}
    >
      {/* Icons strategically placed in the background */}
      <Award
        style={{ ...iconStyles, top: "5%", left: "5%" }}
        className="text-amber-500"
      />
      <Layout
        style={{ ...iconStyles, top: "5%", left: "43%" }}
        className="text-amber-500"
      />
      <Workflow
        style={{ ...iconStyles, top: "40%", left: "25%" }}
        className="text-amber-500"
      />
      <Code
        style={{ ...iconStyles, top: "50%", left: "90%" }}
        className="text-amber-500"
      />
      <CircuitBoard
        style={{ ...iconStyles, top: "75%", left: "43%" }}
        className="text-amber-500"
      />
      <Diamond
        style={{ ...iconStyles, top: "26%", left: "75%" }}
        className="text-amber-500"
      />
      <Database
        style={{ ...iconStyles, top: "75%", left: "5%" }}
        className="text-amber-500"
      />
      <PenTool
        style={{ ...iconStyles, top: "75%", left: "74%" }}
        className="text-amber-500"
      />
      <Ruler
        style={{ ...iconStyles, top: "5%", left: "90%" }}
        className="text-amber-500"
      />

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold text-gray-300 sm:text-5xl">
            Documents & diagrams
            <strong className="font-extrabold text-amber-700 sm:block">
              for engineering teams
            </strong>
          </h1>

          <p className="mt-4 text-gray-400 sm:text-xl/relaxed">
            All-in-one markdown editor, collaborative canvas, and
            diagram-as-code builder
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <LoginLink>
              <button
                className="block w-full rounded bg-amber-400 px-12 py-3 text-sm font-medium text-white shadow 
                hover:bg-amber-700 focus:outline-none focus:ring 
                active:bg-amber-500 sm:w-auto animate-bounceTwist"
              >
                Try Crafter.io
              </button>
            </LoginLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
