import { buildSearchUrl } from "@/services/search-service";
import { openUrl } from "@/utils/navigation";

const MAX_QUERY_LENGTH = 512;

export function handleSearchSubmit(term: string): void {
  const trimmed = term.trim();
  if (!trimmed) return;
  if (trimmed.length > MAX_QUERY_LENGTH) return;

  const url = buildSearchUrl(trimmed);
  openUrl(url);
}
