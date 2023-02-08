import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const generateId = (array) => {
  return array.length === 0 ? 1 : array[array.length - 1].id + 1;
};

const writeInfo = async (data, path) =>
  await fs.promises.writeFile(path, JSON.stringify(data, null, "\t"));

const readInfo = async (path) => await fs.promises.readFile(path, "utf-8");

export { __dirname, generateId, writeInfo, readInfo };
