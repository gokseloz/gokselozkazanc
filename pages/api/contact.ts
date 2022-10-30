import type { NextApiRequest, NextApiResponse } from "next";
import { TContactForm } from "../../types/contactForm";
import { MongoClient } from "mongodb";

type InvalidData = {
  message: string;
};

type ValidData = {
  message: string;
  newMessage: TContactForm;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<InvalidData | ValidData>
) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    if (
      !name ||
      name.trim() === "" ||
      !email ||
      !email.includes("@") ||
      email.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input" });
      return;
    }

    const newMessage: TContactForm = {
      id: "",
      email,
      name,
      message,
    };

    let client;

    const connectionString = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTERNAME}.pd8uoye.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`;

    try {
      client = await MongoClient.connect(connectionString);
    } catch (err) {
      res.status(500).json({ message: "Could not connect to database!" });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId.toString();
    } catch (err) {
      client.close();
      res.status(500).json({ message: "Storung message failed!" });
    }

    res.status(201).json({ message: "success", newMessage: newMessage });
    client.close();
  }
}
