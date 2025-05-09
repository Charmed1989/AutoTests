//@ts-check

const { test, expect } = require("@playwright/test");
const { loginPost, layoutGet } = require("../utils/login");
const {params} = require('../pages/params');

test('API test login', async ({ request }) => {
  const loginResponseText = await loginPost(request, params.loginUrl, params.loginParams);
  expect(loginResponseText).toContain('Choose a layout');
  const layoutResponseText = await layoutGet(request, params.layoutUrl, params.layoutParams);
  expect(layoutResponseText).toContain('Content Manager');
});

