import mongoose from 'mongoose';


async function initDB() {
    try {
      
      await mongoose.connect(process.env.MONGODB_URL, { dbName:"Shopaholic" })
      console.log("Connected to DB Successfully")
    } catch (err) {
      console.log("Error connecting to DB")
    }
  }

  export default initDB