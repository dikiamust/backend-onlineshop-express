import mongoose from "mongoose";
import dotenv from "dotenv";

class MongoDB {
  constructor() {
    dotenv.config();
  }

  public connect(): void {
    const db = mongoose.connection;
    const pathURI = process.env.DB_HOST;

    const connectOption = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    };
    
    mongoose.set("runValidators", true);
    mongoose.connect(pathURI, connectOption);

    db.on("error", console.error.bind(console, "Database connection error: "));
    db.once("open", () => {
      console.log("Database connected !");
    });
  }
}

export default new MongoDB().connect;
