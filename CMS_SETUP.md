# Marrant CMS setup

The CMS is mounted under `/admin` and uses Hostinger MySQL, Prisma, signed JWT sessions, bcrypt password hashing, TipTap, and Vercel Blob.

## 1. Environment

Copy the CMS values from `.env.example` into `.env.local` or the Vercel project environment:

- `DATABASE_URL`: Hostinger MySQL connection string.
- `SESSION_SECRET`: at least 32 random characters.
- `ADMIN_EMAIL`: initial administrator email.
- `ADMIN_PASSWORD`: initial administrator password, at least 12 characters.
- `BLOB_READ_WRITE_TOKEN`: Vercel Blob read/write token.

Never commit real values.

## 2. Database and first administrator

For an empty local database:

```bash
npm run db:migrate
npm run db:seed
```

For production or CI/CD:

```bash
npm run db:deploy
npm run db:seed
```

`db:seed` hashes `ADMIN_PASSWORD` with bcrypt before the value is stored. Running it again updates the same administrator password safely.

## 3. Sign in

Open `/admin/login` and use `ADMIN_EMAIL` with `ADMIN_PASSWORD`. The browser receives an HttpOnly, SameSite=Strict, signed session cookie that expires after eight hours.

## 4. Publishing

1. Add Product and Blog categories in `/admin/categories`.
2. Upload images in `/admin/media`.
3. Create a product in `/admin/products/create` or an article in `/admin/blog/create`.
4. Fill in the slug, SEO title, SEO description, content, category, and images.
5. Change Status from Draft to Published and save.

Published product URLs use `/products/{slug}`. Published article URLs use `/blog/{slug}`, and published CMS articles also appear in the existing English Blog index.

## Security and performance boundaries

- The protected layout verifies the session before rendering, and every mutation or admin API verifies it again.
- Server Actions use Next.js built-in Origin/Host checks. The upload route also performs an explicit same-origin check.
- Prisma parameterizes database queries. Rich article JSON is rendered as React nodes without `dangerouslySetInnerHTML`.
- TipTap and admin client components are only referenced by `/admin` routes; they are absent from the homepage, product-index, and Blog-index client manifests.
- Vercel Blob stores image bytes; PostgreSQL stores only URL and file metadata.
