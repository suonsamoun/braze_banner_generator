import { Copy, Trash2, FileCode, RefreshCw } from 'lucide-react';
import CodeInput from './components/CodeInput';
import CodeOutput from './components/CodeOutput';
import ActionButtons from './components/ActionButtons';
import AdPreview from './components/AdPreview';
import HtmlTemplate from './components/HtmlTemplate';
import { useCodeProcessor } from './hooks/useCodeProcessor';
import './styles/App.css';

function App() {
  const {
    inputCode,
    outputCode,
    htmlTemplate,
    setInputCode,
    handleUnescape,
    handleUnescapeAd,
    handleCopy,
    handleClear,
    isLoading,
  } = useCodeProcessor();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4">
      <div className="container">
        <header className="app-header">
          <h1 className="title">Ad Code Unescaper & Preview Tool</h1>
          <p className="subtitle">Paste your escaped or raw HTML/JavaScript ad code below and choose an action</p>
        </header>

        <CodeInput 
          value={inputCode} 
          onChange={(e) => setInputCode(e.target.value)} 
        />

        <ActionButtons 
          actions={[
            { 
              label: 'Preview', 
              icon: <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />,
              onClick: handleUnescape, 
              className: 'btn-primary',
              disabled: isLoading
            },
            { 
              label: 'Preview & Publish to Braze', 
              icon: <FileCode size={18} />, 
              onClick: handleUnescapeAd, 
              className: 'btn-warning',
              disabled: isLoading
            },
            { 
              label: 'Copy Output', 
              icon: <Copy size={18} />, 
              onClick: handleCopy, 
              className: 'btn-info' 
            },
            { 
              label: 'Clear All', 
              icon: <Trash2 size={18} />, 
              onClick: handleClear, 
              className: 'btn-danger' 
            },
          ]}
        />

        <div className="main-content">
          <div className="output-section">
            <CodeOutput 
              title="Unescaped Code:" 
              code={outputCode} 
            />
          </div>
          
          <div className="preview-section">
            <AdPreview code={outputCode} />
          </div>
        </div>

        <HtmlTemplate htmlTemplate={htmlTemplate} />

        <footer className="app-footer">
          <p>This comprehensive tool handles escape sequences and live preview for ad code rendering.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;