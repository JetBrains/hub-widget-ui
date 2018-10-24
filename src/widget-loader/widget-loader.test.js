/* eslint-disable no-unused-expressions */

import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';

import TestComponent from '../test-mocks/test-component';
import {getDashboardApiMock} from '../test-mocks/test-mocks';

import withWidgetLoaderHOC from './widget-loader';

describe('WidgetLoader', () => {

  let dashboardApiMock;
  let WidgetLoaderTestComponent;

  beforeEach(() => {
    dashboardApiMock = getDashboardApiMock();
    WidgetLoaderTestComponent = withWidgetLoaderHOC(TestComponent);
  });

  it('should export function', () => {
    expect(withWidgetLoaderHOC).to.be.a('function');
  });

  it('should render component wrapped to loader-hoc', () => {
    const testComponentWrapper = mountWidgetLoaderTestComponent('World', true, dashboardApiMock);

    expect(
      testComponentWrapper.find('[data-test="test-component-root"]').text()
    ).to.equal('World');
  });

  it('should set loader animation for dashboard api', () => {
    const testComponentWrapper = mountWidgetLoaderTestComponent('World', true, dashboardApiMock);

    expect(
      testComponentWrapper.find('[data-test="test-component-root"]').text()
    ).to.equal('World');

    expect(dashboardApiMock.setLoadingAnimationEnabled).to.have.been.called;

    testComponentWrapper.setProps({
      label: 'Updated label'
    });
  });

  it('should not update loader animation state for dashboard api if it was not changed', () => {
    const testComponentWrapper = mountWidgetLoaderTestComponent('World', true, dashboardApiMock);

    expect(dashboardApiMock.setLoadingAnimationEnabled).to.have.been.calledOnce;

    testComponentWrapper.setProps({
      label: 'Updated label'
    });

    expect(
      testComponentWrapper.find('[data-test="test-component-root"]').text()
    ).to.equal('Updated label');
    expect(dashboardApiMock.setLoadingAnimationEnabled).to.have.been.calledOnce;
  });

  it('should not update loader animation state for dashboard api if passed same value', () => {
    const testComponentWrapper = mountWidgetLoaderTestComponent('World', true, dashboardApiMock);

    expect(dashboardApiMock.setLoadingAnimationEnabled).to.have.been.calledOnce;

    testComponentWrapper.setProps({
      label: 'Updated label',
      widgetLoader: true
    });

    expect(
      testComponentWrapper.find('[data-test="test-component-root"]').text()
    ).to.equal('Updated label');
    expect(dashboardApiMock.setLoadingAnimationEnabled).to.have.been.calledOnce;
  });

  it('should update loader animation state for dashboard api if it was changed', () => {
    const testComponentWrapper = mountWidgetLoaderTestComponent('World', true, dashboardApiMock);

    expect(dashboardApiMock.setLoadingAnimationEnabled).to.have.been.calledOnce;

    testComponentWrapper.setProps({
      label: 'Updated label',
      widgetLoader: false
    });

    expect(
      testComponentWrapper.find('[data-test="test-component-root"]').text()
    ).to.equal('Updated label');
    expect(dashboardApiMock.setLoadingAnimationEnabled).to.have.been.calledTwice;
  });

  it('should work even without widget-loader-hoc parameters', () => {
    const testComponentWrapper = mountWidgetLoaderTestComponent('World');

    expect(
      testComponentWrapper.find('[data-test="test-component-root"]').text()
    ).to.equal('World');

    testComponentWrapper.setProps({
      label: 'Updated label'
    });

    expect(
      testComponentWrapper.find('[data-test="test-component-root"]').text()
    ).to.equal('Updated label');
  });

  function mountWidgetLoaderTestComponent(label, widgetLoader, dashboardApi) {
    return mount(
      <WidgetLoaderTestComponent
        label={label}
        widgetLoader={widgetLoader}
        dashboardApi={dashboardApi}
      />
    );
  }
});
