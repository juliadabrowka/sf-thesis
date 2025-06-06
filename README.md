# 🛠️ Engineering Thesis Application

This is a full-stack web application built with **Angular 19**, **.NET Core**, **Entity Framework Core**, and *
*Microsoft SQL Server**. It consists of two Angular applications and one shared library. The system is divided into:

- 🌐 **Main Web Application** – The public-facing website
- 🔧 **Back Office (Admin Panel)** – An administrative dashboard to manage the content and functionality of the website
- 🧱 **Shared UI Library** – A reusable library of components used by both apps

---

## 🗂️ Project Structure

```
├── apps/
│   ├── web-app/         # Public-facing Angular application (Main Website)
│   └── back-office/     # Admin Panel (Back Office for managing the website)
├── libs/
│   └── shared-ui/       # Shared library with reusable UI components (ng-zorro, Font Awesome, etc.)
├── backend/
│   ├── API/             # .NET Core Web API project (Backend logic and data services)
│   ├── Data/            # EF Core DbContext and database migrations
│   └── Models/          # Entity models and Data Transfer Objects (DTOs)
└── README.md            # This file (Project documentation)
```
---

## 🧰 Tech Stack

### Frontend

- **Angular 19**
- **Angular CLI**
- **ng-zorro** – Ant Design UI components for Angular
- **Font Awesome** – Icon set and toolkit
- **Elfsight Widget** – Integration for displaying Facebook reviews
- **RxJS**, **CSS**, and **Angular Forms**
- **Shared UI Library** for consistent reusable components

### Backend

- **ASP.NET Core Web API**
- **Entity Framework Core**
- **Microsoft SQL Server**

---

## ⚙️ Features

### Web Application (Public)

- Displays content, forms, and live Facebook reviews using Elfsight widget
- Modern, responsive UI with ng-zorro components and Font Awesome icons
- Built using the shared component library for consistency

### Back Office (Admin Panel)

- Admin dashboard with secure login
- CRUD operations for website content
- Content, user, and data management

### Shared UI Library

- Reusable Angular components
- Unified UI style across applications
- Simplified development and maintenance

---

## 📦 Database

- EF Core for ORM and migrations
- SQL Server as the data store
- Auto-generated schema via EF Core

## 🛡️ Security & Authentication

Authentication and role-based access can be handled using ASP.NET Identity or JWT tokens, particularly for admin
operations.

## 📚 Thesis Context

This application was developed as part of an engineering thesis to demonstrate skills in full-stack development, modular
architecture, and UI component reuse with modern technologies.
