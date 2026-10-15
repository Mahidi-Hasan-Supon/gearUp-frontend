 # 🏕️ GearUp — Rent Sports & Outdoor Gear Instantly

<p align="center">
  <strong>Explore more. Own less. Adventure without limits.</strong>
</p>

<p align="center">
  A modern sports and outdoor equipment rental platform that makes it easy to discover, rent, and manage gear for your next adventure.
</p>

<p align="center">
  <a href="[https://gearup-frontend-phi.vercel.app/](https://gearup-frontend-phi.vercel.app)">
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

<!-- Add a real screenshot of your homepage here -->

<p align="center">
  <img
    src="./screenshots/gearup-homepage.png"
    alt="GearUp Homepage Preview"
    width="100%"
  />
</p>

> **Note:** Add a screenshot of your actual homepage at `screenshots/gearup-homepage.png`. If you use a different location, update the image path above.

## 📖 About the Project

**GearUp** is a full-stack sports and outdoor equipment rental platform designed to make outdoor adventures more accessible and convenient.

Instead of purchasing expensive equipment for occasional use, customers can discover available gear and rent what they need. Providers can manage their gear listings and rental orders, while administrators oversee platform activities.

The platform is built with a modern web technology stack, secure authentication, database management, and Stripe payment integration.

## ✨ Features

### 👤 Customer
- Browse available sports and outdoor equipment.
- Explore gear details and rental options.
- Register, log in, and manage an account.
- Create and manage rental bookings.
- Complete payments through Stripe.
- Share reviews and ratings.

### 🏪 Provider
- Manage gear listings and inventory.
- Add, update, and manage equipment information.
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
- Secure payment processing through Stripe.

## 🛠️ Tech Stack

### Frontend

<p>
  <img src="https://skillicons.dev/icons?i=nextjs,typescript,react,tailwind" alt="Next.js, TypeScript, React, Tailwind CSS" />
</p>

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Axios and API integration

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

### Payments & Deployment

<p>
  <img src="https://skillicons.dev/icons?i=stripe,vercel,git,github" alt="Stripe, Vercel, Git, GitHub" />
</p>

- Stripe payment integration
- Vercel deployment
- Git and GitHub

## 📦 Dependencies

The project uses the following key packages and tools.

| Package / Tool | Purpose |
|---|---|
| Next.js | Frontend framework |
| React | User interface |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| shadcn/ui | UI components |
| Express.js | Backend API |
| Prisma | Database ORM |
| PostgreSQL | Relational database |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Stripe | Payment processing |
| dotenv | Environment configuration |
| CORS / cookie middleware | Cross-origin requests and cookie handling |

Additional packages may be used for validation, API requests, form handling, and development tooling. See each application's `package.json` for the complete dependency list.

## 🏗️ Project Architecture

GearUp follows a client-server architecture.

```text
GearUp
├── Frontend
│   ├── Next.js App Router
│   ├── React + TypeScript
│   ├── Tailwind CSS + shadcn/ui
│   └── API integration
│
└── Backend
    ├── Node.js + Express.js
    ├── REST API
    ├── JWT authentication
    ├── Prisma ORM
    ├── PostgreSQL database
    └── Stripe payments
```

The frontend communicates with the backend API, which handles business logic, authentication, database operations, rental workflows, and payment processing.

## 🚀 Getting Started

Follow these steps to run GearUp locally.

### Prerequisites

Make sure you have installed:

- Node.js (a version supported by both applications)
- npm
- PostgreSQL
- Git

You will also need Stripe credentials to test payment functionality.

### 1. Clone the Repository

```bash
git clone [<YOUR_GEARUP_REPOSITORY_URL>](https://github.com/Mahidi-Hasan-Supon/gearUp-frontend.git)
cd <YOUR_GEARUP_PROJECT_DIRECTORY>
```

Replace the placeholders with your actual GitHub repository URL and directory name.

### 2. Install Dependencies

If the frontend and backend are in separate directories, install dependencies for each application.

**Frontend**

```bash
cd frontend
npm install
```

**Backend**

Open another terminal:

```bash
cd backend
npm install
```

> If your repositories or directory names differ, use the actual directory names. If the frontend and backend are separate repositories, clone them individually.

### 3. Configure Environment Variables

Create a `.env` file in each application directory using its existing `.env.example` as a reference.

**Backend environment configuration**

Configure the variables required by your backend, including:

- PostgreSQL connection URL
- JWT secrets
- Stripe secret key and webhook configuration, if used
- Frontend / application URL
- Server port and CORS settings

Example only:

```env
PORT=5000
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/gearup"
JWT_SECRET="your_jwt_secret"
APP_URL="http://localhost:3000"
STRIPE_SECRET_KEY="your_stripe_test_secret_key"
```

**Frontend environment configuration**

Set the frontend's API base URL using the exact variable name expected by your source code. For example:

```env
NEXT_PUBLIC_API_URL="http://localhost:5000"
```

> Important: These are example values, not a verified copy of your project's environment configuration. Use your actual environment variable names and add any other variables required by the application. Never commit real credentials or secret keys to GitHub.

### 4. Set Up the Database

Make sure PostgreSQL is running and your database exists. Configure `DATABASE_URL` in the backend environment file.

Run the database commands supported by your Prisma setup:

```bash
npx prisma generate
npx prisma migrate dev
```

If your project uses a different migration workflow or has existing migrations requiring additional setup, follow the backend's actual Prisma configuration and migration instructions.

### 5. Start the Backend

From the backend directory:

```bash
npm run dev
```

The backend is expected to run on `http://localhost:5000` when configured with the example port.

### 6. Start the Frontend

From the frontend directory:

```bash
npm run dev
```

Open the local URL printed by Next.js, usually:

**http://localhost:3000**

Make sure the frontend API URL and backend CORS configuration match your local development environment.

## 🌐 Live Project

- **Live Frontend:** [GearUp — Rent Sports & Outdoor Gear Instantly](https://gearup-frontend-phi.vercel.app/)
- **GitHub Repository:** Add your actual repository URL here.
- **Backend API:** Add your deployed backend URL here, if publicly available.
- **API Documentation:** Add your Postman collection or API documentation link here, if available.

## 🔮 Future Improvements

- Advanced gear search and filtering.
- Improved booking and availability management.
- Enhanced provider analytics.
- Rental reminders and notifications.
- More comprehensive automated testing.
- Improved accessibility and user experience.

## 👨‍💻 Author

**Mahidi Hasan Supon**

Full Stack Developer | Bangladesh

- GitHub: [@Mahidi-Hasan-Supon](https://github.com/Mahidi-Hasan-Supon)
- Portfolio: Add your portfolio URL here.

---

<p align="center">
  <strong>Built with ❤️ and modern web technologies.</strong>
</p>
