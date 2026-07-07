import { YOUTUBE_SEARCH_URL } from "@/constants";

export function buildSearchUrl(term: string): string {
  const encoded = encodeURIComponent(term.trim());
  return `${YOUTUBE_SEARCH_URL}${encoded}`;
}
