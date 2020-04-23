# sssf-project
This is the final project repository for the Server-Side Scripting Frameworks course at the Metropolia UAS. 

## Building the App
Clone the repository into a folder on your machine

### Server
1. In a terminal / cmd navigate to the server folder inside the repository and install all dependencies like this:
```bash
cd server
npm install
```
2. Create a .env file inside the server directory with the following contents
```
DB_URL=[URL_TO_MONGODB]
JWT=[JWT_STRING]
```
3. Now in the terminal run the server like this
```bash
node server.js
``` 

### Client
1. In a terminal / cmd navigate to the server folder inside the repository and install all dependencies like this:
```bash
cd server
npm install
```
2. Now run the client with the following command
```bash
npm start
```
