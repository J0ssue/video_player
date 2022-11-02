import { ChangeEvent, useRef } from "react";
import { findDOMNode } from "react-dom";
import ReactPlayer from "react-player";
import screenfull from "screenfull";
import {
  Container,
  Header,
  Main,
  Section,
} from "../components/LayoutComponents";
import VideoControls from "../components/VideoControls";
import VideoData from "../components/VideoData";
import { useVideoControls } from "../hooks/useVideoControls";
import "./App.css";
import { FileInput, SearchInput } from "./Components";

function App() {
  const { state, handleLocalFileInputChange, handleSetState } =
    useVideoControls();

  const player1 = useRef(null);
  const player2 = useRef(null);

  const title = "FilmWorkz";
  const videosToDisplay = [player1, player2];

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

  const DoubleVideoWindow = () =>
    videosToDisplay.map((vid, index) => (
      <Container className="player-wrapper" key={index.toString()}>
        <ReactPlayer
          ref={vid}
          url={state.url}
          className="react-player"
          width="100%"
          height="100%"
          playing={state.playing}
          pip
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
      </Container>
    ));

  return (
    <Container className="App">
      <Header className="header">
        <h1>{title}</h1>
        <VideoData {...state} />
      </Header>

      <Main>
        <SearchInput
          state={state}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleSetState("url", e.target.value);
          }}
        />

        <Section className="player-container">{DoubleVideoWindow()}</Section>

        <Section className="video-data">
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
          <FileInput
            labelText="Select local video file"
            onChange={handleLocalFileInputChange}
          />
        </Section>
      </Main>
    </Container>
  );
}

export default App;
