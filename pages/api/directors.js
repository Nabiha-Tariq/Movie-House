import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const fileData = fs.readFileSync(filePath, 'utf8');
  const {directors } = JSON.parse(fileData);

  res.status(200).json(directors);
}
