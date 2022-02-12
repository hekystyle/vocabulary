import { useEffect } from 'react';

export interface SpeachShape {
  speak: (text: string) => void;
}

export const useSpeech = (): SpeachShape => {
  const synthesis = window.speechSynthesis;

  useEffect(() => () => synthesis.cancel(), [synthesis]);

  return {
    speak: (text: string) => {
      synthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      synthesis.speak(u);
    },
  };
};
