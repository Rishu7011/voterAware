import { createContext, useContext, useState } from "react";
import * as Speech from "expo-speech";

const TTSContext = createContext<any>(null);

export function TTSProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  const speak = (text: string) => {
    if (!enabled) return;
    Speech.stop();
    Speech.speak(text, { rate: 0.95 });
  };

  const stop = () => Speech.stop();

  return (
    <TTSContext.Provider value={{ enabled, setEnabled, speak, stop }}>
      {children}
    </TTSContext.Provider>
  );
}

export const useTTS = () => useContext(TTSContext);
