// api/executions.js

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.resolve('./executions.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  if (req.method === 'GET') {
    res.status(200).json({ executions: data.count });
  } else if (req.method === 'POST') {
    data.count += 1;
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(200).json({ success: true, executions: data.count });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
