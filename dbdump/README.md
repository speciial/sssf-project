# DB DUMP

## Restoring data

First, create a database called game, and create an user in that database witch is dbOwner.
Then in a command prompter, navigate to this folder (dbdump/), and perfom this command (replace HOST, USER, PASSWORD).

```
mongorestore -h HOST -u USER -p PASSWORD -d game ./
```
