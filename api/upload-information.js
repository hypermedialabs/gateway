const axios = require('axios');
const { setCorsHeaders, handleOptionsRequest } = require('../utils/corsUtil');

/**
 * Serverless function to handle requests and upload data.
 * @param {object} req - The request object, containing method, headers, and body.
 * @param {object} res - The response object used to send back a response.
 */
module.exports = async (req, res) => {
  const API_KEY = process.env.HYPERMEDIA_API_KEY;

  // Set CORS headers
  setCorsHeaders(req, res);

  // If the request is a pre-flight OPTIONS request
  if (req.method === 'OPTIONS') {
    handleOptionsRequest(req, res);
    return;
  }

  try {
    // Extract title and size from the request body
    const { title, size } = req.body;

    // Post data to the specified URL
    const response = await axios.post(
      'https://hypermedia-api-git-feat-uploadtobunny-hypermediavideo.vercel.app/upload',
      { title, size },
      {
        headers: {
          'x-api-key': API_KEY,
        },
      },
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
