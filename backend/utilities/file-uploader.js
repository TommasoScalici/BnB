const {s3, s3bucket} = require('../config/aws.config.js');

module.exports = function(file, filePath, result) {

    // Se siamo sul web host carico su AWS S3 cloud
    if(process.env.CLOUDCUBE_PUBLIC_URL) {
        let params = {
            ACL: "public-read",
            Body: Buffer.from(file.data),
            Bucket: s3bucket,
            Key: `${process.env.CLOUDCUBE_PUBLIC_URL}${filePath}`
        }

        s3.upload(params, function (err, data) {
            if (err) {
                console.log(`Error while trying to upload file ${file.name} to AWS S3. Error: ${err}`);
                result("");
            }
            else {
                console.log(`File ${file.name} uploaded to AWS S3 at path: ${data.Location}`);
                result(data.Location);
            }
        });
    }
    else { // Altrimenti carico in localhost
        file.mv(`./public${filePath}`);
        result(filePath);
    }
}