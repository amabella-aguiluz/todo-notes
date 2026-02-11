
# Notes App Backend Documentation

  

## Table of Contents

1. [Project Overview](#project-overview)

2. [Database](#database)

3. [Authentication](#authentication)


---

  

## Project Overview

This backend serves as the API for the Notes App. It provides authentication and CRUD operations for notes.

  

**Tech Stack:**

-  **Backend:** Node.js, Express

-  **Database:** MySQL, Sequelize, Aiven

-  **Authentication:** JWT, Bcrypt

-  **Environment Management:** dotenv

-  **Dev Tools:** Nodemon, Sequelize CLI

-  **Frontend:** React, TailwindCSS, MaterialUI

  

---

  

## Database

  

### Users

| Column | Type | Notes |

|---------------|---------------|--------------------------------|

| id | INT | Primary key, auto-increment |

| email | VARCHAR(255) | Unique, not null |

| password_hash | VARCHAR(255) | Hashed password, not null |

| created_at | TIMESTAMP | Auto-generated |

| updated_at | TIMESTAMP | Auto-updated |

  

### Notes

| Column | Type | Notes |

|---------------|---------------|--------------------------------|

| id | INT | Primary key, auto-increment |

| user_id | INT | Foreign key → users(id) |

| title | VARCHAR(255) | Default: 'Untitled' |

| description | TEXT | Not null |

| created_at | TIMESTAMP | Auto-generated |

| updated_at | TIMESTAMP | Auto-updated |

  

**Notes:**

- IDs are unique across all users.

- Deleted note IDs are not re-used; frontend can handle display numbering.

  

---

## Authentication

-   Passwords are hashed and salted with bcrypt
-   JWT is used to validate a user's current session
-   Rate-limiting implemented with `express-rate-limit`
-  Prevented SQL injection using Sequelize's ORM

