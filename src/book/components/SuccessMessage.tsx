import React from 'react';

interface SuccessMessageProps {
  file: File;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ file }) => (
  <div style={{ marginLeft: '10px' }}>
    <strong>File:</strong> {file.name}<br />
    <strong>Size:</strong> {(file.size / 1024 / 1024).toFixed(2)} MB<br />
    <strong>Type:</strong> {file.type}
  </div>
);

export default SuccessMessage; 