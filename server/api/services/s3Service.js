const AWS = require('aws-sdk');
const S3Router = require('react-s3-uploader/s3router');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
  s3ForcePathStyle: true,
  signatureVersion: 'v4',
  headers: { 'Access-Control-Allow-Origin': '*' },
});

const getS3 = () => s3;

const s3Service = new S3Router({
  bucket: process.env.BUCKET_MP3,
  ACL: 'public-read',
  getS3,
});

(async () => {
  const log = await s3.listBuckets().promise();
  console.log(log);
})();

module.exports = s3Service;
