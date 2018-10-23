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
