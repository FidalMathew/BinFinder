# BinFinder
![BinFinder2](https://github.com/user-attachments/assets/81f64f78-c865-42a6-a730-f2417efbd3ca)

**binFinder** is a community-driven platform that helps people easily **find**, **add**, and **share nearby waste bins**, making cities cleaner and smarter. It combines **location tracking** with **community contributions**, ensuring that bin locations are always up to date.

---

## ✨ Features

* 📍 **Find Bins Nearby** – View bins on an interactive **Google Maps** interface.
* ➕ **Add New Bins** – Contribute by adding new bin locations with details.
* 📷 **Upload Bin Photos** – Secure photo uploads powered by **Cloudinary**.
* 🔐 **User Profiles** – Track your contributions and manage your account.
* 🌍 **Community Collaboration** – Shared database of bin locations for everyone.

---

## 🛠️ Tech Stack

**Frontend:**

* React (Vite)
* Google Maps Cloud API

**Backend:**

* Java Spring Boot (REST APIs)
* MySQL Database

**Storage & Deployment:**

* Cloudinary (Image uploads)
* Docker (Containerized deployment)
* Vercel (Frontend hosting) + Cloud host for backend

---

## ⚙️ Architecture

```mermaid
flowchart LR
    User((User)) -->|Interacts| React[React + Vite Frontend]
    React -->|API Calls| SpringBoot[Java Spring Boot Backend]
    SpringBoot --> MySQL[(MySQL Database)]
    React -->|Image Upload| Cloudinary[Cloudinary]
    React -->|Maps| GoogleMaps[Google Maps Cloud API]
    SpringBoot --> Docker[Dockerized Deployment]
```


## Login/SignUp page

<img width="1512" height="846" alt="image" src="https://github.com/user-attachments/assets/1e315db7-9b2b-4625-abc8-859fdf66ccbc" />


## Home page

<img width="1510" height="855" alt="image" src="https://github.com/user-attachments/assets/a2cc018c-782d-4b21-aad1-024d30031558" />


## Search page

<img width="1511" height="852" alt="image" src="https://github.com/user-attachments/assets/3d92ed24-1e95-464e-a7c0-81b6dd40d1f3" />

## Profile page

<img width="1511" height="845" alt="image" src="https://github.com/user-attachments/assets/770b0715-23a0-4f05-af56-a55e71857c69" />



