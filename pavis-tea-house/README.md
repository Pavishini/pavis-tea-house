# 🍃 Pavi's Tea House

Pavi's Tea House is a premium, fully responsive, front-end e-commerce web application. Designed with an elegant, earthy aesthetic, it simulates a complete online shopping experience—from browsing high-quality teas to managing a user profile and checking out—without requiring a backend server. 

All application state (cart, user sessions, order history, wishlists, and theme preferences) is managed seamlessly using browser `localStorage`.

---

## ✨ Key Features

### 🛍️ E-Commerce Capabilities
- **Dynamic Catalog:** Browse products with real-time search filtering and category sorting (Green, Black, Herbal, Oolong, Chai).
- **Product Quick-View:** Click any product to open a detailed modal featuring high-res images, descriptions, dynamic pricing, and mock customer reviews.
- **Advanced Shopping Cart:** A slide-out sidebar cart that allows users to adjust item quantities, remove items, and see real-time price calculations.
- **Promo Code System:** Users can enter `PAVI10` during checkout to instantly apply a 10% discount to their subtotal.
- **Simulated Checkout:** A secure payment processing overlay simulates a transaction before converting the cart items into a permanent order.

### 👤 User Authentication & Profile
- **Local Session Management:** Secure mock login/signup flows that personalize the application state.
- **User Dashboard:** A dedicated profile page featuring:
  - **Order History:** A log of past purchases with status badges (e.g., "Processing", "Delivered").
  - **Wishlist:** Users can "heart" products to save them for later, accessible directly from their dashboard.
  - **Account Settings:** Mock forms for updating shipping addresses and personal details.

### 🎨 Modern UI/UX
- **Dark/Light Mode:** A stylish theme toggle that remembers user preferences via local storage, transforming the app into a sleek, low-light aesthetic.
- **Fluid Animations:** Custom CSS `@keyframes` handle smooth page transitions (fade and slide up) to mimic native mobile app navigation.
- **Responsive Design:** A mobile-first CSS grid/flexbox architecture ensuring the site looks flawless on desktops, tablets, and smartphones. Includes a collapsible hamburger menu for mobile navigation.

---

## 🛠️ Technology Stack

This project was built from scratch without heavy frameworks, showcasing the power of vanilla web technologies:
- **HTML5:** Semantic structuring and single-page application (SPA) layout routing.
- **CSS3:** Custom variables (Design Tokens), Flexbox, CSS Grid, media queries, and transition animations. No external UI libraries (e.g., Tailwind or Bootstrap) were used.
- **Vanilla JavaScript (ES6+):** DOM manipulation, state management, array filtering/sorting, and event handling.
- **Data Persistence:** `window.localStorage`

---

## 📂 File Structure

```text
/
├── index.html        # The core HTML layout containing all "pages" as hidden/active views
├── style.css         # All styling, animations, dark mode overrides, and responsive queries
├── app.js            # The application logic, state management, and mock database
├── README.md         # Project documentation
└── images/           # Contains all locally generated AI product imagery and team avatars
    ├── black_tea_product_...png
    ├── monica_joghee.png
    ├── pavishini.png
    └── ...
```

---

## 🚀 Getting Started

Because this application relies entirely on client-side rendering and `localStorage`, setup is incredibly simple:

1. **Clone or Download** the repository to your local machine.
2. **Open `index.html`** in any modern web browser (Chrome, Firefox, Safari, Edge).
   - *Note: No `npm install`, build steps, or local servers are required!*

### Test Data to Try:
- **Promo Code:** Open the cart and enter `PAVI10` to see the discount logic in action.
- **Dark Mode:** Click the 🌙 icon in the top right.
- **Checkout:** Try checking out without logging in, then create a test account and check out again to see your order populate in the "My Account" page.

---

## 👩‍💻 About the Founder

Pavi's Tea House was conceptualized and branded for **Pavishini Karthikeyan** — Chief Tea Taster and Founder, operating out of the lush hills of Konavakarai village, Kotagiri, The Nilgiris.
