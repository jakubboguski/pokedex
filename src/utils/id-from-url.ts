import { CONFIG } from "./config";

export function getIdFromUrl(address: string) {
  const validApiAdress = address.startsWith(CONFIG.api);
  if (!validApiAdress) {
    return undefined;
  }

  const url = new URL(address);
  const segments = url.pathname.split("/");

  return segments.length === 6 ? segments[4] : undefined;
}
