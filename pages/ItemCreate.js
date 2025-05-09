const { expect } = require("@playwright/test");
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
    await this.page.getByRole('textbox', { name: 'Search' }).fill('gen');
    await this.page.waitForSelector(".item-create-dialog-list__item-title:has-text('General')");
    await this.page.locator(".item-create-dialog-list__item-title:has-text('General')").click();
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
    await this.page.waitForTimeout(500);
    const statusElement = await iframe.locator('li[role="option"] .item-label span', { hasText: status });
    await statusElement.click();
    await statusElement.press('Enter');
    await this.page.waitForTimeout(500);


  }
  async saveItem() {
    await this.page.waitForTimeout(2000);
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
module.exports = ItemCreate;
