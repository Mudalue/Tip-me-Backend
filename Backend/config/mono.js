import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const API = axios.create({ baseURL: "https://api.withmono.com/issuing/v1/" });

API.interceptors.request.use(
  (config) => {
    config.headers["mono-sec-key"] = `${process.env.MONO_SECRET_KEY}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const mono = () => {
  const createAccount = async ({ first_name, last_name, email, phone, bvn }, callback) => {
    try {
      const response = await API.post("/accountholders", {
        entity: "INDIVIDUAL",
        first_name,
        last_name,
        email,
        bvn,
        phone
      });

      return callback(response);
    } catch (error) {
      console.log(error);
    }
  };
  return { createAccount };
};

export default mono
