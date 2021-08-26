import { useEffect } from "react";

export const useSpeech = () => {
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
