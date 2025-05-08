//@ts-check

const { test, expect } = require("@playwright/test");
const LoginPage = require('../pages/LoginPage');
const ItemCreate = require('../pages/ItemCreate');
const { getExpectedColor } = require('../utils/colorUtils');
const {username, password} = require('../utils/credentials');

test('test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const itemCreate = new ItemCreate(page);
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  const status = "Online"
  let title = `${status}_item_${randomNumber}`;

  await loginPage.navigate();
  await loginPage.login(username, password);
  await loginPage.selectLayout("Content Manager");
  await loginPage.verifyLoginSuccess(`https://${loginPage.server}/kms/CM/INTERNAL/LAYOUT?item_id=4`);
  await itemCreate.actionsFolder();
  await itemCreate.createNewItem(title);
  await itemCreate.changeStatus(status);
  await itemCreate.saveItem();
  await itemCreate.verifyColor(status);
 });
