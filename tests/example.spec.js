const { test, expect } = require('@playwright/test');

test('login screen', async ({ page }) => {
  await page.goto('https://sandbox.bimcollab.com/');

  // Expect login screen to show up.
  await expect(page.locator('#panelLogoLink')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  await expect(page.getByPlaceholder('Email address')).toBeVisible();
  await expect(page.getByPlaceholder('Password')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Forgot your password?' })).toBeVisible();

});

test('login', async ({ page }) => {
  await page.goto('https://sandbox.bimcollab.com/');
await page.getByPlaceholder('Email address').click();
await page.getByPlaceholder('Email address').fill('');
await page.getByPlaceholder('Email address').press('Tab');
await page.getByPlaceholder('Password').fill('');
await page.getByPlaceholder('Password').press('Enter');
// Expects a valid login 
await expect(page.getByRole('img', { name: 'Q A' })).toBeVisible();
//verify role 
await expect(page.locator('#teamMemberRole').getByText('Editor')).toBeVisible();
});
test('issue management', async ({ page }) => {
  await page.goto('https://sandbox.bimcollab.com/');
  // Click the get started link.
await page.getByPlaceholder('Email address').click();
await page.getByPlaceholder('Email address').fill('');
await page.getByPlaceholder('Email address').press('Tab');
await page.getByPlaceholder('Password').fill('');
await page.getByPlaceholder('Password').press('Enter');
//manage an issue
await page.getByRole('link', { name: 'QA' }).click();
await page.getByRole('link', { name: 'Issues' }).click();
await page.waitForLoadState('networkidle');

await expect(page.getByRole('gridcell', { name: 'Active' })).toBeVisible();

await page.locator('#divSubmenuIcon').hover();
await page.locator('#HyperLinkSubMenuResolveAndClose').click();
await expect(page.getByRole('gridcell', { name: 'Closed' })).toBeVisible();

await page.locator('#divSubmenuIcon').hover();
await page.locator('#HyperLinkSubMenuReopen').click();
await expect(page.getByRole('gridcell', { name: 'Active' })).toBeVisible();
});
