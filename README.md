# Francine Veronica's Christening Invitation

A beautiful, animated christening invitation web page built with Vite for modern web development and optimized deployment.

## Features

- 📱 **Mobile-first design** with snap scrolling sections
- ✉️ **Animated envelope opening** effect
- ⏱️ **Countdown timer** to the event
- 🎨 **Beautiful animations** and transitions
- 📍 **Navigation dots** for easy section jumping
- 🔄 **Touch feedback** for mobile devices

## Project Structure

```
├── index.html              # Main HTML entry point
├── src/
│   ├── js/
│   │   ├── main.js         # Main JavaScript entry
│   │   ├── envelope.js     # Envelope animation module
│   │   ├── countdown.js    # Countdown timer module
│   │   ├── navigation.js   # Section navigation module
│   │   └── touch.js        # Touch feedback module
│   └── styles/
│       ├── main.css        # Main CSS entry (imports all modules)
│       ├── variables.css   # CSS custom properties
│       ├── base.css        # Base/reset styles
│       ├── animations.css  # Animation keyframes
│       ├── sections.css    # Snap section styles
│       ├── navigation.css  # Navigation dots and indicators
│       ├── floating.css    # Floating background elements
│       ├── header.css      # Header section styles
│       ├── cards.css       # Info card styles
│       ├── photo.css       # Photo section styles
│       ├── message.css     # Message section styles
│       ├── rsvp.css        # RSVP button styles
│       ├── countdown.css   # Countdown timer styles
│       ├── footer.css      # Footer styles
│       ├── loader.css      # Page loader styles
│       ├── envelope.css    # Envelope animation styles
│       └── responsive.css  # Responsive breakpoints
├── package.json            # Project dependencies
├── vite.config.js          # Vite configuration
└── .github/
	└── workflows/
		└── deploy.yml      # GitHub Pages deployment
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd christening-invitation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server with hot reload:

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### Build

Create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment to GitHub Pages

### Automatic Deployment (Recommended)

1. Push your code to the `main` branch
2. Go to your repository Settings → Pages
3. Set Source to "GitHub Actions"
4. The workflow will automatically build and deploy on every push to `main`

### Manual Deployment

```bash
npm run deploy
```

This uses `gh-pages` to deploy the `dist` folder to GitHub Pages.

## Customization

### Update Event Details

Edit the following in `index.html`:
- Baby name
- Event date, time, and venue
- Contact information
- RSVP link

### Google Sheets RSVP Sync

RSVP submissions are POSTed to a Google Apps Script Web App, which appends
them as a row in a Google Sheet. To set this up:

1. Create a Google Sheet with header row `Timestamp | Guest Name | Bringing Car`.
2. In it, go to **Extensions → Apps Script** and paste:
   ```javascript
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     var data = JSON.parse(e.postData.contents);
     sheet.appendRow([new Date(), data.guestName, data.bringingCar ? 'Yes' : 'No']);
     return ContentService.createTextOutput(JSON.stringify({ status: 'success' }));
   }
   ```
3. **Deploy → New deployment → Web app**, execute as **Me**, access **Anyone**.
4. Copy the deployment URL into `GOOGLE_SHEET_ENDPOINT` at the top of `src/js/rsvp.js`.

Since Apps Script web apps don't return CORS headers, the site submits with
`fetch(..., { mode: 'no-cors' })`, which means the response can't be read -
the form always shows success once the request is sent, regardless of
whether the script itself succeeded. If RSVPs stop appearing in the sheet,
check the Apps Script deployment is still active and re-check the header
names match what `doPost` expects.

### Update Countdown Date

Edit `src/js/countdown.js` and change the `EVENT_DATE` constant:

```javascript
const EVENT_DATE = new Date('2025-03-01T10:00:00').getTime();
```

### Customize Colors

Edit `src/styles/variables.css`:

```css
:root {
	--primary-pink: #f8b4d9;
	--soft-pink: #fce4ec;
	--deep-rose: #e91e8c;
	--lavender: #e1bee7;
	--soft-purple: #f3e5f5;
	--gold: #d4af37;
	--cream: #fffaf0;
	--text-dark: #4a4a4a;
	--text-light: #7a7a7a;
}
```

## License

This project is for personal use.
