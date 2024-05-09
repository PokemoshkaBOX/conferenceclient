import React from 'react';
import { FaFilePdf, FaFileWord } from 'react-icons/fa';
import { MdInsertDriveFile } from 'react-icons/md';
import { DocViewer } from 'react-doc-viewer';
const DocumentViewer = ({ filePath }) => {
  // Определение типа файла по расширению
  const getFileType = (filePath) => {
    const extension = filePath.split('.').pop().toLowerCase();
    if (extension === 'pdf') {
      return 'pdf';
    } else if (['doc', 'docx'].includes(extension)) {
      return 'word';
    } else {
      return 'unknown';
    }
  };

  const fileType = getFileType(filePath);
  const fileName = filePath.split('\\').pop();


  return (
    <div>
      <a href={`http://localhost:5000/${fileName}`} target="_blank" download={fileName} style={{ cursor: 'pointer' }}>
        {fileType === 'pdf' && <FaFilePdf size={24} />}
        {fileType === 'word' && <FaFileWord size={24} />}
        {fileType === 'unknown' && <MdInsertDriveFile size={24} />}
        {fileName}
      </a>
    </div>
  );
};

export default DocumentViewer;
