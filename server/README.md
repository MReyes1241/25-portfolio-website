# Portfolio Server (Contact + Blog)

A Node.js/Express backend server for handling contact form submissions with email notifications **and** blog post data from a PostgreSQL database.

## Features

- ✅ Contact form validation and email notifications
- ✅ Blog post fetching by ID and category
- ✅ Blog post view counter (increments on read)
- ✅ Rate limiting (5 contact requests per 15 min)
- ✅ Spam detection
- ✅ Security middleware
- ✅ Clean modular architecture
- ✅ Vite-compatible frontend integration

---

## Setup Instructions

### 1. Install Dependencies
```bash
cd server
pnpm install  # or npm install
```

### 2. Environment Configuration
```bash
# Create your .env file
cp .env.template .env

# Then edit it
nano .env
```

### 3. Email Configuration (for Contact API)

#### For Gmail:
1. Enable 2-Factor Authentication  
2. Generate App Password:
   - Google Account → Security → 2-Step Verification → App passwords
   - Choose "Mail" as app and "Other" as device  
   - Use the generated password for `EMAIL_PASS`

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password-here
ADMIN_EMAIL=your-notification-email@gmail.com
```

### 4. PostgreSQL Setup

You must have a PostgreSQL database running. Create a database and a `blog_posts` table with appropriate fields.

Add these to your `.env` file:
```env
PGHOST=localhost
PGPORT=5432
PGUSER=your_postgres_user
PGPASSWORD=your_postgres_password
PGDATABASE=portfolio_blog
```

### 5. Start the Server

Development:
```bash
pnpm dev
```

Production:
```bash
pnpm start
```

---

## Frontend Configuration (Vite)

Add this to your frontend `.env`:
```env
VITE_API_URL=http://localhost:5050
```

Use it in code like:
```ts
const API_BASE_URL = import.meta.env.VITE_API_URL;
```

---

## API Endpoints

### 📨 POST /api/contact
Submit contact form data.

### 🩺 GET /api/health
Health check.

### 📝 GET /api/blog
Fetch list of blog posts.  
Supports filtering by category and tag via query params.

### 📝 GET /api/blog/:id
Fetch a single blog post by ID and increment views.

---

## Project Structure

```
server/
├── server.js              # Main server file
├── routes/
│   ├── contact.js         # Contact routes
│   ├── blog.js            # Blog API routes
│   └── health.js          # Health check
├── db.js                  # PostgreSQL pool setup
├── services/
│   └── emailServices.js   # Email logic
├── middleware/
│   └── validation.js      # Spam/input checks
├── .env.template
└── package.json
```

---

## Blog Features

- Blog post schema includes: title, content, excerpt, author, views, created_at, updated_at, tags, read_time, category
- `/api/blog/:id` increases the view count by 1
- Admin page (coming soon) will allow creation and editing of posts

---

## Security Features

- **Rate Limiting**: 5 contact submissions / 15 mins / IP
- **Input Validation**: Sanitizes and verifies form fields
- **Spam Detection**: Flags suspicious messages
- **CORS**: Restricts to allowed frontend origin
- **Helmet**: Adds secure HTTP headers

---

## Troubleshooting

### Blog Returns 404
- Make sure your DB has posts
- Verify the post ID exists
- Ensure PG credentials in `.env` are correct

### CORS Issues
- Update `FRONTEND_URL` in `.env`
- Restart the server

### Email Not Working
- Use a working Gmail + app password
- Double check `.env` for typos

---

## Environment Variables

| Variable        | Description                     | Example                         |
|----------------|---------------------------------|---------------------------------|
| `PORT`         | Server port                     | `5050`                          |
| `NODE_ENV`     | Environment type                | `development`                   |
| `FRONTEND_URL` | Frontend domain for CORS        | `http://localhost:5173`         |
| `EMAIL_USER`   | Sender email                    | `your-email@gmail.com`          |
| `EMAIL_PASS`   | Gmail app password              | `your-app-password`             |
| `ADMIN_EMAIL`  | Admin receiver address          | `you@domain.com`                |
| `PGHOST`       | PostgreSQL host                 | `localhost`                     |
| `PGPORT`       | PostgreSQL port                 | `5432`                          |
| `PGUSER`       | PostgreSQL user                 | `postgres`                      |
| `PGPASSWORD`   | PostgreSQL password             | `your-password`                 |
| `PGDATABASE`   | PostgreSQL DB name              | `portfolio_blog`                |

---

## Deployment

1. Add environment variables in `.env` or via hosting provider
2. Use a real SMTP email provider
3. Ensure your PostgreSQL database is public or in your same network
4. Set `NODE_ENV=production` and run:
```bash
pnpm start
```

---

## Next Steps

- [ ] Blog Admin Panel for posting/editing/deleting
- [ ] Email template customization
- [ ] Blog comment support
- [ ] Logging and analytics
- [ ] Add TypeScript support
- [ ] Unit and integration tests
- [ ] Async mail queue (e.g., BullMQ)