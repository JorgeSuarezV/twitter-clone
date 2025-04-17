import { S3Client, GetObjectCommand, S3ClientConfig, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import * as process from "process";


if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) throw new Error("AWS credentials not found");
const s3Configuration: S3ClientConfig = {
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.S3_BUCKET_REGION,
};
const s3 = new S3Client(s3Configuration);
export const putObjectUrl = async (key: string) => {
  const command = new PutObjectCommand({ Bucket: process.env.S3_BUCKET_NAME, Key: key });
  return await getSignedUrl(s3, command, { expiresIn: 15 * 60 }); // expires in seconds
}
export const getObjectUrl = async (key: string) => {
  const command = new GetObjectCommand({Bucket: process.env.S3_BUCKET_NAME, Key: key});
  return await getSignedUrl(s3, command, {expiresIn: 7 * 24 * 60* 60}); // expires in seconds
}