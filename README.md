# Holidaze

> A vacation-rental booking app built with React, Vite & Tailwind CSS, using the Noroff Holidaze API.

---

## 📖 About

Holidaze lets users browse, book and host vacation properties. Key user flows include:

* **Browse** available venues with images, location & pricing
* **Book** stays (select dates & guest count)
* **Host** a venue (create, edit & delete listings)
* **Manage** your bookings & profile

---

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) ≥ 18
* [Git](https://git-scm.com/)

### Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/your-username/exam-v-r-2025-holidaze.git
   cd exam-v-r-2025-holidaze
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn
   ```

3. **Environment variables**
   Create a `.env` file in the root:

   ```env
   VITE_API_KEY=your-noroff-api-key-here
   ```

   Vite will automatically expose anything prefixed with `VITE_` under `import.meta.env`.

4. **Run the dev server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Available Scripts

In the project directory, you can run:

* `npm run dev` / `yarn dev`
  Start development server with hot-reload.

* `npm run build` / `yarn build`
  Bundle for production into `dist/`.

* `npm run preview` / `yarn preview`
  Preview the production build locally.

* `npm run lint`
  Run ESLint across your source code.

* `npm run format`
  Auto-format all files with Prettier.

---

## 🛠 Tech Stack

* **Framework:** React 19
* **Bundler:** Vite
* **Styling:** Tailwind CSS
* **Routing:** React Router v7
* **Date handling:** date-fns & react-date-range
* **API:** Noroff Holidaze v2 (profiles, venues, bookings)
* **Icons:** react-icons
* **Linting:** ESLint
* **Formatting:** Prettier

---

## 🔗 Useful Links

* **API docs**: [https://v2.api.noroff.dev/holidaze](https://v2.api.noroff.dev/holidaze)
* **Vite**: [https://vitejs.dev/](https://vitejs.dev/)
* **Tailwind CSS**: [https://tailwindcss.com/](https://tailwindcss.com/)
* **React Router**: [https://reactrouter.com/](https://reactrouter.com/)

---
