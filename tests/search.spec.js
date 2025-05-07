//@ts-check

const { test } = require("@playwright/test");
const LoginPage = require('../pages/LoginPage');
const ItemCreate = require('../pages/ItemCreate');
const { checkLinkVisibility } = require('../utils/visability');

let username = 'marinak';
const password = 'Kms123!';
const server = 'kms-qa-08.lighthouse-cloud.com'; 
let layout = "Content Manager";
const randomNumber = Math.floor(Math.random() * 100000) + 1;
let user = "Marina Koltsova"


class Search {
    constructor(page) {
      this.page = page;
      this.loginPage = new LoginPage(page);
      this.itemCreate = new ItemCreate(page);
    }
 
    async logout (user) {
      await this.page.waitForSelector(`.top-toolbar__profile-username:has-text("${user}")`);
      await this.page.locator(".top-toolbar__profile-username:has-text('Marina Koltsova')").nth(0).hover();
      await this.page.waitForTimeout(500);
      await this.page.getByRole('link', { name: 'Logout' }).click();
    }
      
    async searchItem (randomNumber) {
      await this.page.waitForTimeout(1000); 
      await this.page.getByRole('searchbox', { name: 'Search' }).click();
      await this.page.getByRole('searchbox', { name: 'Search' }).fill(`item_${randomNumber}`);
      await this.page.getByRole('button', { name: 'Go' }).click();
      await this.page.waitForTimeout(5000); 
      await this.page.getByRole('searchbox', { name: 'Search' }).click();

    }
  }
    async function searchResults(page, randomNumber) {
      await page.locator('.row > div:nth-child(3)').click();
      const onlineLink = page.locator('iframe[name="itemscope"]').contentFrame().getByRole('link', { name: `Online_item_${randomNumber}` });
      await checkLinkVisibility(onlineLink, true, `Online_item_${randomNumber}`);
      const offlineLink = page.locator('iframe[name="itemscope"]').contentFrame().getByRole('link', { name: `Offline_item_${randomNumber}` });
      await checkLinkVisibility(offlineLink, false, `Offline_item_${randomNumber}`);
    }
  
        
    test('search', async ({ page }) => {
        
      const search = new Search(page);
      let status = "Online";
      let title = `${status}_item_${randomNumber}`;
      await search.loginPage.navigate();
      await search.loginPage.login(username, password);
      await search.loginPage.selectLayout(layout);
      await search.loginPage.verifyLoginSuccess(`https://${search.loginPage.server}/kms/CM/INTERNAL/LAYOUT?item_id=4`);
      await search.itemCreate.actionsFolder();
      await search.itemCreate.createNewItem(title);
      await search.itemCreate.changeStatus(status)
      await search.itemCreate.saveItem();
      await search.itemCreate.actionsFolder();
      status = "Offline"
      title = `${status}_item_${randomNumber}`;
      await search.itemCreate.createNewItem(title);
      await search.itemCreate.saveItem();
      await search.logout(user);
      await search.loginPage.navigate();
      username = "csrM";
      await search.loginPage.login(username, password);
      layout = "CSR";
      await search.loginPage.selectLayout(layout);
      await search.searchItem(randomNumber);
      await searchResults(page, randomNumber);
     
    }); 
    module.exports = Search