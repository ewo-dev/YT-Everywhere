import { createOverlayElement } from "./overlay-dom";
import { OVERLAY_ID } from "@/constants";
import type { OverlayState } from "@/types";

const state: OverlayState = { visible: false };

export function toggleOverlay(): void {
  if (state.visible) {
    hideOverlay();
  } else {
    showOverlay();
  }
}

function showOverlay(): void {
  let overlay = document.getElementById(OVERLAY_ID);

  if (!overlay) {
    overlay = createOverlayElement();
    document.body.appendChild(overlay);
  }

  overlay.classList.add("visible");
  state.visible = true;
  focusInput();
}

function hideOverlay(): void {
  const overlay = document.getElementById(OVERLAY_ID);
  if (!overlay) return;

  overlay.classList.remove("visible");
  state.visible = false;
}

function focusInput(): void {
  requestAnimationFrame(() => {
    const input = document.getElementById("yt-everywhere-input");
    if (input instanceof HTMLInputElement) {
      input.focus();
    }
  });
}
