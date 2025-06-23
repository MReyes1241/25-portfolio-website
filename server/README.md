# Portfolio Contact Server

A Node.js/Express backend server for handling contact form submissions with email notifications.

## Features

- ✅ Contact form validation
- ✅ Rate limiting (5 requests per 15 minutes)
- ✅ Email notifications to admin
- ✅ Auto-reply to users
- ✅ Spam detection
- ✅ Security middleware
- ✅ Clean modular architecture
- ✅ Vite-compatible frontend integration

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

### 3. Email Configuration

#### For Gmail:
1. Enable 2-Factor Authentication
2. Generate App Password:
   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Choose "Mail" as the app, and "Other" (or your device) as the device
   - Use the generated password for `EMAIL_PASS`

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password-here
ADMIN_EMAIL=your-notification-email@gmail.com
```

### 4. Start the Server

Development mode:
```bash
pnpm dev
```

Production mode:
```bash
pnpm start
```

### 5. Frontend Configuration (Vite)

Add to your frontend `.env` file:
```env
VITE_API_URL=http://localhost:5050
```

And use in code:
```ts
const API_BASE_URL = import.meta.env.VITE_API_URL;
```

## API Endpoints

### POST /api/contact
Submit contact form data.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Hello",
  "message": "Your message here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully!"
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "uptime": 1234.56
}
```

## Project Structure

```
server/
├── server.js              # Main server file
├── routes/
│   ├── contact.js         # Contact form routes
│   └── health.js          # Health check routes
├── services/
│   └── emailServices.js   # Email handling logic
├── middleware/
│   └── validation.js      # Input validation and spam detection
├── .env.template          # Environment variables template
├── .env                   # Your environment variables (create this)
├── package.json           # Dependencies and scripts
└── README.md              # This file
```

## Email Templates

The server sends two types of emails:

1. **Admin Notification**: Sent to you when someone submits the form
2. **User Auto-Reply**: Confirmation sent to the person who submitted the form

Both are nicely formatted HTML templates with branding and quick-reply links.

## Security Features

- **Rate Limiting**: 5 requests per 15 minutes per IP
- **Input Validation**: Sanitizes and validates all inputs
- **Spam Detection**: Detects repeated characters, spammy phrases, and excess links
- **CORS**: Configured to allow frontend (e.g., `http://localhost:5173`)
- **Helmet**: Adds secure headers to Express responses

## Troubleshooting

### Email Authentication Issues
- Use an App Password if using Gmail
- Check for typos or whitespace in `.env`
- Make sure `EMAIL_USER` and `EMAIL_PASS` match the account sending the email

### CORS Issues
- Update `FRONTEND_URL` in `.env` to match your frontend's port
- Restart the server after changing CORS settings

### Admin Email Not Arriving
- Check spam/junk folder
- Make sure you're not sending "from yourself to yourself" on Outlook
- Use a different email for `ADMIN_EMAIL` (like a Gmail account)

## Environment Variables

| Variable        | Description                     | Example                         |
|----------------|---------------------------------|---------------------------------|
| `PORT`         | Server port                     | `5050`                          |
| `NODE_ENV`     | Environment type                | `development`                   |
| `FRONTEND_URL` | Frontend URL for CORS           | `http://localhost:5173`         |
| `EMAIL_USER`   | Email account to send from      | `your-email@gmail.com`          |
| `EMAIL_PASS`   | App password or real password   | `your-app-password`             |
| `ADMIN_EMAIL`  | Email address to receive alerts | `you@domain.com`                |

## Deployment

1. Set env vars in production (`.env` or cloud secrets)
2. Set `NODE_ENV=production`
3. Set `FRONTEND_URL` to your deployed frontend domain
4. Use a real mail service with proper credentials
5. Run the server with:
```bash
pnpm start
```

## Next Steps

- [ ] Add email templates customization
- [ ] Add database logging of submissions
- [ ] Add unit tests
- [ ] Add TypeScript support
- [ ] Maybe Add support for more email providers (e.g., Mailgun)
- [ ] Add email queue system for async delivery
