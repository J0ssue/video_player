import ReactPlayer from "react-player";

function DoubleVideoWindow() {
  return (
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
  );
}
