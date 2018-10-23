/* eslint-disable no-unused-expressions */

import 'core-js/es6';

import 'babel-polyfill';
import React from 'react';
import chai, {expect} from 'chai';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import spies from 'chai-spies';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import chaiAsPromised from 'chai-as-promised';
import chaiDOM from 'chai-dom';
import sinonChai from 'sinon-chai';

import TestComponent from '../test-mocks/test-component';
import {getDashboardApiMock} from '../test-mocks/test-mocks';

import withWidgetTitleHOC from './widget-title';

const adapter = new Adapter();
Enzyme.configure({adapter});

chai.use(chaiEnzyme());
chai.use(spies);
chai.use(chaiAsPromised);
chai.use(chaiDOM);
chai.use(sinonChai);

Object.assign(window, {
  sandbox: sinon.createSandbox()
});

const TitleTestComponent = withWidgetTitleHOC(TestComponent);

describe.only('WidgetTitle', () => {

  let dashboardApiMock;

  beforeEach(() => {
    dashboardApiMock = getDashboardApiMock();
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
    return Enzyme.mount(
      <TitleTestComponent
        label={label}
        widgetTitle={widgetTitle}
        dashboardApi={dashboardApi}
      />
    );
  }
});
