# Ayuursport - Football News Website

Ayuursport is a modern football news website focused on providing comprehensive coverage of football news with a special emphasis on Moroccan football. The name "Ayuursport" combines "ayuur" (meaning "moon" in the Moroccan Berber language) with "sport" to create a unique brand identity.

## Features

- **Latest Football News**: Stay updated with the most recent football news from around the world
- **Match Center**: View upcoming fixtures, live scores, and match results
- **Team Profiles**: Detailed information about football teams
- **Player Profiles**: Information about football players
- **Admin Dashboard**: Comprehensive content management system for articles, matches, and categories

## Tech Stack

- **Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS
- **Data Fetching**: Axios
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

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

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment to Vercel

### Step 1: Push to GitHub

1. Create a new repository on GitHub
2. Initialize Git in your project folder (if not already done)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/ayuursport.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Sign up or log in to [Vercel](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: (leave as default)
   - Output Directory: (leave as default)

### Step 3: Set Environment Variables

In the Vercel project settings, add the following environment variables:

- `NEXT_PUBLIC_FOOTBALL_API_KEY`: Your football-data.org API key
- `NEXT_PUBLIC_NEWS_API_KEY`: Your newsapi.org API key
- `NEXT_PUBLIC_USE_MOCK_DATA`: Set to "true" if you want to use mock data instead of API calls (useful for development or when API limits are reached)

## API Usage Notes

### Football-data.org (Free Tier)
- 12 competitions
- Basic data (Fixtures, Results, and League Tables)
- 10 API calls per minute
- API Key: Add to Vercel environment variables

### NewsAPI.org
- Limited requests on free tier
- Requires paid plan for production use
- API Key: Add to Vercel environment variables

## Admin Dashboard

The admin dashboard is accessible at `/admin` and allows you to:

- Create, edit, and delete articles
- Manage match fixtures and results
- Organize content categories

## Project Structure

- `/src/app`: Next.js app router pages
- `/src/components`: Reusable UI components
  - `/ui`: Basic UI components
  - `/layout`: Layout components
  - `/admin`: Admin dashboard components
- `/src/lib`: Utilities and services
  - `api-service.ts`: API integration with football-data.org and newsapi.org
  - `data-service.ts`: Data processing and transformation
  - `data-context.tsx`: React context for state management
  - `mock-data.ts`: Fallback data when API limits are reached
- `/src/types`: TypeScript type definitions
- `/src/utils`: Helper functions

## Future Enhancements

- User authentication
- Comments and social sharing
- Advanced statistics and visualizations
- Mobile app integration
- Subscription-based premium content

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Football data provided by [football-data.org](https://www.football-data.org/)
- News content from [newsapi.org](https://newsapi.org/)
