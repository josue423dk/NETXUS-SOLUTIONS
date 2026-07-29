import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"
import { beforeAll, afterAll } from "vitest"

process.env.ADMIN_API_KEY = "test-api-key"

let mongod

beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  const uri = mongod.getUri()
  process.env.MONGODB_URI = uri
  await mongoose.connect(uri)
})

afterAll(async () => {
  await mongoose.disconnect()
  if (mongod) await mongod.stop()
})
