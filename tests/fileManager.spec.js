//@ts-check

const { test, expect } = require("@playwright/test");
const LoginPage = require('../pages/LoginPage');
const ItemCreate = require('../pages/ItemCreate');
const { TIMEOUT } = require("dns");

let username = 'marinak';
const password = 'Kms123!';
const server = 'kms-qa-08.lighthouse-cloud.com'; 
let layout = "Content Manager";
const randomNumber = Math.floor(Math.random() * 100000) + 1;

class FileManager {
    constructor(page) {
      this.page = page;
      this.loginPage = new LoginPage(page);
      this.itemCreate = new ItemCreate(page);
    } 

    async addFileToFileManager (fileInput) {
        await this.page.locator('iframe[name="itemscope"]').contentFrame().getByRole('link', { name: 'General' }).click();
        await this.page.locator('iframe[name="itemscope"]').contentFrame().locator('#item-update-tab-1 div').filter({ hasText: 'File (external): View mode:' }).getByRole('button').click();
        await this.page.locator('.fm-main-view-container > .fm-footer-container > .--popupLayout > .fm-icon').click();
        await fileInput.setInputFiles('C:\\Users\\admin\\Pictures\\Acapulco.jpg');
        await this.page.getByRole('button', { name: 'Select file' }).click();
        await this.page.waitForTimeout(2000);
    } 

    async checkFileAttached() {
        const frame = this.page.locator('iframe[name="itemscope"]').contentFrame();
        const image = frame.getByRole('img', { name: 'Click to enlarge' });
    
        if (await image.count() > 0) { 
            await expect(image).toBeVisible();
        } else {
            console.log('Element not found');
        }
    }
        }
test('fileManager', async ({ page }) => {
      const fileManager = new FileManager(page);
      let status = "Online";
      let title = `${status}_item_${randomNumber}`;
      const fileInput = page.locator('input[type="file"]');
      await fileManager.loginPage.navigate();
      await fileManager.loginPage.login(username, password);
      await fileManager.loginPage.selectLayout(layout);
      await fileManager.loginPage.verifyLoginSuccess(`https://${fileManager.loginPage.server}/kms/CM/INTERNAL/LAYOUT?item_id=4`);
      await fileManager.itemCreate.actionsFolder();
      await fileManager.itemCreate.createNewItem(title);
      await fileManager.itemCreate.changeStatus(status)
      await fileManager.addFileToFileManager(fileInput);
      await fileManager.itemCreate.saveItem();
      await fileManager.checkFileAttached();
    });