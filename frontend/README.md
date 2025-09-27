# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Search Feature

Overview
- Global, real-time product search used across the app.
- Search state is stored in AppContext so any component can read or update it.
- Typing in the Navbar search input updates the global query and (if not empty) navigates to the products page.
- The AllProducts page listens to the query and filters the products list.

How it works (high level)
1. AppContext exposes:
   - searchQuery (string)
   - setSearchQuery (setter)
2. Navbar input:
   - onChange calls setSearchQuery(value)
   - a useEffect watches searchQuery and calls navigate('/products') when query length > 0
3. AllProducts:
   - useEffect watches [products, searchQuery]
   - when searchQuery is non-empty: filters products where product.name.toLowerCase().includes(searchQuery.toLowerCase())
   - when empty: shows all products
   - only in-stock products are rendered

Key files
- src/context/AppContext.jsx — defines and provides searchQuery / setSearchQuery
- src/components/Navbar.jsx — input that updates searchQuery + navigation effect
- src/pages/AllProducts.jsx — filters products using searchQuery and renders ProductCard list

Behavior notes
- Matching: case-insensitive substring match on product.name only.
- Real-time: updates on every keystroke (no debounce).
- Auto navigation: typing any character redirects user to /products.
- Clearing the input restores the full products list.
- Scope: search currently does not include description, category, tags, or fuzzy matching.

Debugging tips
- Console.log products and searchQuery in AllProducts to verify data and casing.
- Confirm navigate is provided from React Router in AppContext (useNavigate).
- If results are missing, ensure product.name exists and is a string.

Recommended improvements (short)
- Debounce input (100–300ms) to reduce work on each keystroke.
- Trim input and ignore very short queries (e.g., length < 2).
- Search multiple fields (name, category, description).
- Sync search with URL query (e.g., /products?q=apple) for shareable/bookmarkable results.
- Highlight matched substrings in ProductCard.
- For large datasets, implement indexed or fuzzy search (Fuse.js or backend search).

Quick code references
- AppContext: const [searchQuery, setSearchQuery] = useState("");
- Navbar input: <input onChange={e => setSearchQuery(e.target.value)} ... />
- AllProducts filter snippet:
```javascript
useEffect(() => {
  if (searchQuery.length > 0) {
    setFilteredProducts(
      products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  } else {
    setFilteredProducts(products);
  }
}, [products, searchQuery]);
```

Add this section to README for notes and future reference.
