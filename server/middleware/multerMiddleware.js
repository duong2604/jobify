import multer, { memoryStorage } from "multer";
import path from "path";
import DataParser from "datauri/parser.js";

const storage = memoryStorage();
const upload = multer({ storage });

const parser = new DataParser();

export const formatImage = (file) => {
  const fileExtension = path.extname(file.originalname).toString();
  return parser.format(fileExtension, file.buffer).content;
};

export default upload;
