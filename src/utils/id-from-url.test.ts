import { getIdFromUrl } from "./id-from-url";
import { CONFIG } from "./config";

describe("getIdFromUrl", () => {
  it("should return the correct ID when the URL is valid", () => {
    const validUrl = `${CONFIG.api}/pokemon/5/`;
    const result = getIdFromUrl(validUrl);
    expect(result).toBe("5");
  });

  it("should return undefined if the URL does not start with the correct API", () => {
    const invalidUrl = "https://example.com/5/details/view";
    const result = getIdFromUrl(invalidUrl);
    expect(result).toBeUndefined();
  });

  it("should return undefined if the URL has fewer segments", () => {
    const shortUrl = `${CONFIG.api}/5`;
    const result = getIdFromUrl(shortUrl);
    expect(result).toBeUndefined();
  });

  it("should return undefined if the URL has more segments", () => {
    const longUrl = `${CONFIG.api}/pokemon/5/details/view`;
    const result = getIdFromUrl(longUrl);
    expect(result).toBeUndefined();
  });
});
