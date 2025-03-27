# Ayuursport - The Moon of Moroccan Football

Ayuursport is a modern football news website focused on Moroccan and international football. The name combines "ayuur" (moon in Berber) with "sport" to create a unique identity that celebrates Moroccan heritage.

## Features

- **Latest Football News**: Comprehensive coverage of Moroccan and international football
- **Match Center**: Fixtures, live scores, and results
- **Team & Player Profiles**: Detailed information about teams and players
- **Interactive Polls**: Engage with the community through voting
- **Admin Dashboard**: Content management system for articles, matches, and more

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **Data Fetching**: Axios
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/ayuursport.git
cd ayuursport
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_FOOTBALL_API_KEY=your_football_data_api_key
NEXT_PUBLIC_NEWS_API_KEY=your_news_api_key
NEXT_PUBLIC_USE_MOCK_DATA=true
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Deployment to Vercel

### Step 1: Push to GitHub
Push your project to a GitHub repository.

### Step 2: Connect to Vercel
1. Create an account on [Vercel](https://vercel.com) if you don't have one
2. Click "New Project" and import your GitHub repository
3. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: (leave as default)
   - Output Directory: (leave as default)

### Step 3: Environment Variables
Add the following environment variables in the Vercel project settings:
- `NEXT_PUBLIC_FOOTBALL_API_KEY`: Your football-data.org API key
- `NEXT_PUBLIC_NEWS_API_KEY`: Your newsapi.org API key
- `NEXT_PUBLIC_USE_MOCK_DATA`: Set to "true" if you want to use mock data instead of API calls

### Step 4: Deploy
Click "Deploy" and wait for the build to complete. Vercel will provide you with a URL for your deployed site.

## Project Structure

```
ayuursport/
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js app router pages
│   ├── components/     # React components
│   │   ├── admin/      # Admin dashboard components
│   │   ├── layout/     # Layout components (header, footer)
│   │   └── ui/         # Reusable UI components
│   ├── lib/            # Utility libraries
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Helper functions
├── .env.example        # Example environment variables
├── next.config.js      # Next.js configuration
├── package.json        # Project dependencies
├── postcss.config.js   # PostCSS configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## API Integration

The website integrates with two main APIs:
1. **football-data.org**: For match data, team information, and standings
2. **newsapi.org**: For news articles and headlines

Both APIs have free tiers with limitations. The application is designed to fall back to mock data when API limits are reached or when `NEXT_PUBLIC_USE_MOCK_DATA` is set to "true".

## License

This project is licensed under the MIT License - see the LICENSE file for details.
