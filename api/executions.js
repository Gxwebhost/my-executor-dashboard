// api/executions.js
let executionCount = 0; // In-memory counter

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json({ executions: executionCount });
  } 
  
  if (req.method === 'POST') {
    executionCount += 1;
    return res.status(200).json({ success: true, executions: executionCount });
  }

  res.status(405).end(); // Method Not Allowed
}
