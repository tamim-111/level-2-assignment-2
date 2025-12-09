# Vehicle Rental System
A fully modular backend API for managing a vehicle rental business.
Includes role-based authentication, vehicle inventory management, customer profiles, and booking lifecycle handling.

## live url and github repo:

https://level-2-assignment-2-ochre.vercel.app/

https://github.com/tamim-111/level-2-assignment-2

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based authentication (`/signup`, `/signin`)
- Role-based authorization (Admin & Customer)
- Secure password hashing using bcrypt
- Protected routes using middleware

### 🚘 Vehicle Management
- Admin: create, update, delete vehicles
- Public: view all vehicles and single vehicle details
- Tracks availability (`available`, `booked`)

### 👤 User Management
- Admin: view/update/delete any user
- Customer: update own profile only
- Ensures proper permission control

### 📅 Booking Management
- Customers can create bookings with date validation
- Auto price calculation (`daily_rent_price × number_of_days`)
- Vehicle availability is automatically updated
- Lifecycle: `active → cancelled/returned`
- Admin can mark bookings as returned
- Auto-set vehicle to available on return

---

## 🧰 Technology Stack

| Layer        | Technology                                |
| ------------ | ----------------------------------------- |
| Runtime      | Node.js + TypeScript                      |
| Framework    | Express.js                                |
| Database     | PostgreSQL                                |
| Security     | bcrypt, JWT                               |
| Deployment   | Vercel                                    |
| Architecture | Modular (routes → controllers → services) |

## Folder Structure: 

```
src/
├─ modules/
│ ├─ auth/
│ ├─ users/
│ ├─ vehicles/
│ └─ bookings/
├─ config/
├─ middleware/
├─ utils/
└─ app.ts
```

## .env files: 

```
PORT=Your Port
DATABASE_URL=Your URL
JWT_SECRET=your-secret-key
```

## Endpoints: 
### Authentication
- POST /api/v1/auth/signup
- POST /api/v1/auth/signin

### Vehicles

- POST /api/v1/vehicles (Admin)
- GET /api/v1/vehicles
- GET /api/v1/vehicles/:id
- PUT /api/v1/vehicles/:id (Admin)
- DELETE /api/v1/vehicles/:id (Admin)

### Users

- GET /api/v1/users (Admin)
- PUT /api/v1/users/:id (Admin or Owner)
- DELETE /api/v1/users/:id (Admin)

### Bookings

- POST /api/v1/bookings
- GET /api/v1/bookings
- PUT /api/v1/bookings/:id
  
## ⚙️ Setup Instructions

- Clone the repository
- Install dependencies