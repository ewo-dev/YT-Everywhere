export interface SearchQuery {
  term: string;
}

export interface OverlayState {
  visible: boolean;
}

export type CommandMessage = {
  command: "toggle-overlay";
};
