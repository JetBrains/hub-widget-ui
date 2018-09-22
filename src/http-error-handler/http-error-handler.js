import {i18n} from 'hub-dashboard-addons/dist/localization';

function getDefaultMessage() {
  return i18n('Oops! Something went wrong...');
}

function getMessage(hubResponseError) {
  if (typeof hubResponseError === 'string') {
    return hubResponseError;
  }
  const responseErrorData = (hubResponseError || {}).data || hubResponseError || {};
  const message = responseErrorData.error_description ||
    responseErrorData.error_developer_message;
  return message || getDefaultMessage();
}

export default {
  getMessage,
  getDefaultMessage
};
