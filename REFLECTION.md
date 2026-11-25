
# Week 1 Reflection

Answer each question in 1–3 sentences, in your own words.

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?

Imperative UI means manually telling the browser how to change the DOM using JavaScript. Declarative UI in React means describing how the UI should look, and React updates it when the data changes.

2. Why must a component name start with a capital letter?

Component names must start with a capital letter so React can distinguish custom components from built-in HTML elements like `<div>` and `<h1>`.

3. What does a fragment `<>...</>` do, and why not just use a `<div>`?

A fragment `<>...</>` lets us group multiple elements without adding an extra DOM element. It keeps the HTML structure cleaner than using an unnecessary `<div>`.

4. Name one benefit of splitting the UI into small components.

Splitting the UI into small components makes the code easier to read, maintain, and reuse. For example, a `Header` component can be used on multiple pages without rewriting the same code.


# Week 2: Props, State and Rendering Data

1. What is the difference between props and state in React?

Props are used to pass information from a parent component to a child component, while state stores information that can change during the application's execution. In CampusEats, props are used to pass vendor and menu item information to reusable components, while state manages user interactions such as cart items and selected food preferences.

2. Why is .map() useful when displaying a list of menu items?

The .map() method allows me to display multiple menu items from an array without writing the same JSX repeatedly. In CampusEats, it helps render each menu item dynamically using the vendor data. This makes it easier to add or update menu items without changing the component structure.

3. Why should each item in a rendered list have a unique key?

A unique key helps React identify individual elements in a list when data changes. It allows React to recognise which items have been added, removed, or updated, making the rendering process more efficient and reliable.

4. How does state help update the cart counter?

State allows the application to respond to user interactions. When a customer adds an item to the cart or changes its quantity, the cart state is updated. Components that use the shared cart data, such as the Header, are then updated automatically to display the latest cart count.

My reflection

In Week 2, I learned how to use props and state to make the application interactive. I applied these concepts when displaying vendor information and menu items dynamically. I also started understanding how reusable components can reduce repeated code. One challenge was organising the component structure and ensuring that the correct information was passed between components.

# Week 3: Effects, JSON Data and Forms

1. What is the purpose of useEffect in React?

The useEffect Hook allows a component to perform side effects, such as retrieving data from an external source. In CampusEats, I used it as part of the vendor data fetching process to load information from a JSON file after the component renders.

2. Why load vendor information from a JSON file instead of hard-coding every vendor in the component?

Storing vendor information in a JSON file separates application data from the user interface. It makes the vendor list and menu information easier to organise, update, and reuse. The application can retrieve and display different vendors without manually writing each vendor inside the component.

3. Why should an application show loading and error states when fetching data?

Loading and error states provide feedback to users while the application retrieves data. A loading message indicates that information is still being processed, while an error message informs users when something goes wrong. This makes the application more understandable instead of leaving users with a blank screen.

4. Why is checkout form validation important?

Checkout validation ensures that users provide the required information before placing an order. It helps prevent incomplete submissions and displays error messages when required fields are missing or invalid. This makes the ordering process more reliable.

My reflection

In Week 3, I learned how to retrieve vendor and menu information from public/api/vendors.json instead of keeping all the data inside the components. I also worked on the cart functionality, including updating item quantities and calculating the total price. Developing the checkout form helped me understand how controlled inputs and validation work together. I realised that handling loading and error states is also important because users need clear feedback when using the application.

# Week 4: Custom Hooks, Context, Routing and Persistence

1. What is a custom Hook in React, and why is it useful?

A custom Hook is a reusable JavaScript function that uses React Hooks to manage stateful logic. It allows me to separate repeated logic from components and makes the code easier to organise. In CampusEats, I used custom Hooks such as useCart, useLocalStorage, and useVendors.

2. What problem does React Context solve in an application like CampusEats?

React Context allows different components to access shared information without passing props through multiple levels of the component tree. In CampusEats, CartProvider manages the cart and order information so that components such as Header, CartPage, and OrdersPage can access the same data.

3. What is the purpose of React Router?

React Router allows users to navigate between different pages without reloading the entire application. In CampusEats, I implemented routes for the home page, vendor menu, cart, and order history. I also included a Not Found page to handle invalid routes.

4. What is the purpose of localStorage, and what should I consider when using it?

localStorage allows information to remain in the browser even after the page is refreshed or closed. In CampusEats, I used it to persist cart items and order history. However, I learned that localStorage is stored on the user's browser and should not be used for sensitive information.

5. How does your personal feature improve the CampusEats application?

My personal feature allows customers to customise their food and drink preferences before adding items to the cart. Customers can select different spice levels for food, including Not Spicy, Mild, Medium, and Hot. For drinks, they can choose between Hot and Iced. The selected options are saved with the cart items and displayed again on the cart and Orders pages. This makes the ordering process more flexible and allows customers to choose according to their preferences.

My reflection

