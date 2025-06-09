# Vrey House Metering Dashboard

A fullstack application built with **Laravel 12 (API)** and **React (Frontend)** for managing electricity meter readings across houses and units.

---

## Prerequisites

Ensure the following tools are installed:

- **PHP 8.2+**
- **Composer**
- **Node.js v18+**
- **NPM** or **Yarn**
- **MySQL** or **SQLite**
- Laravel CLI (optional)

---

##  Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/rajhaq/vrey-house-metering--dashboar.git
cd vrey-house-metering--dashboar
```

### 2. Set Up Environment

```bash
cp .env.example .env
```

---

### 3. Backend Setup (Laravel)

```bash
composer install
php artisan key:generate
php artisan migrate
php artisan db:seed
```

---

### 4. Frontend Setup (React)

```bash
npm install
npm run dev
```

---

## Run the App

Start Laravel’s built-in server:

```bash
php artisan serve
```

Visit: [http://localhost:8000](http://localhost:8000)

---

## Import Meter Readings

To fetch consumption data from the external API:

### Default (yesterday's data):

```bash
php artisan meters:import-consumption
```

### Custom date range:

```bash
php artisan meters:import-consumption 2024-01-01 2024-01-05
```

Ensure this is in your `.env`:

```env
METER_API_URL=http://127.0.0.1:9292
```

---

## Run Tests

```bash
php artisan test
```
