import { ChangeEvent, useState } from "react";
import { ReactPlayerProps } from "react-player";
import { OnProgressProps } from "react-player/base";

export function useVideoControls(originalUrl?: string) {
  if (!originalUrl) {
    originalUrl = "https://www.youtube.com/watch?v=X4YK-DEkvcw";
  }
  const [state, setState] = useState<ReactPlayerProps>({
    url: originalUrl,
    url2: originalUrl,
    playing: false,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
  });

  const handleLocalFileInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    keyProp: string
  ) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const file: Blob | MediaSource = event.target.files[0];

      setState((s) => ({
        ...s,
        [keyProp]: URL.createObjectURL(new Blob([file]))
          ? URL.createObjectURL(new Blob([file]))
          : "",
      }));
    } catch (error) {
      console.error(error);
    }
  };
  function handleSetState(
    property: string,
    value: string | boolean | number | OnProgressProps
  ) {
    switch (typeof value) {
      case "object":
        setState((s) => ({ ...s, ...value }));
        break;
      default:
        setState((s) => ({ ...s, [property]: value }));
        break;
    }
  }

  return {
    state,
    handleLocalFileInputChange,
    handleSetState,
  };
}
