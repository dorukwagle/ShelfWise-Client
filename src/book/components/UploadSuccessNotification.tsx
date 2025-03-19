import React from 'react';
import SuccessMessage from './SuccessMessage';

interface UploadSuccessNotificationProps {
  file: File;
}

const UploadSuccessNotification: React.FC<UploadSuccessNotificationProps> = ({ file }) => {
  return <SuccessMessage file={file} />;
};

export default UploadSuccessNotification; 