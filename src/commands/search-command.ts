import { buildSearchUrl } from "@/services/search-service";
import { openUrl } from "@/utils/navigation";

export function handleSearchSubmit(term: string): void {
  if (!term.trim()) return;

  const url = buildSearchUrl(term);
  openUrl(url);
}
