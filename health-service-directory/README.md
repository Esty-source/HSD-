# Health Service Directory

A modern, full-stack healthcare platform for Cameroon, built with React, Vite, and Supabase.

## Project Overview

The Health Service Directory is a web and mobile-friendly platform that allows users to:
- Find doctors, clinics, and pharmacies
- Book appointments
- Access telemedicine services
- Manage health records
- View health resources and tips
- Get emergency contacts and support
- Receive notifications

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **State Management:** React Context, useState, useEffect
- **Routing:** React Router
- **Icons:** Heroicons

## Features Implemented
- Responsive web and mobile layouts
- Mobile-optimized pages for Home, Find Doctors, Pharmacies, Emergency, Resources, and more
- Doctor, patient, and admin dashboards
- Appointment booking and management
- Health records management
- Emergency contacts and facilities
- Health resources (articles, videos, guides)
- Notifications system
- Authentication (login, signup, protected routes)
- Supabase integration for all core data (doctors, patients, appointments, resources, notifications, etc.)

## Backend Integration
- All core features use Supabase for data storage and authentication
- Database schema includes: profiles, appointments, resources, notifications, pharmacies, and more
- Some admin/analytics features use mock data as fallback (to be replaced with live queries)
- RLS (Row Level Security) policies are in place for data protection

## Mobile Responsiveness
- All main pages are mobile-optimized
- Dedicated mobile layouts/components for key flows
- Navigation and UI/UX adapted for touch devices

## Current Progress
- Most core features are implemented and functional
- Emergency and Resources pages are now mobile-optimized
- Backend integration is present for all main features
- Some admin/analytics features still use mock data (to be improved)
- Ongoing improvements to mobile responsiveness and UI/UX

## Next Steps
- Replace all mock data with live Supabase queries in admin/analytics
- Finalize mobile parity for all pages
- Add more tests and error handling
- Polish UI/UX for both web and mobile
- Expand documentation and usage instructions

## Getting Started
1. Clone the repo
2. Install dependencies: `npm install`
3. Set up your Supabase project and environment variables
4. Run the app: `npm run dev`

---

*This project is under active development. For questions or contributions, please open an issue or pull request.*
