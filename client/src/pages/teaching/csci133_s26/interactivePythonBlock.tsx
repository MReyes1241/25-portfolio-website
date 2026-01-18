import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Copy, Check, Loader2 } from 'lucide-react';
import styles from './interactiveUnitTemplate.module.css';

// Pyodide type declarations
declare global {
  interface Window {
    loadPyodide: (config?: { indexURL?: string }) => Promise<PyodideInterface>;
  }
}

interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>;
  setStdout: (options: { batched: (text: string) => void }) => void;
  setStderr: (options: { batched: (text: string) => void }) => void;
}

interface InteractivePythonBlockProps {
  initialCode: string;
  title?: string;
  readOnly?: boolean;
}

// Singleton pattern for Pyodide - load once, share across all blocks
let pyodideInstance: PyodideInterface | null = null;
let pyodideLoadingPromise: Promise<PyodideInterface> | null = null;

const loadPyodideInstance = async (): Promise<PyodideInterface> => {
  if (pyodideInstance) return pyodideInstance;
  
  if (pyodideLoadingPromise) return pyodideLoadingPromise;
  
  pyodideLoadingPromise = (async () => {
    // Load Pyodide script if not already loaded
    if (!window.loadPyodide) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Pyodide'));
        document.head.appendChild(script);
      });
    }
    
    pyodideInstance = await window.loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
    });
    
    return pyodideInstance;
  })();
  
  return pyodideLoadingPromise;
};

const InteractivePythonBlock: React.FC<InteractivePythonBlockProps> = ({
  initialCode,
  title,
  readOnly = false
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [pyodide, setPyodide] = useState<PyodideInterface | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load Pyodide on mount
  useEffect(() => {
    let mounted = true;
    
    loadPyodideInstance()
      .then((instance) => {
        if (mounted) {
          setPyodide(instance);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(`Failed to load Python runtime: ${err.message}`);
          setIsLoading(false);
        }
      });
    
    return () => { mounted = false; };
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [code]);

  const runCode = async () => {
    if (!pyodide || isRunning) return;
    
    setIsRunning(true);
    setOutput('');
    setError(null);
    
    let outputBuffer = '';
    
    // Capture stdout and stderr
    pyodide.setStdout({
      batched: (text: string) => {
        outputBuffer += text + '\n';
      }
    });
    
    pyodide.setStderr({
      batched: (text: string) => {
        outputBuffer += `[Error] ${text}\n`;
      }
    });
    
    try {
      const result = await pyodide.runPythonAsync(code);
      
      // If there's a return value and no print output, show the return value
      if (result !== undefined && result !== null && !outputBuffer.trim()) {
        outputBuffer = String(result);
      }
      
      setOutput(outputBuffer.trim() || 'Code executed successfully (no output)');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
    } finally {
      setIsRunning(false);
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput('');
    setError(null);
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Run code with Ctrl/Cmd + Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runCode();
      return;
    }
    
    // Handle Tab for indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);
      
      // Move cursor after the inserted spaces
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  return (
    <div className={styles.interactiveCodeBlock}>
      {title && <h4 className={styles.codeTitle}>{title}</h4>}
      
      <div className={styles.codeEditorContainer}>
        <div className={styles.codeToolbar}>
          <div className={styles.toolbarLeft}>
            <span className={styles.languageTag}>Python</span>
            {isLoading && (
              <span className={styles.loadingIndicator}>
                <Loader2 className={styles.spinIcon} size={14} />
                Loading Python...
              </span>
            )}
          </div>
          <div className={styles.toolbarRight}>
            <button
              className={styles.toolbarButton}
              onClick={copyCode}
              title="Copy code"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
            <button
              className={styles.toolbarButton}
              onClick={resetCode}
              title="Reset code"
              disabled={code === initialCode}
            >
              <RotateCcw size={16} />
            </button>
            <button
              className={`${styles.runButton} ${isRunning ? styles.running : ''}`}
              onClick={runCode}
              disabled={isLoading || isRunning}
              title="Run code (Ctrl+Enter)"
            >
              {isRunning ? (
                <>
                  <Loader2 className={styles.spinIcon} size={16} />
                  Running...
                </>
              ) : (
                <>
                  <Play size={16} />
                  Run
                </>
              )}
            </button>
          </div>
        </div>
        
        <div className={styles.codeInputWrapper}>
          <div className={styles.lineNumbers}>
            {code.split('\n').map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>
          <textarea
            ref={textareaRef}
            className={styles.codeInput}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            readOnly={readOnly}
            spellCheck={false}
            placeholder="Write your Python code here..."
          />
        </div>
      </div>
      
      {(output || error) && (
        <div className={`${styles.outputContainer} ${error ? styles.outputError : ''}`}>
          <div className={styles.outputHeader}>
            <span>Output</span>
          </div>
          <pre className={styles.outputContent}>
            {error || output}
          </pre>
        </div>
      )}
    </div>
  );
};

export default InteractivePythonBlock;