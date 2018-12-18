import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  nextSong,
  prevSong,
  removeSongFromQueue,
  togglePlay
} from '../../actions/queueActions';
import SongControls from './component';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      nextSong,
      prevSong,
      togglePlay,
      removeSongFromQueue
    },
    dispatch
  );

const mapStateToProps = state => {
  const enabled = state.userReducer.enabledServices.toJS();
  const player = state.player;
  let ready = true;
  if (enabled.spotify && !player.spotifyReady) {
    ready = false;
  }
  if (enabled.youtube && !player.youtubeReady) {
    ready = false;
  }
  return {
    nextTrackPosition: state.queue.position + 1,
    currentTrack: state.queue.queue.isEmpty()
      ? null
      : state.queue.queue.get(state.queue.position),
    nextTrack: state.queue.queue.isEmpty()
      ? null
      : state.queue.queue.get(state.queue.position + 1),
    prevTrack: state.queue.queue.isEmpty()
      ? null
      : state.queue.queue.get(state.queue.position - 1),
    ready,
    playing: state.player.playing
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongControls);