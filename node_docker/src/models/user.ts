import {Schema,model} from "mongoose";

interface User {
  name: String;
  age: String;
  gender: String;
  address: String;
}

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

export const User = model("users", userSchema);