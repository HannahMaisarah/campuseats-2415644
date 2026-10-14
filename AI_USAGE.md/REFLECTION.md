# Week 1 reflection

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?
-> Imperative UI means manually telling the browser how to create, change, or remove elements using DOM code. Declarative UI in React means describing how the UI should look based on the data or state, and React updates the UI automatically when the data changes.

2. Why must a component name start with a capital letter?
-> A component name must start with a capital letter so React can recognise it as a custom component instead of a built-in HTML element. For example, Welcome is a React component, while div is a normal HTML element.

3. What does a fragment <>...</> do, and why not just use a <div>?
-> A fragment allows us to group multiple elements without adding an extra DOM element. It helps keep the HTML structure clean and avoids unnecessary div elements.

4. Name one benefit of splitting the UI into small components.
-> Splitting the UI into small components makes the code easier to read, maintain, and reuse. If we need the same UI in different parts of the application, we can reuse the component instead of writing the same code again.