# CricApp - Cricket Live Score Application

A modern, responsive web application for tracking cricket matches, scores, and player statistics in real-time.

## Features

- Live match scores and updates
- Detailed scorecards with batting and bowling statistics
- Player profiles with career statistics
- Player vs. player matchup analysis
- Real-time match updates with visual indicators
- Advanced statistics with interactive visualizations
- Dark mode support for comfortable viewing
- Fully responsive design for all devices

## Technologies Used

- React 19
- React Router 7
- Tailwind CSS 3.4
- Recharts for data visualization
- Vite 6 (for fast development and bundling)

## Live Demo

Visit the live application: [CricApp Live](https://cricapp-live.vercel.app)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/cricapp.git
   cd cricapp
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

### Production Build

To create a production build:

```
npm run build
```

The build files will be located in the `dist` directory and can be deployed to any static hosting service.

## Deployment

The application is currently deployed on Vercel. To deploy your own instance:

1. Fork this repository
2. Sign up for an account on [Vercel](https://vercel.com)
3. Create a new project and connect your GitHub repository
4. Deploy with the following settings:
   - Framework Preset: Vite
   - Build Command: npm run build
   - Output Directory: dist

## Project Structure

```
src/
├── assets/       # Static assets
├── components/   # Reusable UI components
│   ├── layout/   # Layout components
│   ├── matches/  # Match-related components
│   ├── players/  # Player-related components
│   ├── scorecard/ # Scorecard components
│   ├── search/   # Search components
│   ├── testing/  # Testing utilities (dev only)
│   └── ui/       # Common UI components
├── context/      # React context providers
├── pages/        # Page components
├── services/     # API and service functions
├── utils/        # Utility functions
└── App.jsx       # Main application component
```

## Testing

The application includes comprehensive testing utilities that are available in development mode:

- Browser compatibility detection
- Accessibility testing
- Performance measurement

To access these tools when running in development mode, look for the testing icon in the bottom left corner of the application.

## Accessibility

CricApp is built with accessibility in mind:
- Proper keyboard navigation
- ARIA attributes for screen readers
- Semantic HTML structure
- Color contrast compliance

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
