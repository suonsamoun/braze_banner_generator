import React from 'react';
import '../styles/CodeInput.css';

interface CodeInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const CodeInput: React.FC<CodeInputProps> = ({ value, onChange }) => {
  return (
    <div className="code-input-container">
      <textarea 
        id="input" 
        className="code-input"
        placeholder="Paste your escaped or raw ad code here..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CodeInput;