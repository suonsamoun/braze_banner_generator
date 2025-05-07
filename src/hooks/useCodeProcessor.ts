import { useState } from 'react';


type AdsResponse = {
  price: number;
  widht: number;
  height: number;
  adid: number;
  adm: string;
}

export const useCodeProcessor = () => {
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [htmlTemplate, setHtmlTemplate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchAdData = async (shouldProcess: boolean = false) => {
    setIsLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_AD_REQUEST_URL as string);
      const data: AdsResponse = await response.json();
      const admEncoded = JSON.stringify(data.adm).replace(/^"|"$/g, '');
      setInputCode(admEncoded ?? 'No ad content available');
      if (shouldProcess) {
        handleUnescapeProcessing(admEncoded);
      }
    } catch (error) {
      console.error('Error fetching ad data:', error);
      setInputCode('Error fetching ad data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnescape = async () => {
    if (!inputCode.trim()) {
      await fetchAdData(true); // Pass true to indicate we want to process after fetch
      return;
    }

    handleUnescapeProcessing(inputCode);
  };

  const handleUnescapeAd = () => {
    let result = inputCode;

    // Ad-specific unescaping
    result = result.replace(/\\([<>="\/:;&])/g, '$1');
    result = result.replace(/\\\\/g, '\\');
    result = result.replace(/\\t/g, '\t')
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r');
    result = result.replace(/\\'/g, "'")
      .replace(/\\"/g, '"');

    setOutputCode(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputCode)
      .then(() => {
        alert('Output copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy. Please copy manually.');
      });
  };

  const handleClear = () => {
    setInputCode('');
    setOutputCode('');
    setHtmlTemplate('');
  };

  const handleUnescapeProcessing = (code: string) => {
    let result = code;

    // Replace escape sequences
    result = result.replace(/\\\\/g, "\\");
    result = result.replace(/\\(.)/g, function (_, ch) {
      if (ch === 'n') return "\n";
      if (ch === 'r') return "\r";
      if (ch === 't') return "\t";
      return ch;
    });

    // Replace hex and unicode escape sequences
    result = result.replace(/\\x([0-9A-Fa-f]{2})/g, (_, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    );
    result = result.replace(/\\u([0-9A-Fa-f]{4})/g, (_, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    );

    // Replace HTML entities
    result = result.replace(/\\'/g, "'");
    result = result.replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&");

    // Replace URL encoded characters
    result = result.replace(/%([0-9A-Fa-f]{2})/g, (_, p1) => {
      return decodeURIComponent("%" + p1);
    });

    // Multiple passes to handle nested escapes
    for (let i = 0; i < 3; i++) {
      result = result.replace(/\\(.)/g, '$1');
    }

    setOutputCode(result);
    _handleGenerateHtml();
  };

  const _handleGenerateHtml = () => {
    const template = `<!DOCTYPE html>
      <html lang="en">
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

      <head>
          <title>Ad Display</title>
          <style>
              html,
              body {
                  margin: 0;
                  padding: 0;
                  width: 100%;
                  height: 100%;
              }

              * {
                  box-sizing: border-box;
              }

              body {
                  position: relative;
              }

              #ad-wrapper {
                  position: relative;
                  width: 100dvw;
                  height: 100dvh;
                  background: transparent;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  overflow: hidden;
                  background-color: rgba(0, 0, 0, 0.5);
              }

              #close-btn {
                  position: absolute;
                  top: 5px;
                  right: 5px;
                  background: rgba(244, 67, 54, 0.85);
                  color: white;
                  border: none;
                  border-radius: 50%;
                  width: 24px;
                  height: 24px;
                  font-size: 16px;
                  font-weight: bold;
                  cursor: pointer;
                  line-height: 24px;
                  text-align: center;
                  z-index: 10;
              }

              .add-view {
                  width: 90%;
                  max-width: 320px;
                  height: 80%;
                  max-height: 600px;
                  position: relative;
                  overflow: hidden;
                  border-radius: 8px;
                  background: #fff;
              }

          </style>
      </head>
      <body>
        
        <div id="ad-wrapper">
          <div class="add-view">
            <button id="close-btn" onclick="document.getElementById('ad-wrapper').style.display='none'">×</button>
            ${outputCode}
          </div>
        </div>
      </body>
      </html>`;

    setHtmlTemplate(template);
  };

  return {
    inputCode,
    isLoading,
    outputCode,
    htmlTemplate,
    setInputCode,
    handleUnescape,
    handleUnescapeAd,
    handleCopy,
    handleClear,
  };
};