## Community Forum with Authentication made with MERN

Simple community forum with authentication made with MERN(MongoDB, Express, React, Node.js)

### Getting started

create .env file at root.

```
NODE_ENV=development
PORT=5000
MONGO_URI=YOUR_MONGODBATLAS_URI
JWT_SECRET=RANDOM_STRING
```

1. `npm install`
2. `npm install --prefix frontend`
3. `npm run dev`

### Production

1. used heroku https://www.heroku.com/
2. at project config vars, set

```
NODE_ENV=production
MONGO_URI=YOUR_MONGODBATLAS_URI
JWT_SECRET=YOUR_JWT_SECRET
```

### Notes

don't forget to add 0.0.0.0/0 for MongoDBAtlas allowed ip before deploying
