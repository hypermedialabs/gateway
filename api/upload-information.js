const axios = require('axios');

module.exports = async (req, res) => {
  const API_KET = process.env.API_KEY;
    try {
      // Obtener title y size del body de la solicitud
      const { title, size } = req.body;
  
      const response = await axios.post('http://localhost:3001/upload', {title, size}, {
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
