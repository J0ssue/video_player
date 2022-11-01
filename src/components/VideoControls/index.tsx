import { ChangeEvent } from "react";
import { BaseReactPlayerProps } from "react-player/base";
import ButtonCotrols from "../ButtonControls";
import InputControls from "../InputControls";
import ProgressBar from "../ProgressBar";
type noop = () => void;
const playbackRateValues: Array<number | string> = [1, 1.5, 2];

import "./VideoControls.css";

interface Props {
  state: BaseReactPlayerProps;
  handleStop: noop;
  handlePlayPause: noop;
  handleClickFullscreen: noop;
  handleSetPlaybackRate: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  handleSeekMouseDown: noop;
  handleSeekChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSeekMouseUp: (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => void;
  handleVolumeChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function VideoControls(props: Props) {
  const {
    state,
    handleStop,
    handlePlayPause,
    handleClickFullscreen,
    handleSetPlaybackRate,
    handleSeekMouseDown,
    handleSeekChange,
    handleSeekMouseUp,
    handleVolumeChange,
  } = props;

  return (
    <>
      <div className="controls">
        <ButtonCotrols text="Stop" onClick={handleStop} />
        <ButtonCotrols
          text={state.playing ? "Pause" : "Play"}
          onClick={handlePlayPause}
        />
        <ButtonCotrols text="Fullscreen" onClick={handleClickFullscreen} />
        <span className="button button--text">Speed:</span>
        {playbackRateValues.map((value) => (
          <ButtonCotrols
            key={value}
            value={value}
            onClick={handleSetPlaybackRate}
          />
        ))}
      </div>
      <div className="controls-bottom">
        <InputControls
          text="Seek"
          min={0}
          max={0.999999}
          value={state.played}
          onMouseDown={handleSeekMouseDown}
          onChange={handleSeekChange}
          onMouseUp={handleSeekMouseUp}
        />
        <InputControls
          text="Volume"
          min={0}
          max={1}
          value={state.volume}
          onChange={handleVolumeChange}
        />
        <ProgressBar text="Played" max={1} value={state.played} />
        <ProgressBar text="Loaded" max={1} value={state.loaded} />
      </div>
    </>
  );
}

export default VideoControls;
