# Neon Speed Frontend

A modern, responsive React speed test dashboard using Framer Motion, Recharts, and Bootstrap.

## Features

- ⚡ **Real-time Speed Testing**: Download, upload, and ping measurement
- 📊 **Live Charts**: Real-time visualization of speed test progress
- 🎨 **Modern UI**: Glassmorphism design with gradient effects
- 📱 **Responsive**: Works on desktop, tablet, and mobile
- 🚀 **Fast.com Logic**: Accurate speed measurement using multiple file sizes
- ⏱️ **Animated Results**: Smooth animations while testing

## Installation

```bash
npm install
```

## Running

**Development**:

```bash
npm start
```

**Production Build**:

```bash
npm run build
```

**Testing**:

```bash
npm test
```

The app will run on `http://localhost:3000` by default.

## Configuration

Create a `.env` file in the frontend directory to customize:

```env
# Backend API URL
REACT_APP_API_URL=http://localhost:5000

# Optional: Analytics, API keys, etc.
```

## How It Works

### Speed Testing Flow

1. **User clicks "RUN TEST"** button
2. **Ping Test**: Measures latency (round-trip time)
3. **Download Test**:
   - Downloads 1MB, 5MB, 10MB files sequentially
   - Measures total time and calculates Mbps
4. **Upload Test**:
   - Uploads 1MB, 5MB data chunks
   - Measures total time and calculates Mbps
5. **Results Display**: Shows final speeds with real-time animation

### Speed Calculation

```
Speed (Mbps) = (Total Bytes × 8 bits) / (Time in seconds) / 1,000,000
```

Example:

- Downloaded 10MB in 2 seconds
- Speed = (10,000,000 × 8) / 2 / 1,000,000 = **40 Mbps**

## Components

### App.js

Main component handling all speed testing logic:

- `measurePing()`: Tests latency
- `measureDownloadSpeed()`: Tests download speed with multiple file sizes
- `measureUploadSpeed()`: Tests upload speed with multiple data chunks
- `runTest()`: Orchestrates all tests and animations

### Styling

- `index.css`: All styling including glass panels, gradients, and responsive design
- Bootstrap 5: Grid system and utility classes
- Custom CSS variables for theming

## UI Components

### MiniCard

Displays quick stats (Download, Upload, Ping, Status):

```javascript
<MiniCard title="Download" value="125.45 Mbps" icon={<Download />} />
```

### InfoCard

Shows server/location info:

```javascript
<InfoCard title="Server" value="Local" icon={<Server />} />
```

### Speed Display

Shows the main speed value with animations:

```
125.45
Mbps
```

### Chart

Real-time area chart showing speed progression using Recharts.

## Key Features Explained

### Progressive File Sizes

Tests different file sizes for accuracy:

- 1MB: Quick feedback, measures pure throughput
- 5MB: Stabilizes TCP connection, tests sustained speed
- 10MB: Measures true network capacity

### Animation

Uses Framer Motion for smooth value transitions:

- Speed numbers animate from 0 to final value
- Scale and opacity animations for visual feedback
- 80ms update interval for smooth motion

### Error Handling

- Catches network errors and shows alert
- Validates response data
- Ensures non-negative speed values
- User-friendly error messages

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: Latest versions

## Performance

- Zero external dependencies for speed testing logic
- Optimized rendering with React hooks
- Efficient state management
- No polling or unnecessary re-renders

## Responsive Design

**Desktop** (1200px+):

- 4 columns for top cards
- Full-width charts
- Large text display (110px)

**Tablet** (768px - 1199px):

- Flexible layout
- Adjusted font sizes

**Mobile** (<768px):

- Single/dual column layout
- Smaller font sizes (70px for main speed)
- Full-width button
- Optimized padding

## Troubleshooting

### Backend Not Found

1. Make sure backend is running on port 5000
2. Check `.env` REACT_APP_API_URL
3. Browser console for CORS/network errors

### Inaccurate Speeds

- Ensure backend is on same network/machine
- Close bandwidth-consuming apps
- Run multiple tests
- Check actual network speed elsewhere

### UI Issues

- Clear browser cache (Ctrl+Shift+Delete)
- Check console for CSS errors
- Ensure Bootstrap is loaded

### Animation Lag

- Reduce test interval from 80ms to 100ms+ in App.js
- Check browser performance
- Disable browser extensions

## Development

### Adding New Tests

1. Create new test function (e.g., `measureJitterTest`)
2. Add to `runTest()` flow
3. Update state and UI
4. Add new info card

### Customizing Colors

Edit `index.css` and update:

```css
--primary-cyan: #00f7ff;
--primary-purple: #9d4edd;
--secondary-blue: #6ecfff;
```

### Changing Test Sizes

In `App.js`, update arrays in `measureDownloadSpeed()` and `measureUploadSpeed()`:

```javascript
const testSizes = [500 * 1024, 2 * 1024 * 1024, 5 * 1024 * 1024]; // 500KB, 2MB, 5MB
```

## Dependencies

- **react**: UI library
- **react-dom**: React DOM rendering
- **framer-motion**: Animations
- **recharts**: Charts library
- **lucide-react**: Icons
- **bootstrap**: CSS framework

## Advanced Configuration

### Custom Backend URL

For production:

```env
REACT_APP_API_URL=https://your-backend.com
```

### Proxy (Development)

In `package.json`:

```json
"proxy": "http://localhost:5000"
```

This automatically proxies API requests during development.

## License

MIT

## Support

For issues or improvements:

1. Check the backend is running
2. Test the API directly with cURL
3. Check browser console for errors
4. Review network tab in DevTools
