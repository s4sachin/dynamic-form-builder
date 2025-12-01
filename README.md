# Dynamic Form Builder

A production-grade, full-stack TypeScript application for rendering dynamic forms with real-time validation, submission handling, and comprehensive data management with an interactive table view.

## 🚀 Features

### Core Functionality
- **Dynamic Form Rendering**: Forms automatically generated from JSON schema definitions
- **7 Field Types Supported**: Text, Number, Select, Multi-Select, Date, Textarea, Switch
- **Real-time Validation**: Dual-layer validation (client-side with Zod, server-side verification)
- **Smart Form Submission**: Loading states with spinner, success modal, and auto-redirect
- **Interactive Submissions Table**: View all submissions with pagination, sorting, and expandable rows
- **Type-Safe Architecture**: End-to-end TypeScript with shared types between frontend and backend

### User Experience
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Loading States**: Skeleton screens during data fetching
- **Toast Notifications**: Real-time feedback for all user actions
- **Error Handling**: Comprehensive error states with retry mechanisms
- **Navigation**: Seamless client-side navigation between form and submissions view
- **Success Feedback**: Beautiful modal with blur overlay on successful submission

### Data Management
- **Persistent Storage**: Submissions stored in-memory (easily adaptable to database)
- **Pagination**: Efficient data loading with configurable page sizes (10, 20, 50)
- **Sorting**: Ascending/descending sort by submission date
- **Expandable Details**: Click rows to view full submission data
- **Demo Data**: 13 realistic employee submissions pre-loaded

## 🏗️ Architecture

### Frontend Architecture
```
React 19 + TypeScript
├── TanStack Query - Server state & caching
├── TanStack Form - Form state & validation
├── TanStack Table - Advanced data table
├── Tailwind CSS 4 - Utility-first styling
└── Vite - Lightning-fast build tool
```

**Key Design Patterns:**
- Custom React hooks for API interactions (`useFormSchema`, `useSubmissions`, `useSubmitForm`)
- Component composition with field-specific renderers
- Optimistic updates with query invalidation
- Controlled form components with validation feedback

### Backend Architecture
```
Node.js + Express 5 + TypeScript
├── Controllers - HTTP request handlers
├── Services - Business logic layer
├── Validators - Zod schema validation
├── Middleware - Error handling & CORS
└── Data Layer - In-memory storage with file persistence
```

**Key Design Patterns:**
- Layered architecture (routes → controllers → services)
- Centralized error handling middleware
- Schema-driven validation
- Type-safe API contracts with shared types

### Data Flow
```
User Input → TanStack Form → Zod Validation (Client)
    ↓
API Request → Express Router → Controller
    ↓
Zod Validation (Server) → Service Layer → Data Storage
    ↓
Response → TanStack Query Cache → UI Update → Success Modal
```

## 📋 Prerequisites

- **Node.js**: >= 18.x
- **npm**: >= 9.x

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/s4sachin/dynamic-form-builder.git
cd form-builder
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development
APP_STAGE=dev

# CORS Configuration
CORS_ORIGIN=http://localhost:5173

# Logging
LOG_LEVEL=info

# Data Directory
DATA_DIR=./data
```

### Frontend Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_STAGE=dev

# API Endpoints
VITE_API_FORM_SCHEMA_ENDPOINT=/api/form-schema
VITE_API_SUBMISSIONS_ENDPOINT=/api/submissions

# Feature Flags
VITE_ENABLE_DEMO_MODE=false

# UI Configuration
VITE_TOAST_POSITION=top-right
VITE_LOG_LEVEL=info
```

## 🚀 Running the Application

### Development Mode

#### Terminal 1 - Backend Server

```bash
cd backend
npm run dev
```

The backend will start at `http://localhost:3000`

#### Terminal 2 - Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will start at `http://localhost:5173`

### Production Build

#### Backend

```bash
cd backend
npm run build
npm start
```

#### Frontend

```bash
cd frontend
npm run build
npm run preview
```

## 📁 Project Structure

