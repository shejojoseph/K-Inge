# K-Inge
<p align="center">
  <img src="public/logo.svg" />
</p>

Unlock a deeper understanding of your relationship with K-Inge. Inge is an AI-powered chat-agent that uses personality insights (from the Big Five model) and your shared preferences as a couple to generate actionable advice, helping you and your partner grow together.

## Getting Started
Prerequisites
- Node.js ≥ 18
- PostgreSQL ≥ 12

1. Clone & Install

git clone https://github.com/your-org/k-inge.git
cd k-inge
npm install

2. Environment Variables
Create a .env.local in the project root:
dotenv
add the following paths to the database and OpenAI Api keys:
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
OPENAI_API_KEY="sk-..."


4. Database Setup & Migrations

npx prisma migrate dev --name init   # creates/migrates your Postgres schema


4. Run the Dev Server

npm run dev
Open http://localhost:3000 in your browser.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

You can find the project walkthrough at https://youtu.be/X6PwvACUxk0

![image](https://github.com/user-attachments/assets/05157a0e-d73d-4a45-90cf-10eadbae7fe7)
![image](https://github.com/user-attachments/assets/2d5e4b34-650a-4dc6-9627-a932fe32f0f9)
![image](https://github.com/user-attachments/assets/ca7e752c-7f9f-45c7-906a-a7a3ff982bc6)
