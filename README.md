# 🇮🇳 NSS Donation & Volunteer Portal

![Project Status](https://img.shields.io/badge/Status-Live-success)
![Tech Stack](https://img.shields.io/badge/Stack-Next.js%20%7C%20MongoDB%20%7C%20Razorpay-blue)

A full-stack donation and volunteer management platform built for the **National Service Scheme (NSS)**. This application enables secure fundraising, volunteer registration, and comprehensive administrative management with real-time analytics.

🔗 **Live Demo:** [https://nss-donation-portal.vercel.app](https://nss-donation-portal.vercel.app)

---

## 🚀 Key Features

### 👤 User Panel (Volunteers/Donors)
* **Secure Authentication:** Sign up and Login with secure session management (JWT).
* **Donation System:** Integrated **Razorpay Payment Gateway** for seamless contributions.
* **Dynamic Dashboard:** Real-time progress bars, donation history, and badge system (Bronze/Silver/Gold).
* **Instant Receipts:** Auto-generated digital receipts for every donation.

### 🛡️ Admin Panel (Government/Officials)
* **Financial Overview:** Track total funds, active donors, and pending transactions in real-time.
* **User Management:** View, search, and filter all registered volunteers and admins.
* **Data Export:** One-click **CSV Export** for both Donation Records and Volunteer Data.
* **Secure Onboarding:** Special interface to onboard new Admins using a Master Security Key.
* **Role-Based Access:** Middleware protection ensures only authorized personnel access sensitive data.

---

## 🛠️ Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 14 (App Router), React, Tailwind CSS, Lucide Icons |
| **Backend** | Next.js Server Actions, Node.js |
| **Database** | MongoDB Atlas (Mongoose ORM) |
| **Authentication** | JWT (JSON Web Tokens), JOSE, Bcrypt.js |
| **Payments** | Razorpay Payment Gateway API |
| **Deployment** | Vercel |

---

## 📸 Screenshots

### 1. Admin Dashboard (Financial Overview)
![Admin Dashboard](./screenshots/admin-dashboard.png)
*(Manage funds, view real-time stats, and track recent transactions)*

### 2. User Dashboard & Gamification
![User Dashboard](./screenshots/user-dashboard.png)
*(Dynamic progress bars, donation history, and impact tracking)*

### 3. Volunteer Management & Export
![Volunteer Management](./screenshots/volunteer-export.png)
*(Filter users by role, search by name, and export data to CSV)*

---

## ⚡ Getting Started (Local Setup)

Follow these steps to run the project locally on your machine.

### 1. Clone the Repository
```bash
git clone [https://github.com/As00-00/NSS_Donation_Portal.git](https://github.com/As00-00/NSS_Donation_portal.git)
cd nss-portal
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Configure Environment Variables
Create a .env file in the root directory and add the following keys:
```Code Snippet
# Database Connection
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/nss_db

# Security Secrets (Generate random strings for these)
JWT_SECRET=your_super_secret_jwt_key
ADMIN_SECRET_KEY=your_admin_onboarding_key
CREATE_ADMIN_SECRET_KEY=your_create_admin_secret_key

# Razorpay Keys (Get these from Razorpay Dashboard)
RAZORPAY_KEY_ID=rzp_test_xxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
```
### 4. Run the Development Server
```bash
npm run dev
```
Open http://localhost:3000 in your browser.

### 🔐 Admin Access
To access the Admin Panel, you first need an Admin account.

1. First Run: You can manually change a user's role to admin in your MongoDB database.

2. Onboarding: Once logged in as an Admin, use the "Onboard Admin" tab to create new admins using the ADMIN_SECRET_KEY.

### 📂 Project Structure
```bash
├── app/
│   ├── actions/       # Server Actions (Backend Logic)
│   ├── admin/         # Admin Dashboard Pages
│   ├── api/           # API Routes (if any)
│   ├── dashboard/     # User Dashboard Pages
│   ├── donate/        # Payment Page
│   └── (auth)/        # Login & Register Routes
├── components/        # Reusable UI Components
├── lib/               # Database Connection Helper
├── models/            # Mongoose Database Models
└── public/            # Static Assets (Images, Logos)
```

### 🤝 Contribution
Contributions are welcome!

1. Fork the repository.

2. Create a new branch (git checkout -b feature-branch).

3. Commit your changes.

4. Push to the branch and open a Pull Request.

# Made with ❤️ by Aryan Sankhla for NSS India.
