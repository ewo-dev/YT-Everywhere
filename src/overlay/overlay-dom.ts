import { OVERLAY_ID, INPUT_ID } from "@/constants";
import { handleSearchSubmit } from "@/commands/search-command";
import { toggleOverlay } from "./overlay-manager";

export function createOverlayElement(): HTMLElement {
  const overlay = document.createElement("div");
  overlay.id = OVERLAY_ID;
  overlay.addEventListener("click", handleBackdropClick);

  const container = document.createElement("div");
  container.className = "yt-everywhere-container";

  const input = document.createElement("input");
  input.id = INPUT_ID;
  input.type = "text";
  input.placeholder = "Search YouTube...";
  input.autocomplete = "off";
  input.addEventListener("keydown", handleInputKeydown);

  container.appendChild(input);
  overlay.appendChild(container);

  return overlay;
}

function handleInputKeydown(event: KeyboardEvent): void {
  if (event.key === "Enter") {
    const input = event.target as HTMLInputElement;
    handleSearchSubmit(input.value);
    return;
  }

  if (event.key === "Escape") {
    toggleOverlay();
  }
}

function handleBackdropClick(event: MouseEvent): void {
  if ((event.target as HTMLElement).id === OVERLAY_ID) {
    toggleOverlay();
  }
}
