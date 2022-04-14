// Import the required AWS SDK clients and commands for Node.js
const { CreateBucketCommand, DeleteObjectCommand, PutObjectCommand, DeleteBucketCommand } = require("@aws-sdk/client-s3");
import { s3Client } from "./s3Client";
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

// Set parameters
// Create a random name for the Amazon Simple Storage Service (Amazon S3) bucket and key
export const bucketParams = {
  Bucket: `rishard-concepts`,
  Key: `concept-${Math.ceil(Math.random() * 10 ** 10)}`,
  Body: "BODY",
};
export const getPreSignedUrl = async () => {
  try {
    // Create an S3 bucket.
    console.log(`Creating bucket ${bucketParams.Bucket}`);
    await s3Client.send(new CreateBucketCommand({ Bucket: bucketParams.Bucket }));
    console.log(`Waiting for "${bucketParams.Bucket}" bucket creation...`);
  } catch (err) {
    console.log("Error creating bucket", err);
  }
  try {
    // Create a command to put the object in the S3 bucket.
    const command = new PutObjectCommand(bucketParams);
    // Create the presigned URL.
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });
    console.log(`\nPutting "${bucketParams.Key}" using signedUrl with body "${bucketParams.Body}" in v3`);
    console.log(signedUrl);
    // const response = await fetch(signedUrl, { method: "PUT", body: bucketParams.Body });
    // console.log(`\nResponse returned by signed URL: ${await response.text()}\n`);
    return signedUrl;
  } catch (err) {
    console.log("Error creating presigned URL", err);
    return err;
  }
  //   try {
  //     // Delete the object.
  //     console.log(`\nDeleting object "${bucketParams.Key}"} from bucket`);
  //     await s3Client.send(new DeleteObjectCommand({ Bucket: bucketParams.Bucket, Key: bucketParams.Key }));
  //   } catch (err) {
  //     console.log("Error deleting object", err);
  //   }
  //   try {
  //     // Delete the S3 bucket.
  //     console.log(`\nDeleting bucket ${bucketParams.Bucket}`);
  //     await s3Client.send(new DeleteBucketCommand({ Bucket: bucketParams.Bucket }));
  //   } catch (err) {
  //     console.log("Error deleting bucket", err);
  //   }
};
