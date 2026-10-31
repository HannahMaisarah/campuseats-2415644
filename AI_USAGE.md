# AI usage log

Using AI never costs marks; a vague or missing log does.
Add a new section every week, before you tag. Did not use AI? Write "None" under Tool(s).

## Week 1
- Tool(s): None
- What I asked for:
- What I kept, changed or rejected, and why:
- One thing the AI got wrong and how I fixed it:

## Week 2
- Tool(s): ChatGPT
- What I asked for: Help understanding React props and state, defining vendor data in vendors.js, rendering menu items using .map(), implementing vendor selection, and updating the cart counter.
- What I kept, changed or rejected, and why: I applied the suggestions to create reusable components, dynamically display menu items, switch between vendors, and update the cart badge. I also modified the CSS class names to match the provided stylesheet and maintain the intended interface design.
- One thing the AI got wrong and how I fixed it: Some of the initial component updates used incorrect or missing CSS class names, causing the header and buttons to lose their original styling. I fixed this by aligning the class names with the starter stylesheet and rebuilding the project to verify that everything worked correctly.

## Week 3
- Tool(s): Claude (Sonnet 5.5)
- What I asked for: Complete code for the Week 1-3 lab sheets (components, cart with quantities, checkout form with validation, fetching menus from /api/vendors.json) because i need to organise and recheck all the code. Later I asked it to fix my vendors.json and update the files to use it.
- What I kept, changed or rejected, and why:
  - Kept: the component structure (Header, VendorCard, MenuItemCard, MenuList, CartItem, CartPage, CheckoutForm, Status) and the cart logic in App.jsx, because it follows the lab sheet, with the total and cart count derived using reduce instead of stored in state.
  - Changed: I replaced the placeholder vendors it generated with my own shop (Hannah's Cafe) and three shops from classmates (2410829 and 2417740), and credited them in README.md.
  - Accepted from AI: it fixed my vendors.json, which was not valid JSON because the vendors were loose objects instead of one array. It also changed the id "Hannah's-Cafe" to "hannahs-cafe" and added available: true to my items.
- One thing the AI got wrong and how I fixed it:
  - Its first version used placeholder vendors and a made-up matric number (2400000) in the ids, which were not mine. I replaced them with my real data and ids starting with my own matric number (2416644).

## Week 4
- Tool(s): Claude
- What I asked for: Code for Lab 4 Part B built on my Week 3 project: the custom hooks (useLocalStorage, useVendors, useCart), the cart context (CartProvider), the router pages with a Layout and Outlet, and the Week 4 step of my personal feature (digit 4, spice level). After I ran it I also asked for a fix for a "Failed to resolve import" error, then asked it to change the spice feature: remove the Max spice slider, let the customer pick a spice level for each food item when adding it to the cart, give drinks a Hot / Iced choice instead, and tidy and align the menu cards.
- What I kept, changed or rejected, and why:
  - Kept: the hooks and context structure (useLocalStorage with try/catch, useVendors returning { vendors, loading, error, reload }, CartProvider owning the cart and orders in localStorage, useCart throwing outside the provider), because it follows the lab sheet. Header, MenuList and CartPage now call useCart() directly instead of receiving cart props. The total and cart count are still derived with reduce, not stored in state.
  - Kept: the pages (HomePage, VendorPage with useParams and a "Vendor not found" message, CartPage, OrdersPage, NotFoundPage), the Layout with Outlet, NavLink with end on "/", and navigate('/orders') after a valid checkout.
  - Changed: I rejected the "Max spice" slider that the AI first built for my personal feature. I wanted customers to choose a spice level for each dish, so the AI replaced it with a spice picker on every food item (None, Mild, Medium, Hot) and a Hot / Iced picker on drinks. Desserts and bakery items have no picker. The same item with a different choice becomes a separate cart line, and the choice shows in the cart and on the Orders page.
  - Changed: I replaced the placeholder data with my own vendors.json.
- One thing the AI got wrong and how I fixed it:
  - The AI set the spiceLevel values in vendors.json by guessing from the dish names, not from my real menu.
  - Its first Orders page layout was uneven: the price sat in the middle of each row instead of on the right. The AI found this when it checked the layout and fixed it by wrapping the item text and the price in separate spans.
  - The AI could not run npm install or open a browser, so it only checked that the code parsed and rendered. When I ran it, I got "Failed to resolve import ./pages/OrdersPage.jsx" because I had not created that file.