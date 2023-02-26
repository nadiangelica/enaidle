// const mongoose = require('mongoose');
// const { MongoMemoryServer } = require('mongodb-memory-server');

// let mongoServer;

// // For mongodb-memory-server's old version (< 7) use this instead:
// // const mongoServer = new MongoMemoryServer();

// const opts = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// };

// // Provide connection to a new in-memory database server.
// const connect = async () => {
//   // NOTE: before establishing a new connection close previous
//   await mongoose.disconnect();

//   mongoServer = await MongoMemoryServer.create();

//   const mongoUri = await mongoServer.getUri();
//   await mongoose.connect(mongoUri, opts, err => {
//     if (err) {
//       console.error(err);
//     }
//   });
// };

// // Remove and close the database and server.
// const close = async () => {
//   await mongoose.disconnect();
//   await mongoServer.stop();
// };

// Remove all data from collections
// const clear = async () => {
//   const collections = mongoose.connection.collections;

//   for (const key in collections) {
//     await collections[key].deleteMany();
//   }
// };

// module.exports = {
//   connect,
//   close,
//   clear,
// };




const mongoose = require('mongoose');

const connect = async () => {
  if (mongoose.connection.readyState == 1) {
    await mongoose.connection.close()
  }
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  console.log('MongoDB connected');
};

const clear = async () => {
  if (mongoose.connection.readyState !== 1) {
    throw new Error('MongoDB not connected');
  }
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
};

// Remove all data from collections
const close = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany();
  }
 await mongoose.connection.close()
};

module.exports = { connect, clear, close };
