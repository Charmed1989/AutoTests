const { test, expect } = require('@playwright/test');

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
  }

  async selectLayout() {
    await this.page.getByRole('button', { name: 'Manager' }).click();
    await this.page.getByRole('listbox').getByRole('option', { name: 'Content Manager' }).click();
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async verifyLoginSuccess(expectedUrl) {
    await this.page.waitForLoadState('load');
    const currentUrl = this.page.url();
    expect(currentUrl).toBe(expectedUrl);
  }
}

test('login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.navigate();
  await loginPage.login('marinak', 'Kms123!');
  await loginPage.selectLayout();
  await loginPage.verifyLoginSuccess(`https://${loginPage.server}/kms/CM/INTERNAL/LAYOUT?item_id=4`)
});
