import { removeTrailingSlash } from './';

/**
 * Utility functions for handling CORS in a serverless environment.
 * @module corsUtil
 */

/**
 * Set CORS headers based on allowed domains.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
function setCorsHeaders(req, res) {
  const allowedDomains = JSON.parse(process.env.ALLOWED_DOMAINS);

  const origin = req.headers.origin;
  if (!origin) {
    return;
  }

  const normalizedOrigin = removeTrailingSlash(origin);
  res.setHeader('Access-Control-Allow-Credentials', true);

  allowedDomains.forEach((domain) => {
    const normalizedDomain = removeTrailingSlash(domain);

    if (normalizedOrigin === normalizedDomain) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
  });
}

/**
 * Handle pre-flight OPTIONS requests.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 */
function handleOptionsRequest(req, res) {
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,PATCH,DELETE,OPTIONS',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
  res.status(200).end();
}

module.exports = { setCorsHeaders, handleOptionsRequest };
