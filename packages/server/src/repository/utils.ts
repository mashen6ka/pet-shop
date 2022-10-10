import { MongoClient } from "mongodb";

export async function getNextSequence(conn: MongoClient, name: string) {
  const db = conn.db("main");
  const collection = db.collection("counters");
  const res = await collection.findOneAndUpdate(
    { _id: name },
    { $inc: { seq: 1 } },
    { upsert: true, returnDocument: "after" }
  );
  return res.value.seq;
}
