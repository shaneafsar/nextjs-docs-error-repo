async function startMSW() {
  if (typeof window === "undefined") {
    await import("./server");
  } else {
    await import("./browser");
  }
}

startMSW();

export {};
