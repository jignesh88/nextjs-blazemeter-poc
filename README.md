# Next.js Blazemeter POC

A proof of concept for Next.js application with Blazemeter performance testing via Taurus and GitHub Actions.

## Features

- Next.js application with sample e-commerce pages
- Taurus configuration for performance testing
- BlazeMeter integration for detailed results
- GitHub Actions workflow for automated testing

## Setup Instructions

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/nextjs-blazemeter-poc.git
   cd nextjs-blazemeter-poc
    
2. Install dependencies
bashnpm install

3, Run the development server
bashnpm run dev

4, Open http://localhost:3000 in your browser

Performance Testing
Local Testing with Taurus

Install Taurus
bashpip install bzt

Generate JMX files
bashcd performance-tests/scripts
./generate-jmx.sh http://localhost:3000

Run tests
bashbzt ../config/login-test.yml

GitHub Actions Integration

Add the following secrets to your GitHub repository:

BZ_TOKEN: Your Blazemeter API key and secret in format key:secret
VERCEL_URL: Your Vercel deployment URL


Trigger tests manually from the GitHub Actions tab or automatically on deployment
View test results in the GitHub Actions artifacts or in your Blazemeter dashboard

Project Structure

/pages - Next.js pages

/api - API routes
/product - Product detail pages


/performance-tests - Taurus and JMX performance testing files

/config - Taurus configuration files
/jmx - JMeter test files
/scripts - Utility scripts for testing


/.github/workflows - GitHub Actions workflow configuration
