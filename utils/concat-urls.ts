/**
 * This function concatenates two URLs.
 * It removes the trailing slash from the first URL if it exists, and adds a trailing slash to the second URL if it doesn't exist.
 * It then concatenates the two URLs.
 *
 * @example
 * concatUrls("https://example.com", "/users?page=1&limit=10") // "https://example.com/users?page=1&limit=10"
 * concatUrls("https://example.com/", "/users") // "https://example.com/users"
 * concatUrls("https://example.com", "users") // "https://example.com/users"
 * concatUrls("https://example.com/", "users") // "https://example.com/users/"
 */

export function concatUrls(url1: string, url2: string): string {
  const normalizedUrl1 = url1.endsWith("/") ? url1.slice(0, -1) : url1; // remove trailing slash from url1 if it exists
  const normalizedUrl2 = url2.startsWith("/") ? url2.slice(1) : url2; // remove leading slash from url2 if it exists

  return `${normalizedUrl1}/${normalizedUrl2}`;
}