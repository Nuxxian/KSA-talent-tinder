# KSA Talenten - Mobile Talent Discovery App

A mobile-first React application for discovering and exploring talents within KSA Oost-Vlaanderen (scouting organization). Built with React, TypeScript, Tailwind CSS, and Vite.

## Features

### 🎯 Talent Discovery
- **Swipeable Cards**: Interactive card interface similar to popular dating apps
- **Swipe Gestures**: Swipe right for talents that match you, left for those that don't
- **Touch & Mouse Support**: Works on both mobile devices and desktop browsers

### 📱 Mobile-First Design
- **Responsive Layout**: Optimized for mobile devices with desktop fallback
- **Safe Area Support**: Handles notched devices (iPhone X+) with proper safe areas
- **Touch Optimizations**: Enhanced touch interactions and gesture handling
- **Performance**: Smooth animations and transitions on mobile devices

### 🧭 Navigation
- **Bottom Navigation**: Mobile-friendly sticky bottom navigation bar
- **Three Main Sections**:
  - **Home**: Welcome screen with introduction
  - **Ontdek Talenten**: Interactive card swiping interface
  - **Overzicht**: Grid view of all available talents

### 🎨 User Experience
- **Progress Tracking**: Visual progress indicators showing completion status
- **Completion Flow**: Celebration screen when all cards are viewed
- **Accessibility**: Focus management and screen reader support
- **Dark Mode**: Automatic dark mode support based on system preferences

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4.x
- **Build Tool**: Vite
- **State Management**: React hooks (useState)
- **Touch Handling**: Custom swipe gesture implementation

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ksa_tinder2

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Development

```bash
# Run development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint code
pnpm lint
```

## Project Structure

```
src/
├── components/
│   ├── App.tsx              # Main application component
│   ├── Navigation.tsx       # Bottom navigation bar
│   ├── WelcomeScreen.tsx    # Landing/welcome page
│   ├── CardSlider.tsx       # Main card swiping interface
│   ├── SwipeableCard.tsx    # Individual swipeable card component
│   └── TalentOverview.tsx   # Grid view of all talents
├── types.ts                 # TypeScript type definitions
├── index.css                # Global styles and mobile optimizations
├── App.css                  # Component-specific styles
└── main.tsx                 # Application entry point
```

## Mobile Optimizations

### Touch Interactions
- **Swipe Gestures**: Natural touch-based card swiping
- **Touch Feedback**: Visual feedback for button presses and interactions
- **Gesture Prevention**: Prevents unwanted browser gestures during swiping

### Responsive Design
- **Breakpoints**: Mobile-first design with sm: (640px+) breakpoint
- **Flexible Layout**: Cards and content adapt to different screen sizes
- **Safe Areas**: Support for devices with notches and rounded corners

### Performance
- **Hardware Acceleration**: Uses CSS transforms for smooth animations
- **Touch Optimization**: `touch-action: manipulation` for better touch response
- **Reduced Motion**: Respects user's motion preferences

## Customization

### Adding New Talents
Edit the `sampleCards` array in `App.tsx`:

```typescript
const sampleCards: Card[] = [
  {
    id: 1,
    title: "New Talent",
    description: "Description of the talent...",
    color: "bg-gradient-to-br from-color-400 to-color-500",
  },
  // ... more talents
];
```

### Styling
- **Colors**: Update Tailwind color classes for different themes
- **Typography**: Modify text sizes and fonts in component files
- **Layout**: Adjust spacing and sizing using Tailwind utilities

## Browser Support

- **Modern Mobile Browsers**: iOS Safari 12+, Android Chrome 80+
- **Desktop Browsers**: Chrome 80+, Firefox 75+, Safari 13+
- **Progressive Enhancement**: Graceful fallbacks for older browsers

## License

This project is private and intended for KSA Oost-Vlaanderen internal use.

## Contributing

This is an internal project. For questions or suggestions, contact the development team.