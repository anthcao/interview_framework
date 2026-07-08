### Bolt T-Shirt cannot be added to cart

Summary:
The Bolt T-Shirt product cannot be added to the cart.

Environment:
- Browser: Chrome
- Page: Products / Cart
- User: swift_tester

Preconditions:
- User is logged in successfully.
- User is on the Products page.

Steps to Reproduce:
1. Navigate to the Products page.
2. Locate the Bolt T-Shirt product.
3. Click "Add to Cart".
4. Check the cart badge or cart page.

Expected Result:
The Bolt T-Shirt should be added to the cart, and the cart badge/count should update accordingly.

Actual Result:
The Bolt T-Shirt is not added to the cart.

### Cart navigation is not underlined and UI shifts

Summary:
The Cart navigation item does not show the expected underline styling, and the UI shifts during interaction.

Environment:
- Browser: Chrome
- Page: All pages
- User: swift_tester

Preconditions:
- User is logged in successfully.
- User is on any page

Steps to Reproduce:
1. Login as a valid user.
2. Observe the header navigation.
3. Hover over or click the Cart navigation item.
4. Observe the styling and page layout.

Expected Result:
The Cart icon should now be underlined, and the banner UI should remain stable without shifts.

Actual Result:
The Cart navigation item is not underlined as expected, and the banner UI shifts slightly to the right.

### Checkout first name input should be red when invalid

Summary:
The checkout First Name field does not show the expected red error when given invalid input.

Environment:
- Browser: Chrome
- Page: Checkout
- User: swift_tester

Preconditions:
- User is logged in successfully.
- User has at least one item in the cart.
- User is on the Checkout page.

Steps to Reproduce:
1. Navigate to the Checkout page.
2. Leave the First Name field empty or enter invalid whitespace.
3. Click "Continue".
4. Observe the First Name field and validation message.

Expected Result:
The First Name input should be highlighted in red and display a validation error.

Actual Result:
The Last Name error message appears, and does not show the expected red invalid-state styling rather a green styling is applied to the textbox.

### Checkout accepts non-alphanumeric postal code input

Summary:
The checkout form accepts non-alphanumeric characters

Environment:
- Browser: Chrome
- Page: Checkout
- User: swift_tester

Preconditions:
- User is logged in successfully.
- User has at least one item in the cart.
- User is on the Checkout page.

Steps to Reproduce:
1. Navigate to the Checkout page.
3. Enter special characters in all three fields, such as "!!!@@@".
4. Click "Continue".

Expected Result:
The checkout form should reject non-alphanumeric postal code input and display a validation error.

Actual Result:
The checkout form accepts the invalid input and allows the user to proceed.

### Login error message or styling is incorrect

Summary:
When giving a incorrect or empty password the incorrect user name error appears

Environment:
- Browser: Chrome
- Page: Login
- User: Any

Preconditions:
- User is on the Login page.

Steps to Reproduce:
1. Navigate to the Login page.
2. Enter username and either a empty or invalid password
3. Click "Login".
4. Observe the error message.

Expected Result:
Password error message should appear on the login page

Actual Result:
Username error message should appear on the login page


### Logout button is not shown as clickable

Summary:
The Logout button does not visually indicate that it is clickable.

Environment:
- Browser: Chrome
- Page: Header / Navigation
- User: swift_tester

Preconditions:
- User is logged in successfully.
- User is on the Products page.

Steps to Reproduce:
1. Login with a valid user.
2. Observe the Logout button in the header.
3. Hover over the Logout button.

Expected Result:
The Logout button should visually indicate clickability, such as showing a pointer cursor, hover state, underline, or color change.

Actual Result:
The Logout button does not clearly appear clickable.

### Sorting price high to low fails

Summary:
Sorting products by price from high to low does not correctly order the product list.

Environment:
- Browser: Chrome
- Page: Products
- User: swift_tester

Preconditions:
- User is logged in successfully.
- User is on the Products page.

Steps to Reproduce:
1. Navigate to the Products page.
2. Open the sort dropdown.
3. Select "Price: High to Low".
4. Observe the product order.

Expected Result:
Products should be sorted from the highest price to the lowest price.

Actual Result:
The product list is not correctly sorted from high to low.