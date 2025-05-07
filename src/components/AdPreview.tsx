import React, { useEffect, useRef } from 'react';
import '../styles/AdPreview.css';

interface AdPreviewProps {
  code: string;
}

const AdPreview: React.FC<AdPreviewProps> = ({ code }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!code || !containerRef.current) return;
    
    // Clear the container
    containerRef.current.innerHTML = '';
    
    // Create the iframe
    const iframe = document.createElement('iframe');
    iframe.width = "320";
    iframe.height = "600";
    iframe.style.border = "none";
    iframe.style.overflow = "hidden";
    iframe.style.display = "block";
    iframe.setAttribute("allow", "fullscreen");
    iframe.setAttribute("frameBorder", "0");
    iframe.setAttribute("scrolling", "no");
    
    // Create HTML content for the iframe
    const html = `
      <!DOCTYPE html>
      <html><head><base target="_top"></head>
      <body style="margin:0;padding:0;overflow:hidden;width:320px;height:600px;">
        ${code}
      </body></html>
    `;
    
    // Set iframe source from blob
    const blob = new Blob([html], { type: 'text/html' });
    iframe.src = URL.createObjectURL(blob);
    
    // Append iframe to container
    if (containerRef.current) {
      containerRef.current.appendChild(iframe);
    }
  }, [code]);
  
  return (
    <div className="ad-preview-section">
      <h3 className="preview-title">Ad Preview:</h3>
      <div id="ad-container" ref={containerRef} className="ad-container"></div>
    </div>
  );
};

export default AdPreview;