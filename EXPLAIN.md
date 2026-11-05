# CampusEats — M1 React Code Explanation

## 1. Project Overview

CampusEats is a React-based campus food ordering application developed for BICS 3301 – Cross-Platform Software Development. It is designed to help students browse available food vendors, explore menus, customise their food and drink preferences, place orders, and view their order history.

The application allows users to:

- Browse available campus food vendors.
- View menu items, descriptions, categories, prices, and availability.
- Add food and drinks to a shopping cart.
- Increase, decrease, or remove cart items.
- Customise spice levels for eligible food items.
- Select Hot or Iced options for drinks.
- Complete checkout by entering customer details and pickup information.
- View previously placed orders.
- Keep cart and order information after refreshing the browser.

The application is developed using React, JavaScript, Vite, React Router, Custom Hooks, Context API, and browser localStorage.

## 2. Application Entry Point and Routing

### `src/main.jsx`

This file is the entry point of the React application. It imports the application component and renders it into the root HTML element using React's `createRoot` API. It also wraps the application with React's `StrictMode`.

### `src/App.jsx`

This file configures the application's navigation using React Router. It uses `BrowserRouter`, `Routes`, and `Route` to define the different pages.

The application includes the following routes:

- `/` — Home page displaying the available vendors.
- `/vendor/:id` — Displays the selected vendor and its menu.
- `/cart` — Displays cart items and the checkout form.
- `/orders` — Displays the user's order history.
- `*` — Displays the Not Found page for unknown routes.

The `CartProvider` wraps the application routes so that cart and order information can be shared across different components.

### `src/components/Layout.jsx`

This component provides the shared layout for the application. It displays the `Header` at the top, the `Footer` at the bottom, and uses React Router's `Outlet` component to render the page that matches the current route.

## 3. Custom Hooks

Custom Hooks separate reusable logic from the user interface. This makes the application easier to organise, maintain, and reuse.

### `src/hooks/useLocalStorage.js`

This custom Hook manages data stored in the browser's localStorage.

It:

- Retrieves previously saved data from localStorage.
- Converts saved JSON data into JavaScript values.
- Updates localStorage when the state changes.
- Handles errors when reading or saving data.

In CampusEats, this Hook is used to persist cart and order information. This allows the information to remain available after refreshing the browser.

### `src/hooks/useVendors.js`

This Hook retrieves vendor information from `/api/vendors.json` using the Fetch API.

It manages:

- Vendor data retrieved from the JSON file.
- Loading state while retrieving data.
- Error state if the request fails.
- A reload function to retry loading vendor data.

It also uses `AbortController` to cancel an outdated request when necessary.

### `src/hooks/useCart.js`

This Hook provides access to the cart context using React's `useContext` Hook.

It allows components to access shared cart and order information without passing the same props through multiple component levels.

It also checks whether the Hook is being used inside a `CartProvider` and throws an error if the provider is missing.

## 4. Cart Context and Order Management

### `src/context/cart-context.js`

This file creates the React Context using `createContext(null)`.

The context allows cart and order information to be shared between different components without manually passing props through every level of the component tree.

### `src/context/CartProvider.jsx`

This component acts as the central provider for cart and order management.

It manages the following functions:

- `addToCart()` — Adds a menu item to the cart or increases its quantity if the same item with identical options already exists.
- `changeQty()` — Increases or decreases the quantity of a cart item.
- `removeFromCart()` — Removes an item from the cart.
- `placeOrder()` — Creates a new order, saves it to order history, and clears the cart.

It also calculates:

- The total number of items in the cart.
- The total price of all items in the cart.

Cart and order information are persisted using the `useLocalStorage` custom Hook. This allows the information to remain available after refreshing the browser.

The cart uses item IDs and selected options to distinguish between different cart lines. Therefore, the same food item with different spice levels can be stored as separate items.

## 5. Own Shop: Hannah's Cafe

Hannah's Cafe is my own vendor in CampusEats. It is located at Wadi Budi, IIUM Gombak.

The shop contains 12 menu items organised into four categories:

| Category | Menu Items |
|---|---|
| Drinks | Teh Tarik, Iced Milo, Nescafe, Fresh Orange Juice |
| Main Course | Nasi Lemak, Nasi Goreng Kampung, Mee Goreng, Chicken Chop |
| Snacks | French Fries, Chicken Nuggets |
| Desserts | Kek Batik, Chocolate Cake |

Each menu item contains information such as its name, description, price, category, and availability.

The vendor and menu information are stored in `public/api/vendors.json` and retrieved dynamically by the application.

Hannah's Cafe is displayed as the first vendor in the vendor list.

## 6. Pages and Components

### `src/pages/HomePage.jsx`

This page displays the available food vendors using the `VendorCard` component.

It retrieves vendor information through the `useVendors` custom Hook and handles the loading and error states while the data is being fetched.

### `src/pages/VendorPage.jsx`

This page displays the menu of a selected vendor.

It uses React Router's `useParams()` Hook to retrieve the vendor ID from the URL.

The page searches the vendor data to identify the selected vendor and displays its menu using `MenuList`.

If the vendor data is still loading or cannot be retrieved, the page displays the appropriate status message.

### `src/pages/CartPage.jsx`

This page displays the items currently added to the shopping cart.

Users can review their selected items, change quantities, remove items, and view the calculated total price.

It also displays the checkout form when the cart contains items.

### `src/pages/OrdersPage.jsx`

This page displays the user's previous orders.

Order information is retrieved from the cart context. It displays relevant information such as customer details, pickup information, ordered items, selected options, and total price.

