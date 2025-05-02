
# MediChain - Smart Healthcare Appointment System

A comprehensive full-stack healthcare appointment system with modern features like teleconsultation, AI-based doctor recommendations, emergency consultations, and more.

## Features

- Responsive and modern UI with an intuitive design
- Patient, doctor, and admin dashboards
- Appointment booking with real-time availability
- Emergency consultation service with immediate access to available doctors
- Health records management
- Comprehensive doctor search with multiple filtering options
- Authentication system with role-based access

## Tech Stack

- **Frontend**: React.js, TypeScript, Tailwind CSS, shadcn-ui components
- **Backend**: Node.js, Express.js (to be implemented)
- **Database**: MongoDB (to be implemented)
- **State Management**: React Context API, TanStack Query
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React

## Project Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd medichain
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## Backend Setup (Coming Soon)

The backend is currently being implemented. It will use:

- Express.js for the API server
- MongoDB for the database
- JWT for authentication

To run the backend once implemented:

```bash
cd server
npm install
npm start
```

## Testing The Application

### User Credentials for Testing

You can use the following test credentials to explore different user roles:

1. **Patient Account**:
   - Email: any email without "doctor" or "admin" in it (e.g., `test@example.com`)
   - Password: any password (for demo purposes)

2. **Doctor Account**:
   - Email: any email with "doctor" in it (e.g., `doctor@example.com`)
   - Password: any password (for demo purposes)

3. **Admin Account**:
   - Email: any email with "admin" in it (e.g., `admin@example.com`)
   - Password: any password (for demo purposes)

### Key Pages to Test

- **Landing Page**: Explore the features and information
- **Emergency Consultation**: Test the emergency doctor consultation flow
- **Doctor Listing**: Browse and filter doctors
- **Registration/Login**: Test account creation and authentication
- **Dashboards**: Explore different dashboards based on user roles

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── ui/           # Base UI components from shadcn
│   ├── dashboard/    # Dashboard-specific components
│   └── navigation/   # Navigation components
├── contexts/         # React context providers
├── hooks/            # Custom React hooks
├── layouts/          # Layout components
├── lib/              # Utility functions and libraries
├── pages/            # Page components
│   └── dashboard/    # Dashboard pages
└── main.tsx          # Entry point
```

## Future Enhancements

- Implement the backend API with Express.js and MongoDB
- Add real-time chat functionality for doctor-patient communication
- Integrate Twilio for video consultation
- Implement AI-powered symptom checker
- Add payment processing with Stripe/Razorpay
- Enable multi-language support
- Implement voice navigation for accessibility
- Add wearable device integration

## License

[MIT License](LICENSE)