In Week 4, I learned how to organise a React application using custom Hooks, Context, and routing. I implemented shared cart and order management through CartProvider and used localStorage to keep the information available after refreshing the page. I also developed my personal feature for food spice levels and drink temperature selection. One important challenge was ensuring that the same menu item with different preferences could be treated as separate cart items. This helped me understand how to manage more detailed application state and improve the user experience.

# Week 5: Firebase Authentication and Protected Routes

1. What is Firebase Authentication, and why is it useful in CampusEats?

Firebase Authentication provides a way to manage user registration, login and logout securely. In CampusEats, I integrated Firebase Authentication to allow users to create accounts and sign in using their email and password. This helps identify users before they access features that require authentication, such as the cart and order pages. I also implemented an authentication context to make the user's authentication status available throughout the application.

2. What is the purpose of AuthProvider and useAuth?

AuthProvider manages the authentication state of the application using React Context. It uses Firebase's `onAuthStateChanged` to detect whether a user is signed in or signed out. The custom `useAuth` Hook allows other components to access the current user and authentication functions without passing props through multiple components. This makes authentication easier to manage across CampusEats.

3. Why are Protected Routes important?

Protected Routes prevent users who are not logged in from accessing certain pages. In CampusEats, I implemented a `ProtectedRoute` component to restrict access to the cart and orders pages. If a user tries to access these pages without signing in, the application redirects them to the login page. After successful login, the user can be redirected to the page they originally wanted to access.

4. How does the application handle logout and cart data?

I updated the Header component to display the logged-in user's name or email and provide a logout button. When the user logs out, Firebase Authentication signs them out and the cart is cleared using the `clearCart()` function in CartProvider. This prevents the previous cart items from remaining visible after logout. I also ensured that clearing the cart does not remove the existing order history.

5. What challenges did I face during Week 5?

One challenge I faced was configuring Firebase correctly because I encountered an `auth/invalid-api-key` error. I learned that Firebase environment variables must be configured correctly in the `.env.local` file and that the Vite development server needs to be restarted after changing them. I also encountered an issue where the Header styling changed after implementing authentication. I resolved this by preserving the original CSS class names while adding the login and logout functionality. Another improvement was adding a cart-clearing function to ensure that cart items are removed when a user logs out.

My Reflection

In Week 5, I learned how to integrate Firebase Authentication into my existing React application. I gained a better understanding of how authentication state can be shared using React Context and how Protected Routes can control access to different pages. I also learned how to connect Firebase authentication functions with the login, registration and logout processes. One important lesson was that implementing authentication involves more than simply creating a login page; the application must also handle user sessions, protected pages and related data appropriately. Overall, this week helped me understand how to make CampusEats more organised and suitable for an application with registered users.


## Week 6

1. Explain what happens from Place Order until the new order appears on the Orders page.

When I click the Place Order button, the checkout form first validates the information entered by the user, including the name, Mahallah and pickup time. After validation, the CartPage calls the placeOrders() function from the orders service. The function saves the order information into the Firestore orders collection. The useMyOrders() hook subscribes to the current user's orders using subscribeToMyOrders(). This function uses onSnapshot() to listen for changes in Firestore. When a new order is created, Firestore sends an updated snapshot and the callback updates the orders state. Therefore, I do not need to call setOrders() manually because the real-time listener updates the page automatically.

2. Why is orders a top-level collection, and why does each order copy vendorName, item name and price?

The orders collection is stored at the top level because orders are independent records that need to be accessed and tracked separately from vendor menu data. Each order belongs to a particular student and contains information about the items purchased. The order also stores the vendor name, item name and price instead of relying only on document IDs. This preserves the order details even if a vendor later changes its menu or updates an item's price. It also makes it easier to display the order history without retrieving every vendor and menu document again.

3. Personal feature: Firestore path, fields and code used.

My personal feature for Week 6 is the spice-level badge and filter. The spice-level information is stored in the menu documents under the Firestore path vendors/{vendorId}/menu/{itemId}. Each menu item contains a numeric spiceLevel field with a value from 0 to 3. The menu subscription uses a Firestore query with where('spiceLevel', '<=', maxSpiceLevel) to retrieve items based on the selected maximum spice level. The application listens for menu changes using onSnapshot(). The badge displays the spice level retrieved from the Firestore menu document. However, I still need to resolve a seeding issue affecting some vendor menu documents before I can confirm that this feature works for every vendor.

My Reflection
Throughout Week 6, I gained a better understanding of how Cloud Firestore supports database operations and real-time data updates in a React application. I learned how to use onSnapshot() to listen for changes, writeBatch() to insert multiple documents and Firestore queries to retrieve specific data. I also understood the importance of organising database collections properly, especially when managing vendors, menu items and customer orders. One of the main challenges was identifying why certain menu items were missing even though the vendor information was available. This experience taught me that successful implementation requires not only writing the correct code but also ensuring that the data stored in the database is complete and consistent.