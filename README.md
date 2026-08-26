# 🏥 MediCare Health Analytics & Healthcare Management System

A comprehensive, role-based healthcare platform built to streamline the interactions between Patients, Doctors, and Administrators. The system provides personal health tracking, dynamic appointment scheduling, digital prescription management, and overall platform analytics.

🚀 **Live Demo:** https://health-analytics-gray.vercel.app/

---

## 👥 User Roles & Workflow

### 1. 🔐 Registration & Authentication

- **Unified Sign-Up:** Users register by selecting their role (**Patient** or **Doctor**). Passwords are securely hashed before storage.
- **Role-Based Login:** Upon login, authentication routes users to their respective dashboards (`/dashboard/patient`, `/dashboard/doctor`, or `/dashboard/admin`).

---

### 2. 👑 Admin Dashboard (Platform Management)

- **Doctor Verification & Approvals:** Review new doctor registrations, check credentials/licenses, and approve or deactivate doctor accounts.
- **User Management:** Manage all registered patients and doctors (view, suspend, or update permissions).

---

### 3. 👨‍⚕️ Doctor Dashboard (Clinical Management)

- **Profile & Availability Setup:** Set up specialization, visiting hours, slot availability, and consultation fees.
- **Patient Health History Review:** Access patient-submitted vital stats (Blood Pressure, Glucose, Weight, Lipid profiles) before or during consultations.
- **Prescription Generator:** Create digital prescriptions containing diagnosis, medication details, dosages, and test instructions directly sent to the patient's portal.

---

### 4. 🩺 Patient Dashboard (Personal Tracker & Appointments)

- **Health Analytics & Vitals Tracker:** Log and track personal medical metrics (Blood Pressure, Sugar levels, Cholesterol, Weight) over time.
- **Digital Prescriptions:** View and download digital prescriptions provided by doctors for print or offline reference.
- **Medical History:** Maintain an organized digital archive of past consultations and health logs.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **Icons:** Lucide React
- **Backend:** Next.js Route Handlers (RESTful API Routes)
- **Database:** MongoDB

---

## 📡 Key API Endpoints

| Role / Feature | Method       | Endpoint                              | Description                           |
| :------------- | :----------- | :------------------------------------ | :------------------------------------ |
| **Auth**       | `POST`       | `/api/auth/register`                  | User registration (Patient / Doctor)  |
| **Auth**       | `POST`       | `/api/auth/login`                     | Authenticate user and assign session  |
| **Patient**    | `GET / POST` | `/api/patient/health-records`         | Fetch or add vital health logs        |
| **Patient**    | `DELETE`     | `/api/patient/health-records?id={id}` | Delete a specific health record       |
| **Doctor**     | `GET / POST` | `/api/doctor/prescriptions`           | Create or fetch patient prescriptions |
| **Admin**      | `GET / PUT`  | `/api/admin/doctors`                  | Manage and approve doctor profiles    |
