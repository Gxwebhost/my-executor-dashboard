const fs = require('fs').promises;
const path = require('path');

const executionsFile = path.join(__dirname, '../executions.json');

module.exports = async (req, res) => {
    try {
        // Read current executions
        let data = { count: 0 };
        try {
            const fileContent = await fs.readFile(executionsFile, 'utf-8');
            data = JSON.parse(fileContent);
        } catch (error) {
            // File may not exist yet; initialize it
            await fs.writeFile(executionsFile, JSON.stringify(data));
        }

        if (req.method === 'POST') {
            // Increment count
            data.count += 1;
            await fs.writeFile(executionsFile, JSON.stringify(data));
            res.status(200).json({ status: 'success', count: data.count });
        } else if (req.method === 'GET') {
            // Return current count
            res.status(200).json({ count: data.count });
        } else {
            res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
