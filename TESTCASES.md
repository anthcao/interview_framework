# Test Cases Documentation

This document contains detailed written test cases for all automated tests in the interview_framework project. 


### Login Tests (src/specs/login.test.ts)

**Test Case 1: Verify login success for all accepted users**

Description:
Validate that all accepted users (standard users) can successfully log into the application and are redirected to the products page with their username displayed.

Preconditions:
- Application is accessible and loads the login page
- Test data contains multiple accepted users with valid credentials (standard_user, locked_user, problem_user, performance_glitch_user, etc.)
- Users are NOT locked out or in an error state

Steps:
1. For each accepted user in the user dataset:
   - Navigate to the login page
   - Enter the user's username in the username field
   - Enter the user's password in the password field
   - Click the Login button
   - Verify the current URL contains the products page URL
   - Verify the "logged in user" element is displayed
   - Verify the "logged in user" element displays the correct username

Expected Results:
- All accepted users should successfully log in
- Page redirects to the products page (URL contains /inventory.html)
- The username is displayed in the interface after login
- No error messages appear during or after login



**Test Case 2: Verify login failure with a locked user**

Description:
Validate that a user account that has been locked out cannot log in and receives an appropriate error message.

Preconditions:
- Application is accessible and loads the login page
- A user account exists that is marked as locked (vault_locked user)
- This user has valid credentials but a locked account status

Steps:
1. Navigate to the login page
2. Enter the locked user's username (vault_locked) in the username field
3. Enter the locked user's password in the password field
4. Click the Login button
5. Verify an error message element is displayed on the page
6. Verify the error message contains the text: "Epic sadface below — Sorry, this user has been locked out."

Expected Results:
- Login fails and user remains on the login page
- Error message is displayed with the exact text about user being locked out
- User is not redirected to the products page
- Session/authentication is not established



**Test Case 3: Verify login failure with an invalid user**

Description:
Validate that attempting to log in with a username and password combination that does not exist in the system fails with an appropriate error message.

Preconditions:
- Application is accessible and loads the login page
- Invalid user credentials exist in the test data that represent non-existent users

Steps:
1. Navigate to the login page
2. Enter the invalid user's username in the username field
3. Enter the invalid user's password in the password field
4. Click the Login button
5. Verify an error message element is displayed on the page
6. Verify the error message contains the text: "Epic sadface below — Username and password do not match any user in this service"

Expected Results:
- Login fails and user remains on the login page
- Error message is displayed with the exact text about username and password mismatch
- User is not redirected to the products page
- Session/authentication is not established



### Products Page Tests (src/specs/products.test.ts)

**Test Case 4: Verify the total count of items available**

Description:
Validate that the displayed product count in the page title matches the actual number of product cards on the products page.

Preconditions:
- User is logged in with valid credentials
- Products page is displayed with all products visible
- No filters or sorting has been applied

Steps:
1. Retrieve the product count from the page title/text element
2. Count the total number of product cards displayed on the page
3. Compare the text count with the card count

Expected Results:
- The product count in the title matches the number of product cards
- No products are hidden or overlapping



**Test Case 5: Verify the total count when filtered by each item category**

Description:
Validate that the product count displayed in the page title accurately reflects the number of product cards for each category filter applied to the products page.

Preconditions:
- User is logged in with valid credentials
- Products page is displayed with category filters available
- No custom filters or sorting currently applied

Steps:
1. Dynamically retrieve all available product categories from the page
2. For each category:
   - Apply the category filter
   - Retrieve the product count from the page title/text element
   - Count the total number of product cards displayed
   - Verify the counts match
3. Repeat for all available categories

Expected Results:
- For each category filter applied, the product count in the title matches the number of displayed product cards
- Filtered Expected Resultss show only products from the selected category
- No products from other categories appear in the filtered view



**Test Case 6: Verify sorting products by name from A to Z**

Description:
Validate that products are correctly sorted alphabetically in ascending order (A to Z) when the name ascending sort option is selected.

Preconditions:
- User is logged in with valid credentials
- Products page is displayed with sorting functionality
- No custom filters or sorting currently applied
- All products have names displayed

Steps:
1. Select "Sort by Name (A to Z)" from the sorting dropdown
2. Retrieve the list of displayed product names from the page
3. Create a sorted copy of the product names (alphabetical ascending)
4. Compare the displayed order with the expected sorted order

Expected Results:
- Products are displayed in alphabetical order from A to Z
- Order of both lists are the same
- First product name comes first alphabetically
- Last product name comes last alphabetically



**Test Case 7: Verify sorting products by name from Z to A**

Description:
Validate that products are correctly sorted alphabetically in descending order (Z to A) when the name descending sort option is selected.

Preconditions:
- User is logged in with valid credentials
- Products page is displayed with sorting functionality
- No custom filters or sorting currently applied
- All products have names displayed

Steps:
1. Select "Sort by Name (Z to A)" from the sorting dropdown
2. Retrieve the list of displayed product names from the page
3. Create a sorted copy of the product names (alphabetical descending)
4. Compare the displayed order with the expected sorted order

