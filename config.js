import { config } from "dotenv";

config();

export  const AWS_BUKECT_NAME = process.env.AWS_BUKECT_NAME;
export const AWS_BUKECT_REGION  = process.env.AWS_BUKECT_REGION ;
export const AWS_KEY_PUBLIC = process.env.AWS_KEY_PUBLIC;
export const AWS_KEY_SECRET = process.env.AWS_KEY_SECRET;


