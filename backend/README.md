# PayTM Clone Backend

## 1. Setting up the project locally

Install the required dependencies
```bash
cd backend
npm install
```

## 2. Creating a new config.js file

Create a new file name "config.js" file in the root directory and add the following content to it
```bash
module.exports = {
    mongo_url : "your mongo instance url",
    JWT_SECRET : "your jwt secret key",
}
```
Use `sample.js` as a reference

## 3. Running the server

Run the server using the following command
```bash
node index.js
```
