import type { CommandMessage } from "@/types";

const COMMAND_NAME = "toggle-overlay";

browser.commands.onCommand.addListener((command: string) => {
  console.log("[YT][background] command received:", command);
  if (command !== COMMAND_NAME) return;

  void sendToggleMessage();
});

async function sendToggleMessage(): Promise<void> {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  const activeTab = tabs[0];

  if (!activeTab || typeof activeTab.id !== "number") {
    console.warn("[YT][background] no active tab found");
    return;
  }

  const tabId = activeTab.id;
  const url = activeTab.url ?? "";
  console.log("[YT][background] activeTab:", tabId, url);

  // Content scripts can only run on http/https pages
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    console.warn("[YT][background] cannot inject into non-web page:", url);
    return;
  }

  const message: CommandMessage = { command: "toggle-overlay" };

  try {
    await browser.tabs.sendMessage(tabId, message);
    console.log("[YT][background] message sent successfully");
  } catch {
    // Content script not yet injected — inject it programmatically
    console.log("[YT][background] injecting content script into tab", tabId);
    await browser.scripting.executeScript({
      target: { tabId },
      files: ["content.js"],
    });
    await browser.scripting.insertCSS({
      target: { tabId },
      files: ["styles/overlay.css"],
    });

    // Give the script a moment to register its listener, then resend
    await new Promise((resolve) => setTimeout(resolve, 50));
    try {
      await browser.tabs.sendMessage(tabId, message);
      console.log("[YT][background] message sent after injection");
    } catch (retryErr) {
      console.error("[YT][background] sendMessage failed after injection:", retryErr);
    }
  }
}
