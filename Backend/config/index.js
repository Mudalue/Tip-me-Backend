import 'dotenv/config'
const db_url = process.env.MONGO_URI;
export const db = db_url;