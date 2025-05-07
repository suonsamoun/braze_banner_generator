import React from 'react';
import '../styles/HtmlTemplate.css';

interface HtmlTemplateProps {
  htmlTemplate: string;
}

const HtmlTemplate: React.FC<HtmlTemplateProps> = ({ htmlTemplate }) => {
  return (
    <div className="html-template-container">
      <h3 className="template-title">Generated index.html Template:</h3>
      <textarea 
        id="htmlTemplate" 
        className="html-template-output"
        readOnly 
        placeholder="Generated standalone HTML will appear here..."
        value={htmlTemplate}
      />
    </div>
  );
};

export default HtmlTemplate;