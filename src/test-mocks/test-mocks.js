import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import spies from 'chai-spies';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const adapter = new Adapter();
Enzyme.configure({adapter});

chai.use(chaiEnzyme());
chai.use(spies);


export function getDashboardApiMock() {
  return {
    fetch: sandbox.spy(),
    fetchHub: sandbox.spy(),
    readConfig: sandbox.spy(),
    setLoadingAnimationEnabled: sandbox.spy(),
    storeConfig: sandbox.spy(),
    exitConfigMode: sandbox.spy(),
    setTitle: sandbox.spy()
  };
}

export function getRegisterWidgetApiMock() {
  return sandbox.spy();
}