### `src/pages/NotFoundPage.jsx`

This page displays a 404 - Page Not Found message when users access an unknown route.

It also provides a link that allows users to return to the Home page.

### `src/components/VendorCard.jsx`

This component displays individual vendor information, including the vendor name, location, operating hours, and open or closed status.

It uses React Router's `Link` component to navigate to the selected vendor's menu page.

### `src/components/MenuList.jsx`

This component displays menu items dynamically using React's `.map()` method.

It passes the menu item information and the `addToCart` function to individual `MenuItemCard` components through props.

### `src/components/MenuItemCard.jsx`

This component displays an individual menu item, including its name, description, price, and availability.

It also manages the selected food spice level or drink temperature before adding the item to the cart.

The `handleAdd()` function passes the selected item and its options to the cart through the `onAdd` prop.

### `src/components/OptionPicker.jsx`

This component provides the selection interface for my personal feature.

For eligible food items, customers can select:

- Not Spicy
- Mild
- Medium
- Hot

For drinks, customers can select:

- Hot
- Iced

Desserts and bakery items do not require a spice or temperature selection.

### `src/components/CartItem.jsx`

This component displays an individual cart item, including its name, selected options, price, quantity, and line total.

It provides controls for increasing or decreasing the quantity and removing an item from the cart.

### `src/components/CheckoutForm.jsx`

This component collects customer information, including name, mahallah, and pickup time.

It uses React's `useState` Hook to manage form values and validation errors.

The form validates the required customer information before allowing an order to be submitted. Validation messages are displayed when the input does not meet the requirements.

### `src/components/Header.jsx`

This component displays the main navigation links and the current cart item count.

The cart count is obtained from the shared cart context, allowing it to update when the cart changes.

### `src/components/Status.jsx`

This reusable component displays loading and error messages.

It helps provide consistent feedback when vendor information is being retrieved or when a request fails.

### `src/utils/spice.js`

This utility file contains helper functions and labels related to food and drink customisation.

It defines the available spice levels and drink temperature labels. It also identifies which items support customisation and provides a description of the selected options for display.

### `src/utils/lineKey.js`

This utility file generates a unique key for a cart line based on the menu item ID and its selected options.

This allows the application to distinguish between the same menu item with different spice levels or drink temperatures.

## 7. Personal Feature: Spice-Level Customisation and Drink Temperature Selection

My personal feature allows customers to customise their food and drink preferences before adding items to the cart.

For eligible food items, customers can select one of four spice levels: Not Spicy, Mild, Medium, or Hot. For drinks, customers can choose between Hot and Iced.

The feature is implemented through `OptionPicker.jsx` and the state managed by `MenuItemCard.jsx`.

When a customer clicks the Add to Cart button, the selected options are passed together with the menu item to the cart provider.

The `lineKey.js` utility helps identify each unique combination of menu item and selected options. If the same item is added with a different preference, it is treated as a separate cart line.

The selected preferences are also displayed in the cart and order history. This allows customers to review their customised selections before and after checkout.

This feature makes the ordering process more flexible by allowing customers to choose according to their individual food and drink preferences.

## 8. Data Persistence

CampusEats uses browser localStorage to save important application information.

The following information is persisted:

- Cart items.
- Order history.

The `useLocalStorage` custom Hook handles saving and retrieving this information.

As a result, cart contents and order history can remain available after refreshing the browser on the same device and browser profile.

The application currently uses local JSON data and browser localStorage. It does not use a server-side database or an online payment gateway.

## 9. Error Handling, Validation and Testing

### Vendor Data

The `useVendors` Hook manages loading and error states when retrieving vendor information.

If the request fails, the application displays an error message and provides a retry option.

### Checkout Validation

The `CheckoutForm` component validates customer information before submitting an order.

Invalid input displays appropriate error messages and prevents the order from being submitted.

### Routing

The application handles unknown routes through the `NotFoundPage` component.

The `VendorPage` also handles an invalid vendor ID by displaying an appropriate status message.

### Test Cases

The following test cases can be used to check the main functions of CampusEats.

| No. | Test Case | Expected Result |
|---|---|---|
| 1 | Open the home page | Vendor cards are displayed. |
| 2 | Select Hannah's Cafe | Hannah's Cafe menu is displayed. |
| 3 | Select a spice level | The selected spice preference is retained. |
| 4 | Select Hot or Iced for a drink | The selected drink temperature is retained. |
| 5 | Add an item to the cart | The item and selected options appear in the cart. |
| 6 | Add the same item with a different option | Different preferences appear as separate cart lines. |
| 7 | Increase or decrease quantity | Quantity and total price are updated. |
| 8 | Remove an item | The selected item is removed from the cart. |
| 9 | Submit invalid checkout details | Validation messages are displayed. |
| 10 | Submit valid checkout details | An order is created and displayed in Orders. |
| 11 | Refresh the browser | Saved cart and order information remain available. |
| 12 | Open an unknown route | The Not Found page is displayed. |

## 10. Conclusion

CampusEats demonstrates the use of React components, props, state management, custom Hooks, React Router, Context API, controlled forms, and browser localStorage.

The application combines these concepts in a campus food ordering system where users can browse vendors, customise menu items, manage their shopping carts, submit orders, and view their order history.

Through this project, I gained practical experience in developing a React application with reusable components, organised application structure, shared state management, and persistent data.

Developing the personal food and drink customisation feature also helped me understand how application functionality can be improved to provide a more flexible and user-friendly ordering experience.