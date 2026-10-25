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
  - [Add what YOU changed or rejected, e.g. CSS tweaks, renamed variables, anything you rewrote.]
- One thing the AI got wrong and how I fixed it:
  - Its first version used placeholder vendors and a made-up matric number (2400000) in the ids, which were not mine. I replaced them with my real data and ids starting with my own matric number (2416644).
  - It also could not run or test the app in its environment, so I [ran npm run dev and tested it myself: write what you found and fixed, or delete this line if you found nothing].
