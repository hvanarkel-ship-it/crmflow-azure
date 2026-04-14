# CRMFlow (Azure)

Enterprise-friendly CRM starter designed for:

- **Azure App Service** hosting
- **Azure SQL Database** (SQL Server) as persistence
- **Standard GitHub** with **GitHub Actions** CI/CD

This repo includes a GitHub Actions workflow for deploying to Azure App Service.

## Authentication

This starter uses email/password (NextAuth Credentials) to avoid any dependency on Entra ID.

## Local setup

1. Install deps
   ```bash
   npm install
   ```

2. Create `.env`
   ```bash
   cp .env.example .env
   ```

3. Set `DATABASE_URL` to your Azure SQL connection string (Prisma SQL Server format)

4. Migrate + seed
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   npm run seed
   ```

5. Run
   ```bash
   npm run dev
   ```

## Deployment to Azure App Service

The workflow uses an Azure App Service **publish profile** secret.

- Create an App Service (Linux, Node.js runtime)
- Download the publish profile in the Azure portal
- Add a GitHub Actions secret: `AZURE_WEBAPP_PUBLISH_PROFILE`
- Set env vars in App Service: `DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`

Then push to `main` to deploy.

Generated: 2026-04-14
