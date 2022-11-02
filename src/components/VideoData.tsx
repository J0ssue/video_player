import { BaseReactPlayerProps } from "react-player/base";
import { format } from "../utils/dateFormatUtils";

const informationFields = [
  "playing",
  "volume",
  "speed",
  "played",
  "loaded",
  "duration",
  "elapsed",
  "remaining",
];

function VideoData({
  playing,
  volume,
  playbackRate,
  played,
  loaded,
  duration,
}: BaseReactPlayerProps) {
  return (
    <table className="button button--text button--round-none">
      <thead>
        <tr>
          {informationFields.map((field) => (
            <th key={field}>{field}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{playing ? "true" : "false"}</td>
          <td>{volume && volume.toFixed(3)}</td>
          <td>{playbackRate}</td>
          <td>{played.toFixed(3)}</td>
          <td>{loaded.toFixed(3)}</td>
          <td>
            <time dateTime={`P${Math.round(duration)}S`}>
              {format(duration)}
            </time>
          </td>
          <td>
            <time dateTime={`P${Math.round(duration * played)}S`}>
              {format(duration * played)}
            </time>
          </td>
          <td>
            <time dateTime={`P${Math.round(duration * (1 - played))}S`}>
              {format(duration * (1 - played))}
            </time>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
export default VideoData;
