# Amazon.com Clone

Amazon.com clone built as a technical assignment.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg)](https://amazon-clone-zeta-jet.vercel.app/)

## Live Deployment
Check out the live deployed application here: **[https://amazon-clone-zeta-jet.vercel.app/](https://amazon-clone-zeta-jet.vercel.app/)**

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database ORM:** Prisma
- **Database:** PostgreSQL (Neon)
- **Authentication:** NextAuth.js

## Key Features
- **Authentication Flow:** Secure user signup and signin.
- **Product Browsing:** View categorised products and product details.
- **Shopping Cart:** Add, remove, and update quantities of items in the cart.
- **Checkout Process:** Secure checkout flow.
- **Search:** Fully functional search with autocomplete suggestions.

## Getting Started Locally

To run this project on your local machine, follow these steps:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Copy the example environment file and fill in the necessary values.
   ```bash
   cp .env.example .env
   ```
   *(Ensure you provide your Neon database URL and NextAuth secret in the `.env` file.)*

3. **Run database migrations:**
   ```bash
   npx prisma db push
   # or
   # npx prisma migrate dev
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

## About AI Collaboration Logs

This repository contains a `.agent-logs/` directory. These logs capture the AI collaboration and prompts used during the development of this project.
