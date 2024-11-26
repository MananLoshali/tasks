"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config({ path: ".env" });
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mydb';
const connectToDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(MONGODB_URI, {
            dbName: process.env.DB_NAME
        });
        console.log("Database connected successfully");
    }
    catch (error) {
        console.log(`Error connecting db`, error.message);
    }
});
connectToDb();
// app.get("/", (req: Request, res: Response) => {
//   res.json({
//     msg: "Welcome to node typescript application on docker",
//     success: true,
//   });
// });
app.use("/api/user/", userRoute_1.default);
app.listen(PORT, () => {
    console.log(`Server listening at the port ${PORT}`);
});
//# sourceMappingURL=app.js.map