# Culture Confluency Tracker

A full-stack Next.js application designed to help scientists efficiently track and visualize cell confluency on microplates.
Accessible via https://monomer.vercel.app/

## Features

- **Microplate View**: Visual 2x3 grid representing a 6-well microplate with color-coded confluency levels
- **Measurement Form**: Easy-to-use form for logging new confluency measurements
- **Real-time Updates**: Data is stored in a database and updates are reflected immediately
- **Color Coding**: Visual representation of confluency states:
  - Light Green: < 20% (Very Low Confluency)
  - Green: 20-60% (Growing Cells)
  - Yellow: 60-90% (Optimal/Ready for Passage)
  - Red: > 90% (Over-confluent)
  - Light Grey: No data yet

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Data Fetching**: TanStack Query (React Query)
- **Form Handling**: React Hook Form
- **UI Components**: HeadlessUI

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up PostgreSQL database:**
   - Install PostgreSQL locally or use a cloud provider
   - Create a new database for the application

3. **Set up environment variables:**
   Create a `.env` file in the root directory:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/culture_tracker"
   ```
   Replace the connection string with your actual PostgreSQL credentials.

4. **Initialize the database:**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Seed the database with sample data:**
   ```bash
   npm run db:seed
   ```

6. **Start the development server:**
   ```bash
   npm run dev
   ```

7. **Access the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Home Page**: The main page shows all available microplates. If only one plate exists, you'll be automatically redirected to it.

2. **View Microplate**: Navigate to `/microplate/[id]` to see the 2×3 grid with current confluency levels for each well.

3. **Add Measurements**: Click "Update Measurements" or "Add Data" to navigate to the form where you can:
   - Select a row (A or B)
   - Select a column (1, 2, or 3)
   - Enter the confluency percentage (0-100%)

4. **Track Progress**: Data is cached with React Query for fast loading and automatic updates after adding measurements.

## Database Schema

The application uses two main tables:

- **Microplates**: Stores plate information (id, name, timestamps)
- **WellMeasurements**: Stores individual measurements (plate reference, row, column, confluency percentage, timestamp)

## API Endpoints

- `GET /api/plate/[id]` - Fetch specific microplate with measurements
- `POST /api/plate/[id]` - Add new measurement to a microplate

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Create and apply a new migration
- `npm run db:push` - Push schema changes to database (for prototyping)
- `npm run db:seed` - Seed database with sample data
- `npm run db:reset` - Reset database and apply all migrations
- `npm run db:studio` - Open Prisma Studio for database management
