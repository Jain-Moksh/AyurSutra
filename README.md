# AyurSutra - Doctor Dashboard


A modern, responsive dashboard for Ayurvedic practitioners built with React, TypeScript, and Tailwind CSS. This dashboard matches the exact design and functionality shown in the provided image.

## Features

- **Today's Schedule**: View and manage daily appointments with status indicators
- **Patient Management**: Search, filter, and manage patient records
- **Alerts & Notifications**: Real-time notifications for important updates
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Interactive Elements**: Clickable navigation, search functionality, and filters

## Design Elements

- **Color Scheme**: Ayurvedic green theme with cream/beige backgrounds
- **Typography**: Clean, modern Inter font family
- **Layout**: Sidebar navigation with main content area
- **Components**: Cards, tables, buttons, and notification alerts

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd ayursutra-dashboard
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`

### Building for Production

To create a production build:

```bash
npm run build
```

The build files will be in the `build` directory.

## Project Structure

```
src/
├── components/
│   ├── Dashboard.tsx          # Main dashboard layout
│   ├── Sidebar.tsx           # Navigation sidebar
│   ├── Header.tsx            # Top header with user info
│   ├── MainContent.tsx       # Main content wrapper
│   ├── TodaysSchedule.tsx    # Schedule section
│   ├── PatientManagement.tsx # Patient management table
│   └── AlertsNotifications.tsx # Notifications section
├── App.tsx                   # Root component
├── index.tsx                 # Entry point
└── index.css                 # Global styles with Tailwind
```

## Technologies Used

- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Custom Colors**: Ayurvedic-themed color palette

## Customization

The dashboard uses a custom color palette defined in `tailwind.config.js`:

- `ayur-green`: Primary green color (#2D5A27)
- `ayur-light-green`: Lighter green for hover states (#4A7C59)
- `ayur-beige`: Background color (#F5F5DC)
- `ayur-cream`: Main background (#FFF8DC)

## Features Implemented

✅ **Exact Design Match**: Replicated the provided image design
✅ **Responsive Layout**: Works on all screen sizes
✅ **Interactive Navigation**: Clickable sidebar items
✅ **Search Functionality**: Patient search with filters
✅ **Status Indicators**: Appointment status badges
✅ **Notification System**: Alert cards with different types
✅ **Modern UI**: Clean, professional interface
✅ **Accessibility**: Proper contrast and hover states

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is created for demonstration purposes.
