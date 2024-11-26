import {Schema,model} from "mongoose";

interface User {
  name: String;
  email: String;
  password: string;
}

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = model("users", userSchema);