import express from "express";
import "dotenv/config";
const router = express.Router();

router.post("/webhook", async (req, res ) => {
    let id = req.body;
    console.log(req.body)
  if (id === null) {
    console.log("it is not here");
  } else {
    return res.json({
        message: 'message recieved',
        isSuccess: true,
        id
      });
  }
});
export default router;
