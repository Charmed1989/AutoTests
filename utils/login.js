const { expect } = require("@playwright/test");

async function loginPost(request, url, params) {
  const response = await request.post(url, { params });
  expect(response.ok()).toBeTruthy();
  return response.text();
}

async function layoutGet(request, url, params) {
  const response = await request.get(url, { params });
  expect(response.ok()).toBeTruthy();
  return response.text();
}
module.exports = { loginPost, layoutGet };
