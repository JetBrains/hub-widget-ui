/* eslint-disable no-unused-expressions */

import React from 'react';
import sinon from 'sinon';
import {expect} from 'chai';
import {mount} from 'enzyme';

import TestComponent from '../test-mocks/test-component';

import withTimerHOC from './timer';

describe('WidgetLoader', () => {

  const TEST_PERIOD = 100;

  let WidgetLoaderTestComponent;
  let onTick;
  let clock;

  beforeEach(() => {
    onTick = sandbox.spy();
    clock = sinon.useFakeTimers();
    WidgetLoaderTestComponent = withTimerHOC(TestComponent);
  });

  afterEach(() => {
    clock.restore();
  });

  it('should export function', () => {
    expect(withTimerHOC).to.be.a('function');
  });

  it('should render component wrapped to timer-hoc', () => {
    const testComponentWrapper = mountTimerTestComponent('World', TEST_PERIOD, onTick);

    expect(
      testComponentWrapper.find('[data-test="test-component-root"]').text()
    ).to.equal('World');
  });

  it('should rerender component on changes props', () => {
    const testComponentWrapper = mountTimerTestComponent('World', TEST_PERIOD, onTick);
    testComponentWrapper.setProps({
      label: 'Hello!'
    });

    expect(
      testComponentWrapper.find('[data-test="test-component-root"]').text()
    ).to.equal('Hello!');
  });

  it('should not call onTick immediately', () => {
    mountTimerTestComponent('World', TEST_PERIOD, onTick);

    expect(onTick).not.to.have.been.called;
  });

  it('should call onTick right after period ended', () => {
    mountTimerTestComponent('World', TEST_PERIOD, onTick);
    clock.tick(TEST_PERIOD + 1);

    expect(onTick).have.been.calledOnce;
  });

  it('should change ticking interval', () => {
    const testComponentWrapper = mountTimerTestComponent('World', TEST_PERIOD, onTick);
    testComponentWrapper.setProps({
      tickPeriod: TEST_PERIOD + TEST_PERIOD
    });

    clock.tick(TEST_PERIOD + 1);
    expect(onTick).not.to.have.been.called;

    clock.tick(TEST_PERIOD + 1);
    expect(onTick).have.been.calledOnce;
  });

  it('should change ticking interval even when period was updated with delay', () => {
    const testComponentWrapper = mountTimerTestComponent('World', TEST_PERIOD, onTick);

    clock.tick(TEST_PERIOD + 1);
    expect(onTick).have.been.calledOnce;

    testComponentWrapper.setProps({
      tickPeriod: TEST_PERIOD + TEST_PERIOD
    });

    clock.tick(TEST_PERIOD + 1);
    expect(onTick).have.been.calledOnce;

    clock.tick(TEST_PERIOD + 1);
    expect(onTick).have.been.calledTwice;
  });

  function mountTimerTestComponent(label, period, onTickCallback) {
    return mount(
      <WidgetLoaderTestComponent
        label={label}
        tickPeriod={period}
        onTick={onTickCallback}
      />
    );
  }
});
