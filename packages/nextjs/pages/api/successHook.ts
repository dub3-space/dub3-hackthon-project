// pages/api/hello.ts
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse): void {
  if (req.method === "POST") {
    // Parse the incoming JSON payload
    const { cid } = req.body;

    // Do something with the data
    const responseMessage = `Received a request with cid: ${cid}`;

    // Send a JSON response

    res.status(200).json({ message: responseMessage });
    res.redirect(302, `/mint-speech?cid=${cid}`);
  } else {
    // Handle other HTTP methods
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
