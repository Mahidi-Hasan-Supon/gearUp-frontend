
# 🏕️ GearUp — Rent Sports & Outdoor Gear Instantly

<p align="center">
  <strong>Explore more. Own less. Adventure without limits.</strong>
</p>

<p align="center">
  A modern sports and outdoor equipment rental platform that makes it easy to discover, rent, and manage gear for your next adventure.
</p>

<p align="center">
  <a href="https://gearup-frontend-phi.vercel.app/">
    <strong>🌐 Live Demo</strong>
  </a>
  ·
  <a href="#-features">
    <strong>✨ Features</strong>
  </a>
  ·
  <a href="#-getting-started">
    <strong>🚀 Get Started</strong>
  </a>
</p>

---

## 📸 Project Preview

<p align="center">
  <img
    src="./public/gearup%20project.PNG"
    alt="GearUp Project Homepage"
    width="100%"
  />
</p>

## 📖 About the Project

**GearUp** is a full-stack sports and outdoor equipment rental platform designed to make outdoor adventures more accessible and convenient.

Instead of purchasing expensive equipment for occasional use, customers can discover and rent the gear they need. Providers can manage their equipment listings and rental orders, while administrators oversee platform activities.

The application combines a modern web interface, a RESTful backend, database management, authentication, and Stripe payment integration to provide a complete rental experience.

## ✨ Features

### 👤 Customer
- Browse sports and outdoor equipment.
- Explore gear details and rental options.
- Register, log in, and manage an account.
- Create and manage rental bookings.
- Make payments through Stripe.
- Share reviews and ratings.

### 🏪 Provider
- Create and manage gear listings.
- Update equipment information and availability.
- View and manage rental orders.
- Monitor rental activity.

### 🛡️ Admin
- Access the administrative dashboard.
- Manage users and platform activities.
- Monitor gear listings and rental operations.

### 🔐 Authentication & Security
- JWT-based authentication.
- Role-based access control.
- Protected routes and dashboards.
- Password hashing.
- Secure payment integration with Stripe.

> Features may vary depending on the current implementation and deployment configuration.

## 🛠️ Tech Stack

### Frontend
<p>
  <img src="https://skillicons.dev/icons?i=nextjs,react,typescript,tailwind" alt="Next.js, React, TypeScript, Tailwind CSS" />
</p>

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- API integration

### Backend
<p>
  <img src="https://skillicons.dev/icons?i=nodejs,express,typescript" alt="Node.js, Express.js, TypeScript" />
</p>

- Node.js
- Express.js
- TypeScript
- RESTful API architecture
- JWT authentication
- bcryptjs for password hashing

### Database & ORM
<p>
  <img src="https://skillicons.dev/icons?i=postgres,prisma" alt="PostgreSQL and Prisma" />
</p>

- PostgreSQL
- Prisma ORM
- Relational data modeling

### Payments & Tools
<p>
  <img src="https://skillicons.dev/icons?i=stripe,vercel,git,github" alt="Stripe, Vercel, Git, GitHub" />
</p>

- Stripe payment integration
- Vercel deployment
- Git and GitHub
- npm

## 🏗️ Project Architecture

GearUp follows a client-server architecture.

```text
GearUp
├── Frontend
│   ├── Next.js App Router
│   ├── React + TypeScript
│   ├── Tailwind CSS + shadcn/ui
│   └── Backend API integration
│
└── Backend
    ├── Node.js + Express.js
    ├── RESTful API
    ├── JWT authentication
    ├── Prisma ORM
    ├── PostgreSQL database
    └── Stripe payment integration
```

The frontend communicates with the backend API, which handles business logic, authentication, database operations, rental workflows, and payment processing.

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm
- [Git](https://git-scm.com/)
- PostgreSQL
- Stripe test credentials for payment testing

### 1. Clone the Repository

```bash
git clone https://github.com/Mahidi-Hasan-Supon/gearUp-frontend.git
cd gearup-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root and configure the variables required by the application.

For example:

```env
NEXT_PUBLIC_API_BASE_URI=http://localhost:5000/api/v1
```

Use the exact environment variable names expected by your source code. If the backend is maintained in a separate repository, configure its environment variables there as well.

Typical backend configuration may include:

```env
PORT=5000
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/gearup"
JWT_SECRET="your_jwt_secret"
APP_URL="http://localhost:3000"
STRIPE_SECRET_KEY="your_stripe_test_secret_key"
```

These values are examples only. Check your actual backend configuration and `.env.example` files before using them.

**Security note:** Never commit real credentials, database passwords, JWT secrets, or Stripe secret keys to GitHub.

### 4. Set Up the Database

If you are running the backend locally, configure PostgreSQL and the backend's `DATABASE_URL`.

From the backend directory, run the Prisma commands supported by your project:

```bash
npx prisma generate
npx prisma migrate dev
```

Run these commands only if they match the backend's existing Prisma setup and migration workflow.

### 5. Start the Backend

If the backend is maintained separately, open a terminal in its project directory and run the appropriate development command, for example:

```bash
npm run dev
```

Ensure the backend is running and its CORS configuration allows the frontend origin.

### 6. Start the Frontend

From the GearUp frontend directory:

```bash
npm run dev
```

Open:

[http://localhost:3000](http://localhost:3000)

Make sure the frontend API URL matches the backend address and API prefix.

## 🌐 Live Project

- **Live Frontend:** [GearUp — Rent Sports & Outdoor Gear Instantly](https://gearup-frontend-phi.vercel.app/)
- **GitHub Repository:** [Mahidi-Hasan-Supon/gearUp-frontend](https://github.com/Mahidi-Hasan-Supon/gearUp-frontend)
- **Backend API:** Add the public backend URL if available.
- **API Documentation:** Add the Postman collection or API documentation link if available.

## 📂 Repository Structure

The frontend repository is organized around the Next.js App Router and reusable components.

```text
gearup-frontend/
├── public/
│   └── gearup project.PNG
├── src/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   └── ...
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

This is an illustrative structure. Your actual directory names may differ.

## 🔮 Future Improvements

- Advanced gear search and filtering.
- Improved booking and availability management.
- Provider analytics and reporting.
- Rental reminders and notifications.
- More comprehensive automated testing.
- Enhanced accessibility and user experience.

## 👨‍💻 Author

**Mahidi Hasan Supon**

Full Stack Developer | Bangladesh

- **GitHub:** [@Mahidi-Hasan-Supon](https://github.com/Mahidi-Hasan-Supon)
- **Portfolio:** Add your portfolio website URL here.

---

<p align="center">
  <strong>Built with ❤️ and modern web technologies.</strong>
</p>
