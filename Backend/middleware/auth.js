import jwt from 'jsonwebtoken';
import 'dotenv/config'

const verify = jwt.verify;
export const authentication = (header) => {
    try {
        const authHeader = header
        const token = authHeader && authHeader.split(' ')[1]
        verify(token, process.env.TOKEN_SECRET);
        if (!token) {
            console.log("invalid Token")
        }
        let base64Url = token.split('.')[1]; // token you get
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        let decodedData = JSON.parse(Buffer.from(base64, 'base64').toString('binary'));
        return decodedData;
    } catch (error) {
        res.status(400).json({ message: "Invalid/Expired Token" });
    }
}