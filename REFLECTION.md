# Week 1 reflection

Answer each question in 1–3 sentences, in your own words.

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?
-> Imperative UI means manually telling the browser how to change the DOM using JavaScript. Declarative UI in React means describing how the UI should look, and React updates it when the data changes.

2. Why must a component name start with a capital letter?
-> Component names must start with a capital letter so React can distinguish custom components from built-in HTML elements like <div> and <h1>.

3. What does a fragment <>...</> do, and why not just use a <div>?
-> A fragment <>...</> lets us group multiple elements without adding an extra DOM element. It keeps the HTML structure cleaner than using an unnecessary <div>.

4. Name one benefit of splitting the UI into small components.
-> Splitting the UI into small components makes the code easier to read, maintain, and reuse. For example, a Header component can be used on multiple pages without rewriting the same code.