## Project Title: Primary Bid URL Shortener

Author: David O'Connor

## Project Description

A React Web app to allow users to enter a URL and receive a shortened URL in return.

The API is a node GraphQL API using MongoDB for persistance.

## Usage

To run the application, in the root directory, run:

```
docker-compose build .
docker-compose up
```

The web app can be accessed via `localhost:3000`.

On the screen will display a list of all existing urls that have been shortened.

URLs can be searched via the text input.

There is also pagination via the +/- buttons at the bottom.

## Testing

Before running tests you should ensure that you have a mongodb instance by running

```
docker-compose up mongodb
```

The tests can then be run by changing to the api directory and running

```
yarn test
```

This will transpile the application and then run the jest tests.

N.B. The tests assume a clean instance of the database. If you have any data in to begin with they will fail on the first run. They do clean up afterwards though so would pass on a second attempt.

This can be prevented by either rerunning the tests or purging the database before running.

## Possible next steps

- I have had an issue getting the web app to connect to the api via docker networking so have used the exposed ports.
- There is no form of security added to the app. A simple JWT login service could be added.
- I have not fully optimised my docker builds to make best use of image caching or to reduce image size.
- The current URL validation is quite strict requiring a protocol. This could probably be relaxed. I have also not tested for dead links.
- I've used very primitive state management to force a refresh after a successful link shortening. This could be improved.
- I've used a mix of styling patterns, mixing styled components, inline styles and global css. A single pattern would be preferable.
- I chose not to use any component package on the front end given that the task requested styling with vanilla css. Use of a component library would be cleaner.
- I haven't used any type of form in the input. For more complicated forms, either react-final-forms or react-hook-forms would be my preferred method.
- The front end structure could be drastically improved. I've created List and Create components under a pages folder even though create isn't really a page. All components are under a single component folder rather than organising them into atoms, molecules etc.
- I've not done much to configure the API, such as disabling introspection or added max depth but this doesn't seem overly necessary for this problem as the graph is limited. I have not configured the cors settings for a production release. It currently allows all for local development.
- I have not performed too much of a stress test on my statistical method of generating a short form url.
- I haven't used any sort of fragments in my GraphQL queries to ensure consistent types.
- I haven't used the graphql schema to import response types to the UI to bring more type safety into the application.
- I haven't done anything to run multiple instances as this is performant enough for local testing.
