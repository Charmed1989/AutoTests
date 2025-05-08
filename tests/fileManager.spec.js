//@ts-check

const { test, expect } = require("@playwright/test");
const LoginPage = require('../pages/LoginPage');
const ItemCreate = require('../pages/ItemCreate');
const FileManager = require('../pages/FileManager');

const {username, password} = require('../utils/credentials');

test('fileManager', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const itemCreate = new ItemCreate(page);  
    const fileManager = new FileManager(page);
      const randomNumber = Math.floor(Math.random() * 100000) + 1;
      let status = "Online";
      let title = `${status}_item_${randomNumber}`;
      const fileInput = page.locator('input[type="file"]');
      const frame = page.locator('iframe[name="itemscope"]').contentFrame();
      const image = frame.getByRole('img', { name: 'Click to enlarge' });
      await loginPage.navigate();
      await loginPage.login(username, password);
      await loginPage.selectLayout("Content Manager");
      await loginPage.verifyLoginSuccess(`https://${loginPage.server}/kms/CM/INTERNAL/LAYOUT?item_id=4`);
      await itemCreate.actionsFolder();
      await itemCreate.createNewItem(title);
      await itemCreate.changeStatus(status)
      await fileManager.addFileToFileManager(fileInput);
      await itemCreate.saveItem();
      await fileManager.checkFileAttached(frame, image);
    });