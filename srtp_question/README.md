# Psychological Testing

This is the repo for graduation project of Qiuran Hu: a psychological testing website.

## How to run?
First install Node.js, MongoDB and Yarn(NPM is also fine). Start a MongoDB service locally.

Change the NPM source to some source in China.

Go to the server folder, run "yarn install" (or "npm install --legacy-peer-deps") and then "yarn start"(or "npm start").

Create a .env file in server folder. The content should be:

PORT=9000

PUBLIC_URL=http://localhost:3000

SECRET=this-is-a-secret

NODE_ENV=development

Then go to client foleder, run "yarn install" (or "npm install --legacy-peer-deps") and then "yarn start"(or "npm start"). 
You should be able to see the login page.

Font files in the font folder should be installed in your system. 