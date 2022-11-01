import { useRef } from "react";
import { findDOMNode } from "react-dom";
import ReactPlayer from "react-player";
import screenfull from "screenfull";
import "./App.css";
import VideoControls from "./components/VideoControls";
import VideoData from "./components/VideoData";
import { useVideoControls } from "./hooks/useVideoControls";

function App() {
  const { state, handleLocalFileInputChange, handleSetState } =
    useVideoControls();

  const player1 = useRef(null);
  const player2 = useRef(null);

  const title = "FilmWorkz";

  const handleClickFullscreen = () => {
    if (player1.current) {
      screenfull.request(findDOMNode(player1.current) as Element);
    }
  };

  const handleSeekMouseUp = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    handleSetState("seeking", false);
    if (player1.current && player2.current) {
      const target = e.target as HTMLInputElement;
      (player1.current as ReactPlayer).seekTo(parseFloat(target.value));
      (player2.current as ReactPlayer).seekTo(parseFloat(target.value));
    }
  };
  return (
    <div className="App">
      <h1>{title}</h1>
      <div className="button button--controls url-input-container">
        <label htmlFor="urlInput">
          <strong>url: </strong>
        </label>
        <input
          id="urlInput"
          type="text"
          onChange={(e) => handleSetState("url", e.target.value)}
          value={state.url as string}
        />
      </div>
      <div className="container">
        <div className="player-wrapper">
          <ReactPlayer
            ref={player1}
            url={state.url}
            className="react-player"
            width="100%"
            height="100%"
            playing={state.playing}
            controls
            light={state.light}
            loop={state.loop}
            playbackRate={state.playbackRate}
            volume={state.volume}
            muted={state.muted}
            onPlay={() => handleSetState("playing", true)}
            onPause={() => handleSetState("playing", false)}
            onPlaybackRateChange={(value: string) =>
              handleSetState("playbackRate", parseFloat(value))
            }
            onEnded={() => handleSetState("playing", false)}
            onProgress={(value) => handleSetState("progress", value)}
            onDuration={(val) => handleSetState("duration", val)}
            config={{
              youtube: {
                playerVars: { origin: "http://localhost:5173" },
              },
            }}
          />
        </div>

        <div className="player-wrapper">
          <ReactPlayer
            ref={player2}
            url={state.url}
            className="react-player"
            width="100%"
            height="100%"
            playing={state.playing}
            controls
            light={state.light}
            loop={state.loop}
            playbackRate={state.playbackRate}
            volume={state.volume}
            muted={state.muted}
            onPlay={() => handleSetState("playing", true)}
            onPause={() => handleSetState("playing", false)}
            onPlaybackRateChange={(value: string) => {
              handleSetState("playbackRate", parseFloat(value));
            }}
            onEnded={() => handleSetState("playing", false)}
            onProgress={(st) => handleSetState("progress", st)}
            onDuration={(val) => handleSetState("duration", val)}
            config={{
              youtube: {
                playerVars: { origin: "http://localhost:5173" },
              },
            }}
          />
        </div>
      </div>
      <div className="video-data">
        <input
          id="fileInput"
          className="button button--controls"
          type="file"
          onChange={handleLocalFileInputChange}
        />
        <VideoData {...state} />
        <VideoControls
          state={state}
          handleStop={() => handleSetState("playing", false)}
          handlePlayPause={() => handleSetState("playing", !state.playing)}
          handleClickFullscreen={handleClickFullscreen}
          handleSetPlaybackRate={(e) =>
            handleSetState(
              "playbackRate",
              parseFloat((e.target as HTMLButtonElement).value)
            )
          }
          handleSeekMouseDown={() => handleSetState("seeking", true)}
          handleSeekChange={(e) =>
            handleSetState("played", parseFloat(e.target.value))
          }
          handleSeekMouseUp={handleSeekMouseUp}
          handleVolumeChange={(e) =>
            handleSetState("volume", parseFloat(e.target.value))
          }
        />
      </div>
    </div>
  );
}

export default App;
