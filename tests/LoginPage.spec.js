const { test } = require('@playwright/test');
const {username, password} = require('../utils/credentials');
const LoginPage = require('../pages/LoginPage');

test('login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const layout = "Content Manager";
  await loginPage.navigate();
  await loginPage.login(username, password);
  await loginPage.selectLayout(layout);
  await loginPage.verifyLoginSuccess(`https://${loginPage.server}/kms/CM/INTERNAL/LAYOUT?item_id=4`)
});
