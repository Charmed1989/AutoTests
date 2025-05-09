const {username, password, csrf} = require('../utils/credentials');

const params = {
  loginUrl: 'https://kms-qa-08.lighthouse-cloud.com/kms/lh/login/post',
  layoutUrl: 'https://kms-qa-08.lighthouse-cloud.com/kms/CM/INTERNAL/LAYOUT',
  loginParams: {
    _csrf: csrf,
    username: username,
    password: password,
    locale: 'en',
    loginform: 'true',
    timezoneOffset: '180',
  },
  layoutParams: {
    item_id: '4',
  },
};

module.exports = {params};
