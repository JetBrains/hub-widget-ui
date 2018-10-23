/* eslint-disable no-unused-expressions */

import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';

import TestComponent from '../test-mocks/test-component';
import {getDashboardApiMock} from '../test-mocks/test-mocks';

import withWidgetTitleHOC from './widget-title';

describe('WidgetTitle', () => {

  let dashboardApiMock;
  let TitleTestComponent;

  beforeEach(() => {
    dashboardApiMock = getDashboardApiMock();
    TitleTestComponent = withWidgetTitleHOC(TestComponent);
  });

  it('should export function', () => {
    expect(withWidgetTitleHOC).to.be.a('function');
  });

  it('should render component wrapped to title-hoc', () => {
    const testComponentWrapper = mountTitleTestComponent('World', 'Hello', dashboardApiMock);

    expect(
      testComponentWrapper.find('[data-test="test-component-root"]').text()
    ).to.equal('World');
  });

  it('should set title for dashboard api', () => {
    const testComponentWrapper = mountTitleTestComponent('World', 'Hello', dashboardApiMock);

    expect(
      testComponentWrapper.find('[data-test="test-component-root"]').text()
    ).to.equal('World');

    expect(dashboardApiMock.setTitle).to.have.been.called;

    testComponentWrapper.setProps({
      label: 'Updated label'
    });
  });

  it('should not update title for dashboard api if it was not changed', () => {
    const testComponentWrapper = mountTitleTestComponent('World', 'Hello', dashboardApiMock);

    expect(dashboardApiMock.setTitle).to.have.been.calledOnce;

    testComponentWrapper.setProps({
      label: 'Updated label'
    });

    expect(
      testComponentWrapper.find('[data-test="test-component-root"]').text()
    ).to.equal('Updated label');
    expect(dashboardApiMock.setTitle).to.have.been.calledOnce;
  });

  it('should not update title for dashboard api if passed same value', () => {
    const testComponentWrapper = mountTitleTestComponent('World', 'Hello', dashboardApiMock);

    expect(dashboardApiMock.setTitle).to.have.been.calledOnce;

    testComponentWrapper.setProps({
      label: 'Updated label',
      widgetTitle: 'Hello'
    });

    expect(
      testComponentWrapper.find('[data-test="test-component-root"]').text()
    ).to.equal('Updated label');
    expect(dashboardApiMock.setTitle).to.have.been.calledOnce;
  });

  it('should update title for dashboard api if it was changed', () => {
    const testComponentWrapper = mountTitleTestComponent('World', 'Hello', dashboardApiMock);

    expect(dashboardApiMock.setTitle).to.have.been.calledOnce;

    testComponentWrapper.setProps({
      label: 'Updated label',
      widgetTitle: {
        text: 'Hello',
        link: 'http://google.com'
      }
    });

    expect(
      testComponentWrapper.find('[data-test="test-component-root"]').text()
    ).to.equal('Updated label');
    expect(dashboardApiMock.setTitle).to.have.been.calledTwice;
  });

  it('should work even without title-hoc parameters', () => {
    const testComponentWrapper = mountTitleTestComponent('World');

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

  function mountTitleTestComponent(label, widgetTitle, dashboardApi) {
    return mount(
      <TitleTestComponent
        label={label}
        widgetTitle={widgetTitle}
        dashboardApi={dashboardApi}
      />
    );
  }
});
