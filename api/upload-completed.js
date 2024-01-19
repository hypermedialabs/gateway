const axios = require('axios');
const { setCorsHeaders, handleOptionsRequest } = require('../utils/corsUtil');

/**
 * Serverless function to handle requests and upload data.
 * @param {object} req - The request object, containing method, headers, and body.
 * @param {object} res - The response object used to send back a response.
 */
module.exports = async (req, res) => {
  const API_KEY = process.env.HYPERMEDIA_API_KEY;

  setCorsHeaders(req, res);
  
  if (req.method === 'OPTIONS') {
    handleOptionsRequest(req, res);
    return;
  }

  try {
    const { tus_file } = req.body;
    const response = await axios.post(
      'https://api.hypermedia.link/files/upload',
      { tus_file },
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
