# NestJS Backend

A NestJS TypeScript backend application for searching podcasts from iTunes.

## Quick Start

### 1. Add Environment variables
```bash
cp .env.example .env
```

### 2. Install dependencies
```bash
npm install
```

### 3. Migrate DB to create schema
```bash
npm run migration:run
```

### 4. Start the application

**For development (with auto-reload):**
```bash
npm run start:dev
```

**For production:**
```bash
npm run start:prod
```

**For regular development:**
```bash
npm run start
```

The application will be available at `http://localhost:8000` (or check your `.env` file for the configured port).

## Available Scripts

- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with watch
- `npm run start:prod` - Start in production mode
- `npm run build` - Build the application
- `npm run migration:run` - Run migrations
- `npm run migration:generate` - Generate a new migration
- `npm run migration:revert` - Revert the last migration
- `npm run migration:show` - Show the list of migrations
