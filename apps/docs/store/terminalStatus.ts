import { atom } from "nanostores";

export const isTerminalOpen = atom(false);
export const isTerminalHidden = atom(false);
export const isTerminalFullscreen = atom(false);
export const commandToRun = atom<string | null>(null);
