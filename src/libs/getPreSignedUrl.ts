// Import the required AWS SDK clients and commands for Node.js
import { CreateBucketCommand, DeleteObjectCommand, PutObjectCommand, DeleteBucketCommand, PutBucketCorsCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "./s3Client.js";
import AWS from "aws-sdk";
var s3 = new AWS.S3();

export const getPreSignedUrl = async (bucketName: string, key: string) => {
  const bucketParams = {
    Bucket: bucketName,
    Key: key,
    ContentType: "multipart/form-data",
    ACL: "public-read",
  };
  // try {
  //   // Create an S3 bucket.
  //   console.log(`Creating bucket ${bucketParams.Bucket}`);
  //   await s3Client.send(new CreateBucketCommand({ Bucket: bucketParams.Bucket }));
  //   console.log(`Waiting for "${bucketParams.Bucket}" bucket creation...`);
  //   editBucketCORS(bucketName);
  // } catch (err) {
  //   console.log("Error creating bucket", err);
  // }
  try {
    // Create a command to put the object in the S3 bucket.
    const command = new PutObjectCommand(bucketParams);
    // Create the presigned URL.
    const signedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    });
    // console.log(`\nPutting "${bucketParams.Key}" using signedUrl with body "${bucketParams.Body}" in v3`);
    console.log(signedUrl);
    // const response = await fetch(signedUrl, { method: "PUT", body: bucketParams.Body });
    // console.log(`\nResponse returned by signed URL: ${await response.text()}\n`);
    return { url: signedUrl };
  } catch (err) {
    console.log("Error creating presigned URL", err);
    return err;
  }
};

// const editBucketCORS = (bucketName) =>
//   s3.putBucketCors(
//     {
//       Bucket: bucketName,
//       CORSConfiguration: {
//         CORSRules: [
//           {
//             AllowedHeaders: ["*"],
//             AllowedMethods: ["PUT", "POST", "DELETE"],
//             AllowedOrigins: ["*"],
//             ExposeHeaders: [],
//           },
//           {
//             AllowedMethods: ["GET"],
//             AllowedOrigins: ["*"],
//           },
//         ],
//       },
//     },
//     (err) => {
//       if (err) console.log(err, err.stack);
//       else console.log(`Edit Bucket CORS succeed!`);
//     }
//   );
