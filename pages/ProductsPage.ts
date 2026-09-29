import { Page } from '@playwright/test';
import { productLocators } from '../Utils/locator';

export default class ProductsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async addItemsToCart(productNames: string[]) {
        for (const name of productNames) {
            const productCard = this.page.locator(productLocators.inventoryItem).filter({ hasText: name });
            await productCard.getByRole('button', { name: 'Add to cart' }).click();
        }
    }
}
