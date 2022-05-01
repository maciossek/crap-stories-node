import AWS from "aws-sdk";
import env from "./env";

AWS.config = new AWS.Config({
  accessKeyId: env.awsAccessKeyId,
  secretAccessKey: env.awsSecretAccessKey,
  region: "eu-central-1",
  signatureVersion: "v4",
});

export const s3 = new AWS.S3();
