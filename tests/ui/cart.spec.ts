import { test, expect, Page } from '@playwright/test';
import cartData from '../../test-data/products.json';
import usersData from '../../test-data/users.json';
import { LoginPage } from '../../pages/LoginPage';
import { productLocators } from '../../Utils/locator';
import { urls } from '../../Utils/urls';
import ProductsPage from '../../pages/ProductsPage'

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(usersData.standardUser.username, usersData.standardUser.password);
    await expect(page).toHaveURL(urls.inventoryPage);
});

test.afterEach(async ({ page }) => {
    await page.close();
});

test('add to cart', async ({ page }) => {
    const landingPage = await page.locator(productLocators.header).textContent();
    expect(landingPage).toContain('Products');

    // Add two products to the cart from test-data/products.json
    const productsPage = new ProductsPage(page);
    await productsPage.addItemsToCart(cartData.products);

    // Verify the cart badge updates to 2
    const cartBadge = page.locator(productLocators.cartBadge);
    await expect(cartBadge).toBeVisible();
    await expect(cartBadge).toHaveText('2');
});

test('sort products by price low to high and verify lowest price first', async ({ page }) => {
    // Sort products by "Price (low to high)"
    await page.locator(productLocators.sortDropdown).selectOption({ label: 'Price (low to high)' });

    // Verify the active sort option updated
    await expect(page.locator(productLocators.activeOption)).toHaveText('Price (low to high)');

    // Extract all product prices from the page , convert them into numbers
    const priceTexts = await page.locator(productLocators.itemPrice).allTextContents();
    const prices = priceTexts.map(text => parseFloat(text.replace('$', '')));

    // Verify the first product displayed has the lowest price
    const lowestPrice = Math.min(...prices);
    expect(prices[0], 'Sorting failed : Products are not sorted by price low to high').toBe(lowestPrice);
});
