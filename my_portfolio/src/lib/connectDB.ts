import mongoose from "mongoose"

const dbStore={
  connected:false
}

export default async function connectDB(){
  try {
    if(dbStore.connected){
      console.log('DB already connected');
      return true;
    }    
    await mongoose.connect(process.env.MONGODB_URI!)
    dbStore.connected=true;
    console.log('DB connected successfully');
    return true;
  } catch (error) {
    console.log('DB connection failed :: Error : ',error);
    throw error;
  }
}