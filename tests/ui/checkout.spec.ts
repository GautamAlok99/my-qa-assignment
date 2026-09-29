import { test, expect } from '@playwright/test';
import cartData from '../../test-data/products.json';
import usersData from '../../test-data/users.json';
import checkoutData from '../../test-data/checkout.json';
import { LoginPage } from '../../pages/LoginPage';
import { productLocators, checkoutLocators } from '../../Utils/locator';
import { urls } from '../../Utils/urls';
import ProductsPage from '../../pages/ProductsPage';

test('complete full checkout flow', async ({ page }) => {
    //Navigate and Login using LoginPage
    const loginPage = new LoginPage(page);
    await loginPage.login(usersData.standardUser.username, usersData.standardUser.password);
    await expect(page).toHaveURL(urls.inventoryPage);

    //Add items to cart from test-data/products.json
    const productsPage = new ProductsPage(page);
    await productsPage.addItemsToCart(cartData.products);

    //Verify cart badge displays the correct item count
    const cartBadge = page.locator(productLocators.cartBadge);
    await expect(cartBadge).toHaveText(`${cartData.products.length}`);

    //Click the shopping cart link
    await page.getByRole('button', { name: `Cart, ${cartData.products.length}` }).click();
    await expect(page).toHaveURL(urls.cartPage);

    //Verify items in cart and click Checkout
    for (const productName of cartData.products) {
        await expect(page.locator(checkoutLocators.cartItem).filter({ hasText: productName })).toBeVisible();
    }
    await page.getByRole('button', { name: 'Checkout' }).click();
    await expect(page).toHaveURL(urls.checkoutStepOne);

    //Fill checkout information and continue
    await page.getByRole('textbox', { name: 'First Name' }).fill(checkoutData.firstName);
    await page.getByRole('textbox', { name: 'Last Name' }).fill(checkoutData.lastName);
    await page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill(checkoutData.postalCode);
    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page).toHaveURL(urls.checkoutStepTwo);

    //Verify overview and click Finish
    await expect(page.getByRole('button', { name: 'Finish' })).toBeVisible();
    await page.getByRole('button', { name: 'Finish' }).click();
    await expect(page).toHaveURL(urls.checkoutComplete);

    //Verify the "Thank you for your order!" message
    const completeHeader = page.locator(checkoutLocators.completeHeader);
    await expect(completeHeader).toBeVisible();
    await expect(completeHeader).toHaveText('Thank you for your order!');
    await page.close();
});
