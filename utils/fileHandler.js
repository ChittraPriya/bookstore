import { promises as fs } from 'fs';

export const readFile = async (path) => {
  const data = await fs.readFile(path, 'utf-8');
  return JSON.parse(data);
};

export const writeFile = async (path, data) => {
  await fs.writeFile(path, JSON.stringify(data, null, 2));
};
