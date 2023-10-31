# loc-collective-backend

# About 
This is the API to the front end application [Loc Collective](https://github.com/garnetred/loc-collective).

# Background
[Loc Collective](loccollective.com) is a directory of locticians that allows users can search for locticians based on hair style and location. This works by consuming the Yelp API.
I decided to create this project as a bootcamp student due to the difficulty of finding a loctician as a person with locs. 

I created this API specifically because the API key was exposed on the front-end. This codebase takes requests from the front-end and forwards them to the Yelp API while tacking on the API key in order to make it more secure. 

# Setup
You can clone down the repo by running `git clone` and the SSH url for this repo in your terminal. From there, you can run `npm install` to install any dependencies and dev dependencies. 

To run the server locally, you can use the command `npm run dev`. 

# Testing
To run tests, you can use the commands `npm test` or `jest`. (If you use `jest`, you will need to manually exit out of the tests or use the `--forceExit` flag.)

# Tech Stack 
The following technologies are used for this repository: 
- NodeJS
- Express
- Supertest
- Nock
- Jest
- Render (not Vercel)

# API Endpoints
There are currently three API endpoints, and they are as follows:
- `/api/search`
  - This endpoint is sent a `term` (such as "sisterlocks" or "interlocks") and a `location` in the US (ex. "Boston" or "90210") and then passes that information on to Yelp.  
- `/api/stylist/:id`
  - This endpoint takes in a stylist id, usually when a user navigates to a stylist's page from the list of search results. 
- `/api/reviews/:id`
  - Similar to the endpoint above, it takes in a stylist id in order to shows reviews for a particular stylist. 

# Deployment
This codebase has continuous deployment via Render, so once pull requests are merged to main, they are deployed automatically. 

# Next Steps
I might migrate the front-end of this application from React to NextJS. There are known issues with single-page applications and SEO that I'm currently experiencing. The site shows up in Google searches, but not under the search terms I would like. Using server-side rendering seems like a great way to fix this problem. 
At some point I hope to add mobile responsiveness to the front-end as well. I created additional mobile and tablet designs via Figma but need to build them.  
I would also like to improve error handling on the front-end side. 
  


