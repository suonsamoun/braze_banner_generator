import React from 'react';
import '../styles/CodeOutput.css';

interface CodeOutputProps {
  title: string;
  code: string;
}

const CodeOutput: React.FC<CodeOutputProps> = ({ title, code }) => {
  return (
    <div className="code-output-container">
      <h3 className="output-title">{title}</h3>
      <pre id="output" className="code-output">
        {code || "Your unescaped code will appear here..."}
      </pre>
    </div>
  );
};

export default CodeOutput;