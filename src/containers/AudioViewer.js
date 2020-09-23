import { connect } from 'react-redux';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { withPlugins } from '../extend/withPlugins';
import { AudioViewer } from '../components/AudioViewer';
import { getVisibleCanvasAudioResources } from '../state/selectors';

/** */
const mapStateToProps = (state, { windowId }) => (
  {
    audioResources: getVisibleCanvasAudioResources(state, { windowId }) || [],
  }
);

/** */
const styles = () => ({
  audio: {
    width: '100%',
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    width: '100%',
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, null),
  withPlugins('AudioViewer'),
);

export default enhance(AudioViewer);
