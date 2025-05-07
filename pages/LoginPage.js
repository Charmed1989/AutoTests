const { expect } = require('@playwright/test');
class LoginPage {
    constructor(page) {
      this.page = page;
      this.server = 'kms-qa-08.lighthouse-cloud.com'; 
    }
  
    async navigate() {
      await this.page.goto(`https://${this.server}/`);
    }
  
    async login(username, password) {
      await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
      await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
      await this.page.getByRole('button', { name: 'Login' }).click();
      await this.page.waitForTimeout(2000);

    }
  
    async selectLayout(layout) {
      await this.page.getByRole('combobox').click({ force: true });
      await this.page.getByRole('listbox').getByRole('option', { name: layout }).click();
      await this.page.getByRole('button', { name: 'Login' }).click();
    }
  
    async verifyLoginSuccess(expectedUrl) {
      await this.page.waitForLoadState('load');
      const currentUrl = this.page.url();
      expect(currentUrl).toContain(expectedUrl);
    }
  }
  
  module.exports = LoginPage;
