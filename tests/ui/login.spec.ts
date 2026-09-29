import { test, expect } from '@playwright/test';
import {LoginPage} from '../../pages/loginPage';
import {urls } from '../../utils/urls'
import usersData from '../../test-data/users.json';
import { loginLocators } from '../../utils/locator';

test('standard user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(usersData.standardUser.username, usersData.standardUser.password);
    await expect(page).toHaveURL(urls.inventoryPage);
    const landingPage = await page.locator(loginLocators.header).textContent();
    expect(landingPage).toContain('Products');
    await page.close();
});

test('locked_out_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(usersData.lockedOutUser.username, usersData.lockedOutUser.password);
    await expect(page).not.toHaveURL(urls.inventoryPage);
    await expect(page.getByRole('alert')).toBeVisible();
    await expect(page.getByRole('alert')).toHaveText(usersData.lockedOutUser.errorMessage);
    await page.close();
});