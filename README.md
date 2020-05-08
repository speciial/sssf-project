# sssf-project

This is the final project repository for the Server-Side Scripting Frameworks course at the Metropolia UAS.

## Try out online

- [App Link](https://tradinggame.jelastic.metropolia.fi/)
- [Graphiql Link](https://tradinggame.jelastic.metropolia.fi/graphql)

## Building the App locally

Clone the repository into a folder on your machine

### Local mongoDB

1. We included a version of our mongoDB as dumb in the folder dbdump. You can set up a mongod instance as described in this tutorial [Link](https://docs.mongodb.com/manual/tutorial/enable-authentication/).

2. Just like the "test" database in the example, create a db called _game_ with a _game_ user and "readWrite" access.

3. Now in a terminal, navigate to the dbdump folder and run this command after replacing HOST, USER and PASSWORD with your info. Make sure your mongod instance is still running.

```
mongorestore -h HOST -u USER -p PASSWORD -d game ./
```

### Server

1. In a terminal / cmd navigate to the server folder inside the repository and install all dependencies like this:

```bash
cd server
npm install
```

2. Create a .env file inside the server directory with the following contents. Replace the placeholder with you info.

```
DB_URL=[URL_TO_MONGODB]
JWT=[JWT_STRING]
PORT=[PORT]
SOCKET_PORT=[SOCKET_IO_PORT]
```

3. Now in the terminal run the server like this

```bash
npm start
```

4. If you want to see the documentation for our GraphQL models, you can now open a browser navigate to localhost:\[PORT\]/graphiql.
   > Note, that some of our mutations are locked by authentication. If you want to access these, you will have to use Postman and generate an authentication token.

### Client

1. In a terminal / cmd navigate to the client folder inside the repository and install all dependencies like this:

```bash
cd client
npm install
```

2. Now run the development enviroment of the client with the following command

```bash
npm start
```

3. A browser window should open automatically. You can now login and test the app locally. If you are using the local mongoDB, you can try out a user with these credentials ( _he has a bunch of money and materials ;)_ ):

```
username: chad
password: root
```
