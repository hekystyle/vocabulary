import { MongoMemoryServer } from 'mongodb-memory-server';

export default async () => {
  // This will create an new instance of "MongoMemoryServer" and automatically start it
  const mongod = await MongoMemoryServer.create();

  process.env['MEMORY_MONGO_URI'] = mongod.getUri();

  // The Server can be stopped again with
  return async () => await mongod.stop();
};
