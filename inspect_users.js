const mongoose = require('mongoose');
const usermodel = require('./src/models/user.model');

async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/spotify');
    const users = await usermodel.find().lean();
    console.log(JSON.stringify(users, null, 2));
    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
