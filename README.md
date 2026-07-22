# Project Setup

## 1. Clone the repository

```bash
git clone https://github.com/R1sen13/Dogsterest
cd https://github.com/R1sen13/Dogsterest
```

## 2. Set up environment variables
 
Before running the app, create a `.env` file in the `back` folder with your own database connection string:
 
```
DATABASE_URL="your_database_url_here"
```

## 3. Install dependencies

You need to install dependencies separately in both the `back` and `front` folders.

**Backend:**

```bash
cd back
npm i
```

**Frontend:**

```bash
cd ../front
npm i
```

## 4. Set up Prisma
 
From the `back` folder, generate the Prisma Client and apply migrations:
 
```bash
cd back
npx prisma generate
npx prisma migrate dev
```
 
- `npx prisma generate` — generates the Prisma Client based on your schema, so it matches your database
- `npx prisma migrate dev` — applies existing migrations to your database (creates the database/tables if they don't exist yet)

## 5. Run the app

**Start the backend** (from the `back` folder):

```bash
cd back
npm start
```

**Start the frontend** (from the `front` folder, in a separate terminal):

```bash
cd front
npm run dev
```

> Note: keep the backend running in one terminal, and run the frontend in a second terminal so both are up at the same time.