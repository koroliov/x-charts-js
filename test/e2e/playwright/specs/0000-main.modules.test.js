import { test, expect } from '@playwright/test';

test('general case', async ({ page }) => {
  await page.goto('/test/e2e/cases/0000-main/modules/');
  await expect(page).toHaveTitle(/0000-main\/modules/);
});
