to run:

cd into server directory and run 'npm start'
cd into client directory and run 'npm run dev'

if you face an accessToken error, go to ./server/routes/authRoutes.js and change the port number to the port the client is running on. It should work after.
