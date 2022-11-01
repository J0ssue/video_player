import { BaseReactPlayerProps } from "react-player/base";
import { format } from "../utils/dateFormatUtils";

function VideoData({
  playing,
  volume,
  playbackRate,
  played,
  loaded,
  duration,
}: BaseReactPlayerProps) {
  return (
    <table className="button button--text">
      <tbody>
        <tr>
          <th>playing</th>
          <td>{playing ? "true" : "false"}</td>
        </tr>
        <tr>
          <th>volume</th>
          <td>{volume && volume.toFixed(3)}</td>
        </tr>
        <tr>
          <th>speed</th>
          <td>{playbackRate}</td>
        </tr>
        <tr>
          <th>played</th>
          <td>{played.toFixed(3)}</td>
        </tr>
        <tr>
          <th>loaded</th>
          <td>{loaded.toFixed(3)}</td>
        </tr>
        <tr>
          <th>duration</th>
          <td>
            <time dateTime={`P${Math.round(duration)}S`}>
              {format(duration)}
            </time>
          </td>
        </tr>
        <tr>
          <th>elapsed</th>
          <td>
            <time dateTime={`P${Math.round(duration * played)}S`}>
              {format(duration * played)}
            </time>
          </td>
        </tr>
        <tr>
          <th>remaining</th>
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
