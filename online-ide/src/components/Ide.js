import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { java } from "@codemirror/lang-java";
import axios from "axios";
import FetchHistory from "./FetchHistory";
import "./Stylesheets/Ide.css";
import Logout from "./Logout";
import logo from "./JAVAZ Logo.png";


function Ide() {
  const [code, setCode] = useState(`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
  }`);
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRun = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setOutput("Authentication Error: Please log in to execute code.");
        console.error("No token found");
        setIsLoading(false);
        return;
      }

      const codeToExecute = { code };

      const response = await axios.post(
        "http://localhost:8080/api/auth/execute",
        codeToExecute,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOutput(response.data);
      console.log("Execution Result:", response.data);
    } catch (err) {
      setOutput(
        `Error Executing Code: ${
          err.response ? err.response.data.message : err.message
        }`
      );
      console.error("Execution Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="navbar">
        <div className="img">
          <img src={logo} alt="JavaZ" />
        </div>

        {!isLoading && (
          <button onClick={handleRun} className="button" disabled={isLoading}>
            Run Code 
          </button>
        )}
        {isLoading && <div className="spinner"></div>}

        <Logout />
      </div>

      <div className="ide">
        <div className="code-mirror">
          <CodeMirror
            value={code}
            height="90vh"
            width="100vh"
            theme="dark"
            extensions={[java()]}
            basicSetup={{
              lineNumbers: true,
              highlightActiveLine: true,
            }}
            onChange={(newValue) => setCode(newValue)}
            cursorBlinkRate={530}
            autoFocus={true}
            className="code"
          />
        </div>

        <pre className="terminal">
          {output || "Click 'Run Code' to see the output here..."}
        </pre>
      </div>
      <FetchHistory />
    </div>
  );
}

export default Ide;
