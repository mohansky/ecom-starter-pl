# Cloudflare Pages Deployment Guide

Since Payload CMS has many Node.js dependencies that aren't compatible with Cloudflare Workers, **Cloudflare Pages** is a better option for this Next.js application.

## Option 1: Cloudflare Pages (Recommended)

### 1. Update wrangler.toml for Pages
Create a new `wrangler-pages.toml` file:

```toml
name = "ecom-payload-starter"
compatibility_date = "2024-09-23"
compatibility_flags = ["nodejs_compat"]

[vars]
NODE_ENV = "production"

[[d1_databases]]
binding = "DB"
database_name = "ecom-payload-db"
database_id = "26125be3-951c-4d8a-8118-ccbcdbec1edf"
```

### 2. Deploy to Pages with D1
```bash
# Build the application
pnpm run build

# Deploy to Cloudflare Pages
wrangler pages project create ecom-payload-starter
wrangler pages deployment create .next --project-name=ecom-payload-starter
```

### 3. Add D1 binding to Pages
```bash
wrangler pages project bind-d1 ecom-payload-starter --binding=DB --database=ecom-payload-db
```

### 4. Set environment variables for Pages
```bash
wrangler pages secret put PAYLOAD_SECRET --project-name=ecom-payload-starter
wrangler pages secret put RESEND_API_KEY --project-name=ecom-payload-starter
wrangler pages secret put RESEND_FROM_EMAIL --project-name=ecom-payload-starter
wrangler pages secret put R2_BUCKET --project-name=ecom-payload-starter
wrangler pages secret put R2_ACCESS_KEY_ID --project-name=ecom-payload-starter
wrangler pages secret put R2_SECRET_ACCESS_KEY --project-name=ecom-payload-starter
wrangler pages secret put R2_ENDPOINT --project-name=ecom-payload-starter
```

## Option 2: Alternative Platforms

If Cloudflare Pages doesn't work perfectly with Payload CMS, consider these alternatives:

1. **Vercel** - Excellent Next.js support, PlanetScale MySQL
2. **Railway** - Full Node.js support, built-in PostgreSQL
3. **Render** - Docker support, managed databases

## Current D1 Database
- Database ID: `26125be3-951c-4d8a-8118-ccbcdbec1edf`
- Database Name: `ecom-payload-db`
- Binding: `DB`

The D1 database is already created and ready to use with any of these deployment options.