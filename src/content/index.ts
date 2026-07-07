import type { CommandMessage } from "@/types";
import { toggleOverlay } from "@/overlay/overlay-manager";

console.log('[YT][content] content script loaded on', location.href);

browser.runtime.onMessage.addListener((message: unknown) => {
  console.log('[YT][content] runtime.onMessage received:', message);
  const msg = message as CommandMessage;

  if (msg.command === "toggle-overlay") {
    toggleOverlay();
  }
});
