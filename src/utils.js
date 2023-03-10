import { fileURLToPath } from "url";
import path, { dirname } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const generateId = (array) => {
  return array.length === 0 ? 1 : array[array.length - 1]._id + 1;
};

const validateId = (id, array) => {
  return array.some((p) => p._id === Number(id));
};

const getAbsolutePath = async (relativePath) => {
  try {
    const absolutePath = path.join(__dirname, relativePath);
    if (!fs.existsSync(absolutePath))
      await fs.promises.writeFile(absolutePath, JSON.stringify([]));
    return absolutePath;
  } catch (error) {
    console.log(error);
  }
};

const writeInfo = async (data, path) => {
  try {
    return await fs.promises.writeFile(path, JSON.stringify(data, null, "\t"));
  } catch (error) {
    console.log(error);
  }
};

const readInfo = async (path) => {
  try {
    return await fs.promises.readFile(path, "utf-8");
  } catch (error) {
    console.log(error);
  }
};

export {
  __dirname,
  generateId,
  validateId,
  writeInfo,
  readInfo,
  getAbsolutePath,
};
