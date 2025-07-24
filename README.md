
# 🛍️ Byte Bazaar – Full Stack eCommerce Application

Byte Bazaar is a full-stack eCommerce platform built with **React** and **Spring Boot**, featuring secure **JWT authentication**, **role-based access**, and complete **cart and product management**.

---

## 🌐 Live Demo

- **Frontend:** [https://byte-bazaar678.netlify.app](https://byte-bazaar678.netlify.app)
- **Backend API:** [https://ecommerce-java.onrender.com](https://ecommerce-java.onrender.com)

---

## ⚙️ Tech Stack

### 🔹 Frontend
- React.js + Context API
- Axios (for API calls)
- React Router
- Tailwind CSS (optional)

### 🔹 Backend
- Spring Boot (Java 22)
- Spring Security with JWT
- Maven
- REST APIs 
- Dockerized deployment (Render)

---

## 🔐 Key Features

- 🔑 JWT-based user login & registration
- 🛍️ Product listing with add/edit/delete (Admin and developers only)
- 🛒 Cart operations (Add/View)
- 👥 Role-based permissions (User/Admin/developer)
- 🔄 CORS-enabled for frontend-backend communication
- 📦 Secure REST APIs

---

## 📁 Project Structure

ecommerce-java/
├── ecommerce-frontend/ # React frontend

└── ecommerce-backend/ # Spring Boot backend

    ├── pom.xml

    ├── src/
    
    └── Dockerfile

    
---

## 🚀 Getting Started

### ✅ Prerequisites
- Java 17 or 22
- Node.js + npm
- Maven
- Git

---

### 🔧 Backend Setup (Spring Boot)

```bash
cd ecommerce-backend
mvn clean install
java -jar target/*.jar

### 🔧 frontend Setup (React+vite)
cd ecommerce-frontend
npm install
npm run dev
make sure .env contains
VITE_API_BASE_URL=https://ecommerce-java.onrender.com
