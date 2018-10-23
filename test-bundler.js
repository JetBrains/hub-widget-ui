/* eslint-disable no-unused-expressions */

import 'core-js/es6';
import 'babel-polyfill';
import chai from 'chai';
import sinon from 'sinon';
import chaiEnzyme from 'chai-enzyme';
import spies from 'chai-spies';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import chaiAsPromised from 'chai-as-promised';
import chaiDOM from 'chai-dom';
import sinonChai from 'sinon-chai';

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

const testsContext = require.context('./src', true, /\.test\.js$/);
testsContext.keys().forEach(testsContext);
