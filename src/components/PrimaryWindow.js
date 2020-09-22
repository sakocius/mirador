import React, { Component, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import WindowSideBar from '../containers/WindowSideBar';
import CompanionArea from '../containers/CompanionArea';
import ns from '../config/css-ns';

const GalleryView = lazy(() => import('../containers/GalleryView'));
const WindowViewer = lazy(() => import('../containers/WindowViewer'));

GalleryView.displayName = 'GalleryView';
WindowViewer.displayName = 'WindowViewer';

/**
 * WindowMiddleContent - component that renders the "middle" area of the
 * Mirador Window
 */
export class PrimaryWindow extends Component {
  /**
   * renderViewer
   *
   * @return {(String|null)}
   */
  renderViewer() {
    const { isFetching, view, windowId } = this.props;
    if (isFetching === false) {
      if (view === 'gallery') {
        return (
          <GalleryView
            windowId={windowId}
          />
        );
      }
      return (
        <WindowViewer
          windowId={windowId}
        />
      );
    }
    return null;
  }

  /**
   * Render the component
   */
  render() {
    const { windowId, classes } = this.props;
    return (
      <div className={classNames(ns('primary-window'), classes.primaryWindow)}>
        <WindowSideBar windowId={windowId} />
        <CompanionArea windowId={windowId} position="left" />
        <Suspense fallback={<div />}>
          {this.renderViewer()}
        </Suspense>
      </div>
    );
  }
}

PrimaryWindow.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  isFetching: PropTypes.bool,
  view: PropTypes.string,
  windowId: PropTypes.string.isRequired,
};

PrimaryWindow.defaultProps = {
  isFetching: false,
  view: undefined,
};
