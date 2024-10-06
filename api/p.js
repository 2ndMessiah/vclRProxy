const http = require('http');
const https = require('https');
const fs = require('fs').promises;
const path = require('path');

module.exports = async (req, res) => {
  const { link } = req.query;
  
  if (!link) {
    return sendIndexHtml(res);
  }

  const url = `https://${link}`;
  const protocolModule = url.startsWith('https') ? https : http;

  protocolModule.get(url, (response) => {
    if (response.statusCode >= 400) {
      return sendIndexHtml(res);
    }
    
    const contentType = response.headers['content-type'];
    res.setHeader('Content-Type', contentType);
    response.pipe(res);
  }).on('error', (error) => {
    console.error('Error:', error);
    sendIndexHtml(res);
  });
};

async function sendIndexHtml(res) {
  try {
    const indexPath = path.join(__dirname, '..', 'public', 'index.html');
    const content = await fs.readFile(indexPath, 'utf-8');
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(content);
  } catch (error) {
    console.error('Error reading index.html:', error);
    res.status(500).send('Internal Server Error');
  }
}