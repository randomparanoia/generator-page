# generator-page
### Requirements:
- Node.js 14+ (Using Angular 15 which required at least Node.js 14+);
- Yarn or NPM package manager.

### Description
App consists of two folders: Server + Browser.

Browser has two routes: '/' and '/payments'. It is responsible to consume the data provided by the API;

Server is responsible for creating the codes consumed by the Browser app. It also exposes the following endpoints:
- ```POST``` - ```/payment``` - persists a payment to the database file;
- ```GET``` - ```/code``` - returns the code and grid generated. Accepts a query parameter ?character="{letter}" modifying the grid with 20% of the values based on the given character.
- ```GET``` - ```/codes``` - returns all the codes persisted on the database file.

### Getting started
1 - Install dependencies of each folder;

2 - Run Browser app (starts listening on port 4200):
```shell
    npm run dev or yarn dev
```

3 - Run Server app (starts listening on port 3000):
```shell
    npm run dev or yarn dev
```

4 - Go to http://localhost:4200 and interact with the Browser app Frontend.

### Persisting Data
On the server folder, there is a db.json file that persists all the data submitted in the payments page. If you wish to reset the data just modify the db.json file to an empty array: ```[]``` .