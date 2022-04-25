# rick-and-morty

This is the web-application where users can see different characters from Rick And Morty, read the detail about them and favourite them. In order to use the app, please register. 

## Technologies used:

### Front-end:
- React
- Redux toolkit
- TypeScript
- Jest/Testing library

### Back-end:
- Node.js
- TypeScript
- Express
- MySQL
- Prisma (ORM)

## Deployment

The repository consists both, front-end and back-end. In order to run the application locally, clone the repository and follow the steps:

### Back-end
navigate to ```server``` folder.  Add ```.env``` file and include following variables: ```DATABASE_URL``` for database server. (It uses MySQL) and ```JWT_KEY``` for encoding the JWT when user authorizes.
after that, run the following commands:
```bash
  yarn install
  yarn start
```

### Front-end:
navigate to ```client``` folder. Add ```.env``` file and include the following variable: ```REACT_APP_API_URL``` for the base url where the server is running. (If you're running server locally, it should be ```http://localhost:3000/```)
And then, run the following commands:
```bash
  yarn install
  npx prisma migrate dev --name init
  yarn start
```


To run the tests:
```bash
  yarn test
```