Expected Results:
- Products are displayed in alphabetical order from Z to A
- Order of both lists are the same
- First product name comes last alphabetically
- Last product name comes first alphabetically



**Test Case 8: Verify sorting products by price from low to high**

Description:
Validate that products are correctly sorted by price in ascending order (low to high) when the price ascending sort option is selected.

Preconditions:
- User is logged in with valid credentials
- Products page is displayed with sorting functionality
- No custom filters or sorting currently applied
- All products have price information displayed

Steps:
1. Select "Sort by Price (Low to High)" from the sorting dropdown
2. Retrieve the list of displayed product prices from the page
3. Create a sorted copy of the product prices (numerical ascending)
4. Compare the displayed order with the expected sorted order

Expected Results:
- Products are displayed in price order from lowest to highest
- Order of both lists are the same
- First product has the lowest price
- Last product has the highest price



**Test Case 9: Verify sorting products by price from high to low (SKIPPED - Known Bug)**

Description:
Validate that products are correctly sorted by price in descending order (high to low) when the price descending sort option is selected.

Preconditions:
- User is logged in with valid credentials
- Products page is displayed with sorting functionality
- No custom filters or sorting currently applied
- All products have price information displayed

Steps:
1. Select "Sort by Price (High to Low)" from the sorting dropdown
2. Retrieve the list of displayed product prices from the page
3. Create a sorted copy of the product prices (numerical descending)
4. Compare the displayed order with the expected sorted order

Expected Results:
- Products should be displayed in price order from highest to lowest
- Order of both lists are the same
- First product should have the highest price
- Last product should have the lowest price



### Cart Page Tests (src/specs/cart.test.ts)

**Test Case 10: Verify initial empty cart state**

Description:
Validate that a new user's cart is empty upon first visit and displays appropriate empty state messaging.

Preconditions:
- User is logged in with valid credentials (swift_tester user)
- Cart is initially empty
- Products are available for selection

Steps:
1. Click the cart button to navigate to the cart page
2. Verify the cart page is displayed
3. Verify the empty cart title element is displayed
4. Verify the empty cart title contains the text: "Your cart is empty"
6. Verify the empty cart message contains the text: "Head back to the store and add some items."

Expected Results:
- Cart page displays with empty state
- Empty cart title is shown: "Your cart is empty"
- Empty cart message is shown: "Head back to the store and add some items."
- No product items are displayed in the cart
- Continue shopping button is available



**Test Case 11: Verify continue shopping returns to products page**

Description:
Validate that clicking the "Continue Shopping" button on an empty cart navigates the user back to the products page.

Preconditions:
- User is logged in with valid credentials (swift_tester user)
- Cart is initially empty
- Products are available for selection

Steps:
1. Click the cart button to navigate to the cart page
2. Verify the cart page is displayed with empty state
3. Verify the "Continue Shopping" button is displayed with correct text
4. Click the "Continue Shopping" button
5. Verify the current URL contains the products page URL

Expected Results:
- User is navigated back to the products page
- Products page is displayed with all products visible
- URL contains the products page identifier
- Cart is still empty (no items were added)



**Test Case 12: Verify multiple items can be added to cart**

Description:
Validate that a user can add multiple different products with various quantities to their cart, and the cart reflects the correct item count.

Preconditions:
- User is logged in with valid credentials (swift_tester user)
- Cart is initially empty
- Products are available for selection

Steps:
1. Add 3 units of product at index 0 (Automation Handbook) to cart
2. Add 1 unit of product at index 2 (Debug Socks) to cart
3. Add 2 units of product at index 3 (Lab Notebook) to cart
4. Verify the cart badge count displays 6
5. Click the cart button to navigate to the cart page
6. Verify the current URL contains the cart page URL
7. Verify the cart page is displayed
8. Retrieve the item count from the cart title
9. Calculate the total page items
10. Verify both counts equal 6

Expected Results:
- All items are successfully added to the cart
- Cart badge displays the correct total quantity (6 items)
- Cart page shows all three products
- Cart title item count is 6
- Cart page item count total is 6
- All quantities are accurately reflected in the cart



**Test Case 13: Verify cart items quantity can be increased and decreased**

Description:
Validate that users can modify the quantity of items in their cart by increasing and decreasing quantities, and that items are removed when quantity reaches zero.

Preconditions:
- User is logged in with valid credentials
- Cart contains items
- User is on the cart page

Steps:
1. Increase quantity of first item (Sauce Labs Backpack) by 1 
2. Increase quantity of second item (Debug Socks) by 1 
3. Increase quantity of third item (QA Sticker Pack) by 2
4. Verify new total is 10 items
5. Verify all product names still appear in cart
6. Decrease quantity of first item (Sauce Labs Backpack) by 1 
7. Decrease quantity of second item (Debug Socks) by 2 removing it
8. Verify cart total is now 7 items
9. Verify "Sauce Labs Backpack" is still in cart
10. Verify "Debug Socks" is NO LONGER in cart
11. Verify "QA Sticker Pack" is still in cart

