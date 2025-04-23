import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Set the headers
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600');

  // Get the XML content
  const filePath = path.join(process.cwd(), 'public', 'sitemap.xml');
  const xmlContent = fs.readFileSync(filePath, 'utf8');

  // Send the response
  res.status(200).send(xmlContent);
}