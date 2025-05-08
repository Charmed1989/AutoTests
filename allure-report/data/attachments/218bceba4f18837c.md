# Test info

- Name: search
- Location: C:\Users\admin\Desktop\playwrightinstallation\tests\search.spec.js:10:5

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('iframe[name="itemscope"]').contentFrame().getByRole('listbox', { name: 'Change status to' }).getByRole('img')
    - locator resolved to <svg data-v-de790ecc="" data-v-43d179f3="" class="iw-icon --rtl-disabled dropdown-arrow">…</svg>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="select" data-v-a31a33ae="">…</div> intercepts pointer events
  - retrying click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <li data-id="SaveAndRelocate" title="Save and Relocate" class="action-bar__button" id="kms-action-bar-button-SaveAndRelocate">…</li> from <ul role="group" class="action-bar">…</ul> subtree intercepts pointer events
  - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="select" data-v-a31a33ae="">…</div> intercepts pointer events
  2 × retrying click action
      - waiting 100ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <li tabindex="0">…</li> from <div class="outer-layout-north">…</div> subtree intercepts pointer events
  6 × retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <li data-id="SaveAndRelocate" title="Save and Relocate" class="action-bar__button" id="kms-action-bar-button-SaveAndRelocate">…</li> from <ul role="group" class="action-bar">…</ul> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="select" data-v-a31a33ae="">…</div> intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <li tabindex="0">…</li> from <div class="outer-layout-north">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
      - waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <li tabindex="0">…</li> from <div class="outer-layout-north">…</div> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms

    at ItemCreate.changeStatus (C:\Users\admin\Desktop\playwrightinstallation\pages\ItemCreate.js:32:86)
    at C:\Users\admin\Desktop\playwrightinstallation\tests\search.spec.js:26:24
```

# Test source

```ts
   1 | const { expect } = require("@playwright/test");
   2 | const { getExpectedColor } = require('../utils/colorUtils');
   3 |
   4 | class ItemCreate {
   5 |   constructor(page) {
   6 |     this.page = page;
   7 |   }
   8 |   async actionsFolder() {
   9 |     await this.page.locator("(//span[normalize-space()='Folder 1'])[1]").hover();
  10 |     await this.page.waitForTimeout(500);
  11 |     await this.page.locator("(//span[normalize-space()='Folder 1'])[1]").click({
  12 |       button: 'right',
  13 |       delay: 200
  14 |     });
  15 |   }
  16 |
  17 |   async createNewItem(title) {
  18 |     await this.page.locator("//a[@href='#create']").click();
  19 |     await this.page.getByRole('textbox', { name: 'Search' }).click();
  20 |     await this.page.getByRole('textbox', { name: 'Search' }).fill('gen');
  21 |     await this.page.waitForSelector(".item-create-dialog-list__item-title:has-text('General')");
  22 |     await this.page.locator(".item-create-dialog-list__item-title:has-text('General')").click();
  23 |     await this.page.getByRole('button', { name: 'Create item' }).click();
  24 |     const iframe = this.page.frameLocator('iframe[name="itemscope"]');
  25 |     await iframe.getByRole('heading', { name: 'New Item' }).click();
  26 |     await iframe.locator('input[name="inplace_value"]').fill(title);
  27 |     await this.page.keyboard.press('Enter');
  28 |   }
  29 |
  30 |   async changeStatus(status) {
  31 |     const iframe = this.page.frameLocator('iframe[name="itemscope"]');
> 32 |     await iframe.getByRole('listbox', { name: 'Change status to' }).getByRole('img').click();
     |                                                                                      ^ Error: locator.click: Target page, context or browser has been closed
  33 |     await iframe.locator('div').filter({ hasText: /^Offline$/ }).first().hover();
  34 |     await iframe.locator('div').filter({ hasText: /^Offline$/ }).first().click();
  35 |     await iframe.getByText('Offline').nth(0).click();
  36 |     await iframe.getByText(status, { exact: true }).click();
  37 |   }
  38 |
  39 |   async saveItem() {
  40 |     await this.page.waitForTimeout(5000);
  41 |     await this.page.locator("#kms-action-bar-button-Save").nth(0).filter({ visible: true }).click();
  42 |     await this.page.waitForTimeout(3000); 
  43 |   
  44 |   }
  45 |
  46 | async verifyColor(status) {
  47 |     const spanXPath = '//body//div[@id="outer-layout-wrapper"]//li//li[@class="dynatree-lastsib"]//button[1]//span[1]';
  48 |     await this.page.waitForSelector(spanXPath, { state: 'visible' });
  49 |     const titleElement = await this.page.locator(spanXPath);
  50 |     const expectedColor = getExpectedColor(status);
  51 |     const color = await titleElement.evaluate(el => window.getComputedStyle(el).color);
  52 |     expect(color).toBe(expectedColor);
  53 |   }
  54 | }
  55 | module.exports = ItemCreate;
  56 |
```