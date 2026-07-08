import type { CommandMessage } from "@/types";
import { toggleOverlay } from "@/overlay/overlay-manager";

console.log('[YT][content] content script loaded on', location.href);

function isCommandMessage(value: unknown): value is CommandMessage {
  return (
    typeof value === "object" &&
    value !== null &&
    "command" in value &&
    typeof (value as any).command === "string"
  );
}

browser.runtime.onMessage.addListener((message: unknown) => {
  console.log('[YT][content] runtime.onMessage received:', message);

  if (!isCommandMessage(message)) return;

  if (message.command === "toggle-overlay") {
    toggleOverlay();
  }
});
