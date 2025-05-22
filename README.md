# Geometry Calculator

A modern, interactive web application for calculating geometric properties of various 2D and 3D shapes. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

### Core Functionality
- Calculate properties of 20+ geometric shapes
- Support for both 2D and 3D shapes
- Real-time calculations
- Automatic input synchronization across related calculations
- Dark mode support
- Responsive design for all screen sizes

### 2D Shapes
- Circle (Area, Circumference)
- Ellipse (Area)
- Square (Area, Perimeter, Diagonal)
- Rectangle (Area, Perimeter, Diagonal)
- Trapezium (Area)
- Parallelogram (Area, Perimeter)
- Rhombus (Area, Perimeter, Side Length)
- Regular Polygon (Area, Perimeter, Inner/Outer Angles)
- Equilateral Triangle (Area, Perimeter)
- Isosceles Triangle (Area, Perimeter)
- Scalene Triangle (Area, Perimeter)
- Right Triangle (Area, Perimeter, Hypotenuse)

### 3D Shapes
- Cube (Volume, Surface Area, Diagonal)
- Box (Volume, Surface Area, Diagonal)
- Sphere (Volume, Surface Area)
- Cylinder (Volume, Surface Area)
- Cone (Volume, Surface Area)
- Regular Prism (Volume, Surface Area)
- Regular Pyramid (Volume)

### User Experience
- Intuitive shape selection interface
- Search functionality for shapes
- Keyboard shortcuts for power users
- Input validation and error handling
- Loading states during calculations
- Clear visual feedback for results
- Dark/Light mode toggle

### Technical Features
- Built with Next.js 15
- TypeScript for type safety
- Tailwind CSS for styling
- Responsive design
- Modern UI components
- Performance optimized
- SEO friendly

## Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [your-repo-url]
cd geometry-calculator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # React components
│   ├── geometry/    # Geometry-specific components
│   └── ui/          # Reusable UI components
├── lib/             # Utility functions and calculations
├── types/           # TypeScript type definitions
└── styles/          # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide Icons](https://lucide.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
