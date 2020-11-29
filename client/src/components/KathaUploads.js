import React from 'react';
import { Circle } from 'rc-progress';

const KathaForm = (props) => {
  {
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'props', props);
  }

  return (
    <>
      <p>Hii</p>
    </>
  );
};

const KathaUploads = (props) => {
  const uploadedFiles = props.uploadedFiles;
  // const {
  //   filename, // S3 File Name
  //   fileUrl, // Fill S3 URL
  //   file, // File Object
  // } = uploadedFile;

  return (
    <>
      <Circle percent={props.progress} strokeWidth='4' strokeColor='#D3D3D3' />
      {uploadedFiles.map((uploadedFile) => (
        <KathaForm {...uploadedFile} />
      ))}
      {/* 
      <div key={index}>
        <img src={fileUrl} />
        <p>{file.name}</p>
      </div>
     */}
    </>
  );
};

export default KathaUploads;
