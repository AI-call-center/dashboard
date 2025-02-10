import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import {
  XMarkIcon,
  ArrowUpTrayIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

interface UploadCSVModalProps {
  onClose: () => void;
}

const UploadCSVModal = ({ onClose }: UploadCSVModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [preview, setPreview] = useState<string[][]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processCSV = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\\n');
      const data = lines.slice(0, 5).map(line => line.split(','));
      setPreview(data);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type !== 'text/csv') {
      toast.error('Please upload a CSV file');
      return;
    }
    
    setFile(droppedFile);
    processCSV(droppedFile);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    if (selectedFile.type !== 'text/csv') {
      toast.error('Please upload a CSV file');
      return;
    }
    
    setFile(selectedFile);
    processCSV(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploadStatus('uploading');
    
    try {
      // Implement your upload logic here
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated upload
      
      setUploadStatus('success');
      toast.success('CSV file uploaded successfully');
      setTimeout(onClose, 1000);
    } catch (error) {
      setUploadStatus('error');
      toast.error('Failed to upload CSV file');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-100">Upload CSV</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center space-y-4 transition-colors ${
            isDragging
              ? 'border-blue-500 bg-blue-500/5'
              : 'border-gray-700 hover:border-gray-600'
          }`}
        >
          <div className="flex flex-col items-center space-y-4">
            {file ? (
              <>
                <DocumentTextIcon className="w-12 h-12 text-blue-400" />
                <div>
                  <p className="text-lg font-medium text-white">{file.name}</p>
                  <p className="text-sm text-gray-400">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </>
            ) : (
              <>
                <ArrowUpTrayIcon className="w-12 h-12 text-gray-400" />
                <div>
                  <p className="text-lg font-medium text-white">
                    Drag and drop your CSV file here
                  </p>
                  <p className="text-sm text-gray-400">
                    or click to select a file
                  </p>
                </div>
              </>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            accept=".csv"
            onChange={handleFileSelect}
            className="hidden"
          />
          {!file && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <ArrowUpTrayIcon className="w-5 h-5" />
              Select File
            </motion.button>
          )}
        </div>

        {/* Preview */}
        {preview.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-white">Preview</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-300">
                <tbody className="divide-y divide-gray-800">
                  {preview.map((row, i) => (
                    <tr
                      key={i}
                      className={i === 0 ? 'bg-gray-800/50' : 'hover:bg-gray-800/30'}
                    >
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className={`px-4 py-2 ${
                            i === 0 ? 'font-medium text-gray-200' : ''
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center pt-4">
          <div className="flex items-center gap-2 text-sm">
            {uploadStatus === 'uploading' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-blue-400"
              >
                Uploading...
              </motion.div>
            )}
            {uploadStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-green-400 flex items-center gap-1"
              >
                <CheckCircleIcon className="w-5 h-5" />
                Upload complete
              </motion.div>
            )}
            {uploadStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 flex items-center gap-1"
              >
                <ExclamationCircleIcon className="w-5 h-5" />
                Upload failed
              </motion.div>
            )}
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUpload}
              disabled={!file || uploadStatus === 'uploading'}
              className={`px-4 py-2 bg-blue-500 text-white font-medium rounded-lg transition-colors flex items-center gap-2 ${
                !file || uploadStatus === 'uploading'
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-blue-400'
              }`}
            >
              {uploadStatus === 'uploading' ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <ArrowUpTrayIcon className="w-5 h-5" />
              )}
              Upload
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UploadCSVModal;