Expected Results:
- Item quantities increase/decrease as expected
- When quantity reaches zero, the item is removed from the cart
- Cart keeps all remaining items after removals
- Cart totals update correctly after each quantity change
- Product names display correctly before and after modifications


**Test Case 14: Verify per item total prices updates when quantity changes**

Description:
Validate that the total price for each individual item in the cart is correctly calculated based on unit price and quantity, and updates when quantities change.

Preconditions:
- User is logged in with valid credentials
- Cart contains items
- User is on the cart page

Steps:
1. Calculate expected item totals (quantity × unit price for each item)
2. Retrieve actual item totals displayed on the page
3. Verify calculated totals match displayed totals
4. Increase quantity of first item (Automation Handbook) by 1
5. Increase quantity of second item (Debug Socks) by 2
6. Decrease quantity of third item (QA Sticker Pack) by 1
7. Recalculate expected item totals with new quantities
8. Retrieve updated actual item totals displayed on the page
9. Verify new calculated totals match updated displayed totals

Expected Results:
- Initial item totals are correctly calculated and displayed
- After quantity changes, item totals are recalculated correctly
- All currency values are properly formatted with two decimal places


**Test Case 15: Verify cart subtotal, tax, and total pricing calculation**

Description:
Validate that cart subtotal, tax, and total prices are correctly calculated based on item totals and tax rate, with proper decimal rounding.

Preconditions:
- User is logged in with valid credentials
- Cart contains items
- User is on the cart page

Steps:
1. Calculate expected subtotal (sum of all item totals)
2. Calculate expected tax (subtotal × tax rate, typically 8%)
3. Calculate expected total (subtotal + tax)
4. Retrieve actual subtotal from the page
5. Retrieve actual tax from the page
6. Retrieve actual total from the page
7. Compare all three values

Expected Results:
- All currency values are properly formatted with two decimal places
- Rounding is applied correctly when dealing with cents
- All displayed amounts match calculated amounts


### Checkout Page Tests (src/specs/checkout.test.ts)

**Test Case 16: Verify user can complete checkout flow**

Description:
Validate that a user can proceed through the complete checkout flow by entering shipping information, reviewing the order summary, and completing the purchase, Expected Resultsing in an order confirmation page.

Preconditions:
- User is logged in with valid credentials
- Cart contains itemss
- User is on the checkout page with the checkout form displayed

Steps:
1. Verify checkout page is displayed with checkout form visible
2. Enter shipping information
3. Click the Continue button
4. Verify order summary page is displayed
5. Verify shipping info is displayed
6. Verify subtotal is displayed on order summary
7. Verify tax is displayed on order summary
8. Verify total is displayed on order summary
9. Verify finish button is displayed
10. Click the finish button
11. Verify order confirmation page is displayed
12. Verify confirmation title displays: "Order Placed!"
13. Verify confirmation message displays: "Thank you for your purchase. Your order has been successfully submitted."
14. Verify continue shopping button is displayed
15. Click continue shopping button
16. Verify user is redirected to products page

Expected Results:
- User successfully completes checkout with valid shipping information
- Order summary correctly displays entered shipping information
- Order summary displays pricing details (subtotal, tax, total)
- Order confirmation page displays after finishing checkout
- Confirmation messages are displayed with correct text
- User is redirected back to products page after purchase completion
- Order placement is successful



**Test Case 17: Verify order summary displays correct item names and quantities**

Description:
Validate that the order summary page displays the correct product names and quantities for all items in the order.

Preconditions:
- User is logged in with valid credentials
- Cart contains itemss
- User is on the checkout page with checkout form displayed

Steps:
1. Verify checkout page is displayed
2. Enter shipping information
3. Click the Continue button
4. Verify order summary is displayed
5. Retrieve all product names displayed in the order summary
6. Retrieve all product quantities displayed in the order summary
7. Verify each expected product name appears in the summary
8. Verify quantities match expected values in the same order

Expected Results:
- All product names are correctly displayed in the order summary
- All product quantities are correctly displayed  in the order summary
- No items are missing from the summary
- No extra items appear in the summary



**Test Case 18: Verify invalid shipping information cannot checkout**

Description:
Validate that the checkout form requires all fields and prevents checkout with empty or invalid shipping information, displaying appropriate error messages.

Preconditions:
- User is logged in with valid credentials
- Cart contains items
- User is on the checkout page with checkout form displayed

Steps:
1. Verify checkout page is displayed with forms visible
2. Leave all shipping information fields empty
3. Click the Continue button
4. Verify first name error element is displayed
5. Verify last name error element is displayed
6. Verify postal code error element is displayed
7. Verify initial checkout page is still displayed
9. Verify order summary is NOT displayed

Expected Results:
- Error messages are displayed for all required fields
- Order summary does not appear
- User remains on the checkout page
- No order is placed
