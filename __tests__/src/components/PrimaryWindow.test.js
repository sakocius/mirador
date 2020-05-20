import React from 'react';
import { shallow } from 'enzyme';
import { PrimaryWindow } from '../../../src/components/PrimaryWindow';
import WindowSideBar from '../../../src/containers/WindowSideBar';

/** create wrapper */
function createWrapper(props) {
  return shallow(
    <PrimaryWindow
      classes={{}}
      windowId="window-1"
      {...props}
    />,
  );
}

describe('PrimaryWindow', () => {
  it('should render outer element', () => {
    const wrapper = createWrapper();
    expect(wrapper.find('.mirador-primary-window')).toHaveLength(1);
  });
  it('should render <WindowSideBar>', () => {
    const wrapper = createWrapper();
    expect(wrapper.find(WindowSideBar)).toHaveLength(1);
  });
  it('should render nothing if manifest is still fetching', () => {
    const wrapper = createWrapper({ isFetching: true });
    const suspenseComponent = wrapper.find('Suspense');
    expect(suspenseComponent).toEqual({});
  });
  it('should render <WindowViewer> if manifest is present', () => {
    const wrapper = createWrapper({ isFetching: false });
    const suspenseComponent = wrapper.find('Suspense');
    const lazyComponent = suspenseComponent.dive().find('lazy');
    expect(lazyComponent.type().displayName).toBe('WindowViewer');
  });
  it('should render <GalleryView> if manifest is present and view is gallery', () => {
    const wrapper = createWrapper({ isFetching: false, view: 'gallery', windowId: 'window-2' });
    const suspenseComponent = wrapper.find('Suspense');
    const lazyComponent = suspenseComponent.dive().find('lazy');
    expect(lazyComponent.type().displayName).toBe('GalleryView');
  });
});
