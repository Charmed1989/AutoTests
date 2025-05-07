//@ts-check

const { test, expect } = require("@playwright/test");
const LoginPage = require('../pages/LoginPage');
const { getExpectedColor } = require('../utils/colorUtils');

class ItemCreate {
  constructor(page) {
    this.page = page;
  }

  async actionsFolder() {
    await this.page.locator("(//span[normalize-space()='Folder 1'])[1]").hover();
    await this.page.waitForTimeout(500);
    await this.page.locator("(//span[normalize-space()='Folder 1'])[1]").click({
      button: 'right',
      delay: 200
    });
  }

  async createNewItem(title) {
    await this.page.locator("//a[@href='#create']").click();
    await this.page.getByRole('textbox', { name: 'Search' }).click();
    await this.page.getByRole('textbox', { name: 'Search' }).fill('gen');
    await this.page.waitForSelector("text=General");
    await this.page.getByText('General').nth(0).click();
    await this.page.getByRole('button', { name: 'Create item' }).click();
    const iframe = this.page.frameLocator('iframe[name="itemscope"]');
    await iframe.getByRole('heading', { name: 'New Item' }).click();
    await iframe.locator('input[name="inplace_value"]').fill(title);
    await this.page.keyboard.press('Enter');
  }

  async changeStatus(status) {
    const iframe = this.page.frameLocator('iframe[name="itemscope"]');
    await iframe.getByRole('listbox', { name: 'Change status to' }).getByRole('img').click();
    await iframe.locator('div').filter({ hasText: /^Offline$/ }).first().click();
    await iframe.getByText('Offline').nth(0).click();
    await iframe.getByText(status, { exact: true }).click();
    await this.page.waitForTimeout(2000);
  }

  async saveItem() {
    await this.page.locator("#kms-action-bar-button-Save").nth(0).filter({ visible: true }).click();
    await this.page.waitForTimeout(2000);
  }

  async verifyColor(status) {

    const spanXPath = '//body//div[@id="outer-layout-wrapper"]//li//li[@class="dynatree-lastsib"]//button[1]//span[1]';
    await this.page.waitForSelector(spanXPath, { state: 'visible' });
    const titleElement = await this.page.locator(spanXPath);
    const expectedColor = getExpectedColor(status);
    const color = await titleElement.evaluate(el => window.getComputedStyle(el).color);
    expect(color).toBe(expectedColor);
  }
}
test('test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const itemCreate = new ItemCreate(page);
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  const status = "Archive";
  let title = `${status}_item_${randomNumber}`;

  await loginPage.navigate();
  await loginPage.login('marinak', 'Kms123!');
  await loginPage.selectLayout();
  await loginPage.verifyLoginSuccess(`https://${loginPage.server}/kms/CM/INTERNAL/LAYOUT?item_id=4`);
  await itemCreate.actionsFolder();
  await itemCreate.createNewItem(title);
  await itemCreate.changeStatus(status);
  await itemCreate.saveItem();
  await itemCreate.verifyColor(status);

 });
module.exports = ItemCreate;
