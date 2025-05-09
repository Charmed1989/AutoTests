//@ts-check
const { test } = require("@playwright/test");
const LoginPage = require('../pages/LoginPage');
const ItemCreate = require('../pages/ItemCreate');
const {password} = require('../utils/credentials');
const { Search, searchResults } = require('../pages/SearchPage');
const { checkLinkVisibility } = require('../utils/visability');
const { getExpectedColor } = require('../utils/colorUtils');

    test('search', async ({ page }) => {
      const loginPage = new LoginPage(page);
      const itemCreate = new ItemCreate(page);
      const search = new Search(page);  
      let status = "Online";
      const randomNumber = Math.floor(Math.random() * 100000) + 1;
      let title = `${status}_item_${randomNumber}`;
      let layout = "Content Manager";
      let user = "Marina Koltsova";
      let username = "marinak";
      await loginPage.navigate();
      await loginPage.login(username, password);
      await loginPage.selectLayout(layout);
      await itemCreate.actionsFolder();
      await itemCreate.createNewItem(title);
      await itemCreate.changeStatus(status)
      await itemCreate.saveItem();
      await itemCreate.actionsFolder();
      status = "Offline"
      title = `${status}_item_${randomNumber}`;
      await itemCreate.createNewItem(title);
      await itemCreate.saveItem();
      await search.logout(user);
      await loginPage.navigate();
      username = "csrM";
      await loginPage.login(username, password);
      layout = "CSR";
      await loginPage.selectLayout(layout);
      await search.searchItem(randomNumber);
      await searchResults(page, randomNumber);
    }); 
