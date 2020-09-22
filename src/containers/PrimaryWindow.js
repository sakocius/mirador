import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { withPlugins } from '../extend/withPlugins';
import { PrimaryWindow } from '../components/PrimaryWindow';
import { getVisibleCanvasAudioResources, getVisibleCanvasVideoResources } from '../state/selectors';

/** */
const mapStateToProps = (state, { windowId }) => (
  {
    audioResources: getVisibleCanvasAudioResources(state, { windowId }) || [],
    videoResources: getVisibleCanvasVideoResources(state, { windowId }) || [],
  }
);

const styles = {
  primaryWindow: {
    display: 'flex',
    flex: 1,
    position: 'relative',
  },
};

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, null),
  withPlugins('PrimaryWindow'),
);

export default enhance(PrimaryWindow);
