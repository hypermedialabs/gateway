/**
 * Removes the trailing slash ('/') from a URL if it exists.
 *
 * @param {string} url - The URL from which to remove the trailing slash.
 * @returns {string} The URL without the trailing slash. If the original URL does not end with a slash, it is returned unchanged.
 */
export function removeTrailingSlash(url) {
    if (url.endsWith('/')) {
      return url.slice(0, -1);
    }
  
    return url;
  }