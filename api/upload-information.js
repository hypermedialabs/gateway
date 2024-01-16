const axios = require('axios');

module.exports = async (req, res) => {
    const API_KET = process.env.HYPERMEDIA_API_KEY;

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // If the request is a pre-flight OPTIONS request, send a 200 response
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
      res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
      res.status(200).end();
      return;
    }

    try {
      // Obtener title y size del body de la solicitud
      const { title, size } = req.body;
  
      const response = await axios.post('hypermedia-api-git-feat-uploadtobunny-hypermediavideo.vercel.app/upload', {title, size}, {
          headers: {
              'x-api-key': API_KET
          },
      });
      res.json(response.data);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }
  };