```
form-builder/
├── backend/
│   ├── data/                    # Data storage
│   │   ├── formSchema.json      # Form definition (also in src/data/formSchema.ts)
│   │   └── submissions.json     # Stored submissions (also in src/data/submissions.ts)
│   ├── src/
│   │   ├── data/                # Embedded data for serverless
│   │   │   ├── formSchema.ts    # Form schema as TypeScript
│   │   │   └── submissions.ts   # In-memory submissions store
│   │   ├── controllers/         # Route handlers
│   │   │   ├── formController.ts
│   │   │   └── submissionController.ts
│   │   ├── middleware/          # Express middleware
│   │   │   └── errorHandler.ts
│   │   ├── routes/              # API routes
│   │   │   ├── formRoutes.ts
│   │   │   └── submissionRoutes.ts
│   │   ├── services/            # Business logic
│   │   │   ├── formService.ts
│   │   │   └── submissionService.ts
│   │   ├── types/               # TypeScript types
│   │   │   ├── api.ts
│   │   │   ├── form.ts
│   │   │   └── submission.ts
│   │   ├── validators/          # Zod schemas
│   │   │   └── formValidation.ts
│   │   ├── app.ts               # Express app (for serverless)
│   │   └── server.ts            # Server entry point
│   ├── api/                     # Vercel serverless functions
│   │   └── index.ts
│   ├── vercel.json              # Vercel deployment config
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── api/                 # API client
│   │   │   └── client.ts
│   │   ├── components/          # React components
│   │   │   ├── fields/          # Form field components
│   │   │   │   ├── TextField.tsx
│   │   │   │   ├── NumberField.tsx
│   │   │   │   ├── SelectField.tsx
│   │   │   │   ├── MultiSelectField.tsx
│   │   │   │   ├── DateField.tsx
│   │   │   │   ├── TextAreaField.tsx
│   │   │   │   └── SwitchField.tsx
│   │   │   ├── FormRenderer.tsx      # Dynamic field renderer
│   │   │   ├── SubmissionsTable.tsx  # TanStack Table component
│   │   │   ├── Skeleton.tsx          # Loading skeletons
│   │   │   ├── EmptyState.tsx        # Error states
│   │   │   └── Toast.tsx             # Toast notifications
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── useFormSchema.ts
│   │   │   ├── useSubmissions.ts
│   │   │   └── useSubmitForm.ts
│   │   ├── pages/               # Page components
│   │   │   ├── FormPage.tsx          # Form submission page
│   │   │   └── SubmissionsPage.tsx   # Data table page
│   │   ├── schemas/             # Validation schemas
│   │   │   └── validation.ts
│   │   ├── types/               # TypeScript types
│   │   │   ├── api.ts
│   │   │   ├── form.ts
│   │   │   └── submission.ts
│   │   ├── App.tsx              # Main app with navigation
│   │   └── main.tsx             # Entry point
│   ├── vercel.json              # Vercel deployment config
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── docs/                        # Comprehensive documentation
│   ├── API.md
│   ├── DEPLOYMENT.md
│   ├── TESTING_PLAN.md
│   └── prd-compliance-guide.md
├── REQUIREMENTS_COMPLIANCE_ANALYSIS.md
└── README.md
```

## 🔌 API Endpoints

### GET /api/health
Health check endpoint

**Response:**
```json
{
  "status": "ok",
  "message": "Form Builder API is running",
  "environment": "dev"
}
```

### GET /api/form-schema
Retrieve the form schema definition

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "employee-onboarding",
    "title": "Employee Onboarding Form",
    "description": "Please fill out all required information",
    "fields": [...]
  }
}
```

### POST /api/submissions
Submit form data

**Request Body:**
```json
{
  "formId": "employee-onboarding",
  "data": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    ...
  }
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "sub_123e4567-e89b-12d3-a456-426614174000",
    "createdAt": "2025-12-01T10:30:00.000Z"
  }
}
```

**Validation Error Response (400):**
```json
{
  "success": false,
  "error": "Validation failed",
  "errors": {
    "firstName": ["Minimum 2 characters"],
    "email": ["Invalid format"]
  }
}
```

### GET /api/submissions
Retrieve paginated submissions

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page - 10, 20, or 50 (default: 10)
- `sortOrder`: 'asc' or 'desc' (default: 'desc')

**Response:**
```json
{
  "success": true,
  "data": {
    "submissions": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3,
      "hasNextPage": true,
      "hasPreviousPage": false
    }
  }
}
```

## 🎨 Form Field Types

The application supports 7 field types with comprehensive validation:

| Field Type | Validation Options | UI Component |
|------------|-------------------|--------------|
| `text` | minLength, maxLength, regex | Text input |
| `number` | min, max | Number input |
| `select` | options (required) | Dropdown select |
| `multi-select` | options, minSelected, maxSelected | Multi-select dropdown |
| `date` | minDate | Date picker |
| `textarea` | minLength, maxLength | Text area |
| `switch` | - | Toggle switch |

## 🔧 Customizing the Form

Edit `backend/data/formSchema.json` to modify the form structure:

```json
{
  "id": "your-form-id",
  "title": "Your Form Title",
  "description": "Form description",
  "fields": [
    {
      "id": "fieldId",
      "name": "fieldName",
      "type": "text",
      "label": "Field Label",
      "placeholder": "Enter text...",
      "required": true,
      "validation": {
        "minLength": 2,
        "maxLength": 50
      }
    }
  ]
}
```

After modifying the schema, restart the backend server or use the cache invalidation function.

## 🧪 Testing

### Type Checking

```bash
# Backend
cd backend
npm run type-check

