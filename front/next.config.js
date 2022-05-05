/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // env 추가
  env: {
    S3_REGION: process.env.S3_REGION,
    S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
    S3_BUCKET: process.env.S3_BUCKET,
  },
};

module.exports = nextConfig;
