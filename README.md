# Evently — Event Management System

A full-stack web app for registering and managing events, with two roles:

- **Administrator** — Log in, Create Events, View Participant Events, View Participant Payments, Log Out.
- **Participant** — Register, Log In, Create Events, Pay for Events, View Events, Log Out.

## Stack

- **Backend:** Node.js, Express, SQLite (via Sequelize), JWT auth, bcrypt
- **Frontend:** React (Vite), React Router, Axios

No separate database server to install -- the backend stores everything in a
single local file (`backend/evently.sqlite`), created automatically.

## Project Structure

```
evently/
  backend/
    src/
      config/       # DB connection, sync script, create-admin script
      models/        # User, Event, Registration, Payment (Sequelize)
      middleware/    # auth (JWT verify) + role guard
      controllers/    # route logic
      routes/         # Express routers
      app.js
      server.js
    package.json
    .env.example
  frontend/
    src/
      api/            # axios instance with auth header
      context/         # AuthContext (login/register/logout)
      components/      # Navbar, ProtectedRoute
      pages/            # Login, Register, Events, EventDetail, CreateEvent,
                         # MyPayments, AdminParticipants, AdminPayments, Home
      App.jsx
      main.jsx
    package.json
    vite.config.js
```

## Setup (3 commands total)

You only need Node.js installed -- nothing else.

### 1. Backend

```bash
cd backend
cp .env.example .env
npm install
npm run db:sync          # creates evently.sqlite with all tables
npm run create-admin      # creates an admin login: admin@evently.com / admin123
npm run dev                # starts on http://localhost:5000
```

Leave that terminal running.

### 2. Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev                # starts on http://localhost:5173
```

Open http://localhost:5173 in your browser. Log in as the admin
(`admin@evently.com` / `admin123`), or register a new participant account.

Want a different admin email/password? Set env vars before running the
script, e.g.:

```bash
ADMIN_EMAIL=you@example.com ADMIN_PASSWORD=yourpassword npm run create-admin
```

## API Overview

| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | public | Participant self-registration |
| POST | `/api/auth/login` | public | Login (admin or participant) |
| GET | `/api/auth/me` | authenticated | Current user info |
| GET | `/api/events` | authenticated | List all events |
| GET | `/api/events/:id` | authenticated | Event detail |
| POST | `/api/events` | authenticated | Create event |
| DELETE | `/api/events/:id` | creator or admin | Delete event |
| POST | `/api/events/:id/register` | participant | Register for an event |
| GET | `/api/registrations/mine` | participant | My registered events |
| POST | `/api/payments` | participant | Pay for a registration |
| GET | `/api/payments/mine` | participant | My payment history |
| GET | `/api/admin/participants` | admin | All participants' registrations |
| GET | `/api/admin/payments` | admin | All participants' payments |

## Notes / Next Steps

- Payments are **simulated** (marked `completed` instantly) -- swap
  `paymentController.js` for a real Stripe/Razorpay integration when ready.
- SQLite is great for development and small deployments. If you outgrow it,
  switching back to Postgres/MySQL is just a change to `src/config/db.js`
  (Sequelize supports both) -- none of the models or routes need to change.
- Consider whether participants should really be able to create events, or
  if that should be admin-only -- the current schema/routes support both per
  the original spec, but it's easy to lock down (`roleMiddleware('admin')`
  on `POST /api/events`) if not.
