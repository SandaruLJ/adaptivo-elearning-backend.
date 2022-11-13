import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
// if (envFound.error) {
//     // This error should crash whole process
//     throw new Error("Couldn't find .env file");
// }

export default {
  port: parseInt(process.env.PORT || "3005", 10),
  dbURL: process.env.MONGODB_URI,
  secret: process.env.SECRET,
  version: process.env.BE_VERSION,
  awsRegion: process.env.AWS_DEFAULT_REGION,
  userPoolId: process.env.USER_POOL_ID,
  adminPoolId: process.env.ADMIN_POOL_ID,
  awsCredentialsName: "AKIAWLEVMKZ5MLZKE23K",
  awsCredentialsSecret:
    "Ma+tqKSFfsqE4rgEKW0Ai1V12FfwB/iiL5F5GIvbzZpacRNtS0vt3GBvXyU0fOw4pBSwkHNDhY+ck68ShzfG9z+xAaFmDOd5qyXTDkbyrvCoz2h9ns3dp5USTHSakdhZUy4Rj0yFQ5gAhV/4QeL3EkAFGk6Wq7q1SYJnbQDWCa2QKvkth8BGEtc5svfahbbQBYJ8nsqUJvb4LYv9elCQWdrsrBywrzZrjfp5tFUd1PUcPA77GfHeTkZjNIicLxNpkLhhFA5O8hurNJI796EfnBEI9x2+XYHM/Z1+UTthslevUDghPOUUo48Ecvsg5r4ar/6jZjtMJgjFbd1/JFnSchECZI3q3CbP1U3acQ3wdlqV1TIjlZz8fFJR5miSNXQ0Ck79IOOFobcgXhcHzdzRwJlJi5gmAwE79ZkxYQld+06+jNc4oUgCrzi59ZCbFK/bWTlroCjyHLUzc9FKIMZzLON+Gp7L85o2r1HMzcmYNtiuOilOnQ+Gy6QEIu7o+SNY",
  tenantId: "aeffe382-c139-4319-8056-acc511f9d369",
  managementKey: "6dd5dd1f-8e80-40eb-9765-0c4b0c18494f",
  keySeed: "aba478f5-61d3-4695-b86c-ae7f00be2b91",
  tenantAuthorization: "Tenant-Auth b29d28bd-bc37-4270-b5e5-219949772e1f",
  communicationKey: "vUv1fYKVeX7Ek6d8gx1hN/tzPeUhwrUH2hFPgaxLL6Q=",
  communicationKeyId: "e8313580-8791-4f73-9b4f-ae7f00be2b91",
};
