import { useState } from "react";
import axios from "axios";
import CodeMirror from "@uiw/react-codemirror";

export default function Home() {
  const [code, setCode] = useState(`#include <graphics.h>\nvoid main() {\n  int gd = DETECT, gm;\n  initgraph(&gd, &gm, "C:\\\\TURBOC3\\\\BGI");\n  circle(200, 200, 50);\n  getch();\n  closegraph();\n}`);
  const [output, setOutput] = useState("");

  const handleCompile = async () => {
    try {
      const res = await axios.post("http://localhost:8000/compile", { code });
      setOutput("Compilation successful!");
    } catch (error) {
      setOutput("Error: " + error.response.data.detail);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-xl font-bold mb-4">Online C Compiler (Graphics.h)</h1>
      <CodeMirror value={code} height="300px" onChange={(value) => setCode(value)} />
      <button onClick={handleCompile} className="mt-4 p-2 bg-blue-500 text-white rounded">Compile</button>
      <pre className="mt-4 p-2 border">{output}</pre>
    </div>
  );
}