# Frontend
cd frontend
npm run type-check
```

### Testing API Endpoints

```bash
# Health check
curl http://localhost:3000/api/health

# Get form schema
curl http://localhost:3000/api/form-schema

# Submit form
curl -X POST http://localhost:3000/api/submissions \
  -H "Content-Type: application/json" \
  -d '{"formId":"employee-onboarding","data":{"firstName":"John","lastName":"Doe","email":"john@example.com","department":"engineering","joinDate":"2025-12-15","experience":5,"skills":["javascript","typescript"],"agreeToTerms":true}}'

# Get submissions
curl http://localhost:3000/api/submissions?page=1&limit=10&sortOrder=desc
```

## 📦 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **TypeScript** - Type safety
- **Zod** - Schema validation
- **uuid** - Unique ID generation
- **custom-env** - Environment management

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **TypeScript** - Type safety
- **TanStack Query** - Server state management
- **TanStack Form** - Form state management
- **TanStack Table** - Data table
- **Tailwind CSS** - Styling
- **Zod** - Validation
- **Lucide React** - Icons
- **react-hot-toast** - Notifications
- **date-fns** - Date utilities

## 🔒 Security Considerations

- **Input Validation**: All inputs validated on both client and server
- **CORS**: Configurable origin restrictions
- **Type Safety**: End-to-end TypeScript prevents runtime errors
- **XSS Protection**: React's built-in escaping
- **Error Handling**: Sensitive information not exposed in errors

## 🚀 Deployment

The application is deployed on **Vercel** with automatic CI/CD:

### Live URLs
- **Frontend**: [https://frontend-h87969pd4-bodhis-projects-772f3d96.vercel.app](https://frontend-h87969pd4-bodhis-projects-772f3d96.vercel.app)
- **Backend API**: [https://form-uilder-backend-q48s2ti2r-bodhis-projects-772f3d96.vercel.app](https://form-uilder-backend-q48s2ti2r-bodhis-projects-772f3d96.vercel.app)

### Deployment Architecture
- **Backend**: Vercel Serverless Functions with embedded data
- **Frontend**: Static site with SPA routing
- **Data Storage**: In-memory (persists during function lifecycle)

### CI/CD Pipeline
1. Push code to GitHub (`main` branch)
2. Vercel automatically detects changes
3. Backend deploys from `/backend` root directory
4. Frontend deploys from `/frontend` root directory
5. Environment variables managed in Vercel dashboard

### Local Deployment Setup

#### Backend Deployment
```bash
cd backend
vercel link  # Link to existing project
vercel --prod
```

#### Frontend Deployment
```bash
cd frontend
vercel link  # Link to existing project
vercel --prod
```

### Environment Variables (Production)

Set these in Vercel dashboard for each project:

**Backend:**
- `NODE_ENV=production`
- `PORT=3000`
- `CORS_ORIGIN=https://your-frontend.vercel.app`

**Frontend:**
- `VITE_API_BASE_URL=https://your-backend.vercel.app`

## 🎯 Key Technical Decisions

### Why TanStack Query?
- Automatic caching and background refetching
- Optimistic updates for better UX
- Built-in loading and error states
- Eliminates need for global state management

### Why TanStack Form?
- Type-safe form state management
- Field-level validation with Zod integration
- Minimal re-renders for better performance
- Built-in dirty/touched state tracking

### Why TanStack Table?
- Column sorting and pagination out-of-the-box
- Expandable rows for detailed views
- Fully customizable and type-safe
- Lightweight with no styling dependencies

### Why Embedded Data for Serverless?
- Vercel serverless functions have read-only filesystem
- Embedding data as TypeScript ensures availability
- Faster cold starts (no file I/O)
- Suitable for demo/prototype applications

### Why Zod for Validation?
- Schema-first approach with TypeScript inference
- Single source of truth for validation rules
- Works on both client and server
- Better error messages than built-in validation

## 🚀 Deployment

### Backend Deployment

1. Set environment variables for production
2. Build the application: `npm run build`
3. Run: `npm start`
4. Use a process manager like PM2 for production

### Frontend Deployment

1. Set production environment variables
2. Build: `npm run build`
3. Deploy the `dist/` folder to static hosting (Vercel, Netlify, etc.)
4. Configure API base URL to point to production backend

## 📝 License

MIT

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Support

For issues and questions, please open an issue in the repository.

---

**Built with ❤️ using modern TypeScript and React**
