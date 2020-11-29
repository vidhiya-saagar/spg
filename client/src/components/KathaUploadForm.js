import React from 'react';
import Grid from './Grid';

const KathaUploadForm = () => {
  return (
    <>
      {/* <Grid alignItems='center' justify='center'> */}
      {/* <Grid column={true} sm={4} md={} lg={8}> */}
      <div className='form-element'></div>
      <p>KathaUploadForm</p>
      {/* </Grid> */}
      {/* </Grid> */}
    </>
  );
};

export default KathaUploadForm;

const x = {
  file: {
    preview: 'blob:http://localhost:3000/b7e59b4a-e2ff-1943-b86b-597e536b0594',
  },
  fileUrl:
    'https://s3.console.aws.amazon.com/s3/buckets/shaheedi-spg/d1bacb37-4d99-4aef-aa7a-eccf8d7b97ff_01MaajhM5ChaupdeGhar1to.m4a',
  signedUrl:
    'https://s3.amazonaws.com/shaheedi-spg/d1bacb37-4d99-4aef-aa7a-eccf8d7b97ff_01MaajhM5ChaupdeGhar1to.m4a?AWSAccessKeyId=AKIAIEOOEMVPUCLOHVYQ&Content-Type=audio%2Fx-m4a&Expires=1606667328&Signature=sih724RKHZWcvDEnmFuG7QR6ukw%3D&x-amz-acl=public-read',
  publicUrl:
    '/s3/uploads/d1bacb37-4d99-4aef-aa7a-eccf8d7b97ff_01MaajhM5ChaupdeGhar1to.m4a',
  filename: 'd1bacb37-4d99-4aef-aa7a-eccf8d7b97ff_01MaajhM5ChaupdeGhar1to.m4a',
  fileKey: 'd1bacb37-4d99-4aef-aa7a-eccf8d7b97ff_01MaajhM5ChaupdeGhar1to.m4a',
};
