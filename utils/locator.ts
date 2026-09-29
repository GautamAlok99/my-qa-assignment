

export const productLocators = {
    header: "//div[@data-test='secondary-header']",
    inventoryItem: '.inventory_item',
    itemName: '[data-test="inventory-item-name"]',
    itemPrice: '[data-test="inventory-item-price"]',
    sortDropdown: '[data-test="product-sort-container"]',
    activeOption: '[data-test="active-option"]',
    cartBadge: '[data-test="shopping-cart-badge"]',
    cartLink: '[data-test="shopping-cart-link"]',
};

export const checkoutLocators = {
    cartItem: '.cart_item',
    checkoutButton: '[data-test="checkout"]',
    firstNameInput: '[data-test="firstName"]',
    lastNameInput: '[data-test="lastName"]',
    postalCodeInput: '[data-test="postalCode"]',
    continueButton: '[data-test="continue"]',
    finishButton: '[data-test="finish"]',
    completeHeader: '[data-test="complete-header"]',
};
