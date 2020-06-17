const aws = require('aws-sdk');

aws.config.update({
    accessKeyId: process.env.CLOUDCUBE_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDCUBE_SECRET_ACCESS_KEY,
});

const bucket = process.env.CLOUDCUBE_URL;
const s3 = new aws.S3();

module.exports = {
    aws,
    s3,
    s3bucket: bucket
};