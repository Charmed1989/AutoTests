const { expect } = require('@playwright/test');
const { checkLinkVisibility } = require('../utils/visability');

class Search {
    constructor(page) {
      this.page = page;
         }
 
    async logout (user) {
      await this.page.waitForTimeout(1000); 
      await this.page.waitForSelector(`.top-toolbar__profile-username:has-text("${user}")`);
      await this.page.locator(`.top-toolbar__profile-username:has-text("${user}")`).nth(0).hover();
      await this.page.getByRole('link', { name: 'Logout' }).click();
    }
    async searchItem (randomNumber) {
      await this.page.waitForTimeout(500); 
      await this.page.getByRole('searchbox', { name: 'Search' }).click();
      await this.page.getByRole('searchbox', { name: 'Search' }).fill(`item_${randomNumber}`);
      await this.page.getByRole('button', { name: 'Go' }).click();
      await this.page.waitForTimeout(5000); 
      await this.page.getByRole('searchbox', { name: 'Search' }).click();
      await this.page.waitForTimeout(200); 
    }
  }
    async function searchResults(page, randomNumber) {
      await page.locator('.row > div:nth-child(3)').click();
      const onlineLink = page.locator('iframe[name="itemscope"]').contentFrame().getByRole('link', { name: `Online_item_${randomNumber}` });
      await checkLinkVisibility(onlineLink, true, `Online_item_${randomNumber}`);
      const offlineLink = page.locator('iframe[name="itemscope"]').contentFrame().getByRole('link', { name: `Offline_item_${randomNumber}` });
      await checkLinkVisibility(offlineLink, false, `Offline_item_${randomNumber}`);
    }
    module.exports = { Search, searchResults };
