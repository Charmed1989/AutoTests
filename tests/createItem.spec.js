//@ts-check

const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {

  page.setDefaultTimeout(60000);  

  await page.goto('https://kms-qa-08.lighthouse-cloud.com/kms/lh/login');

  await page.getByRole('textbox', { name: 'Username' }).fill('marinak');
  await page.getByRole('textbox', { name: 'Password' }).fill('Kms123!');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('listbox').getByRole('option', { name: 'Content Manager' }).click();
  await page.getByRole('button', { name: 'Login' }).click();

  await page.goto('https://kms-qa-08.lighthouse-cloud.com/kms/CM/INTERNAL/LAYOUT?item_id=4&homePage=%2FCM%2FHOMEPAGE%2FVIEW%3FlayoutId%3D4%26isInfo%3Dyes&homePageEncoded=true');

  await page.getByRole('button', { name: 'New Item' }).click();
  await page.getByText('General').first().click();
  await page.getByRole('button', { name: 'Create item' }).click();



  


  await statusSelect.click();
   
  await page.getByRole('listitem', { name: 'Save', exact: true }).getByRole('img').click();


  await page.getByRole('link', { name: 'Folder 1', exact: true }).click();
  await page.getByRole('button', { name: 'Save', exact: true }).click();
});

   