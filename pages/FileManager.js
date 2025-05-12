const { expect } = require('@playwright/test');

class FileManager {
    
    constructor(page) {
        this.page = page;
           }

    async addFileToFileManager (fileInput) {
        await this.page.locator('iframe[name="itemscope"]').contentFrame().getByRole('link', { name: 'General' }).click();
        await this.page.locator('iframe[name="itemscope"]').contentFrame().locator('#item-update-tab-1 div').filter({ hasText: 'File (external): View mode:' }).getByRole('button').click();
        await this.page.locator('.fm-main-view-container > .fm-footer-container > .--popupLayout > .fm-icon').click();
        await fileInput.setInputFiles('C:\\Users\\admin\\Pictures\\Acapulco.jpg');
        await this.page.getByRole('button', { name: 'Select file' }).click();
        await this.page.waitForTimeout(2000);
    } 

    async checkFileAttached(frame, image) {
        if (await image.count() > 0) { 
            await expect(image).toBeVisible();
        } else {
            console.log('Element not found');
        }
    }
}
module.exports = FileManager;
