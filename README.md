# React/Node.js/Express.js/MySQL Boilerplate

This boilerplate was created to gain a better understanding of JWT and to add scalability and flexibility for small to medium-sized projects. I currently use this as my go-to boilerplate for full-stack Node/Express.js projects. Please understand that this was made with a pure focus on functionality and features, not the UI. So, please bear with the UI.

### Note!

Feel free to remove any tools like MUI, MySQL2 as the app structure is flexible and scalable.

## Features:

1. CRUD-ready, decoupled React and Node/Express app

2. Reliable custom JWT authentication with access token and refresh token mechanism

3. "Stay signed in" option which stores the refresh token in a HTTP-only secure cookie

4. Memoized API requests to reduce unwanted rerenders

5. Cache management and initial render handled by TanStack query

6. Vite.js React app with TypeScript

7. Ready to deploy with a few changes for production

8. Tested React production build in Apache server and Express app using PM2 module

9. Scalable MVC structure for Express.js

10. Private assets directory secured with authentication middleware

11. Basic password authentication with Bcrypt

12. Used MySQL2 plugin as it provides a better opportunity to master SQL (best to use prepared statements)

13. Used Context API to store the access token and secure protected routes

14. Followed REST API principles

15. Optimized the code as much as I can using the DRY pattern

16. Easy switch between development and production

## Prerequisites:

This project requires several components in order to run. Let's start with the server.

### Server:

1. The JWT algorithm is RS256, hence it requires an RSA key pair. To generate one, install OpenSSL or download it from SOURCEFORGE (https://sourceforge.net/projects/openssl/). Follow the steps below to generate a key by yourself using OpenSSL.

   (**credits**: ygotthilf)

   ```bash
   ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
   # Don't add passphrase
   openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
   cat jwtRS256.key
   cat jwtRS256.key.pub
   ```

   Save both keys in the **server/certs** directory.

2. An encryption key for the AES-256-CBC algorithm is needed. You can get it in several ways, but for simplicity, you can use this website (https://generate-random.org/encryption-key-generator) to get a 256-bit key. Store that key in a .env file as AES_ENC_KEY.

3. Check out the **.env.example** for other values.

4. Install MySQL/MariaDB or use the XAMPP server.

5. Create a database with any name. For example: **node_express_boiler_plate**.

6. Create a table called 'user'.

7. Use this schema for the user table,

   ```bash
   CREATE TABLE user (
       id int NOT NULL AUTO_INCREMENT,
       u_user_id varchar(255) DEFAULT '',
       u_name varchar(255) NOT NULL,
       u_email varchar(255) NOT NULL,
       u_mobile bigint(20) NULL,
       u_password varchar(255) NULL,
       u_image varchar(150) DEFAULT '',
       u_status int(11) DEFAULT 1,
       u_deleted_status int(11) DEFAULT 0,
       u_created_at timestamp DEFAULT current_timestamp(),
       u_updated_at timestamp NULL,
       PRIMARY KEY(id)
   );
   ```

8. Insert a row for the initial user account,

   ```bash
   INSERT INTO user (u_user_id, u_name, u_email, u_mobile, u_password, u_image) VALUES (CONCAT('UID', FLOOR(100000000 + RAND() * 899999999)), 'Dev', 'developer@gmail.com', '9411111111', '$2y$10$veKVq0kHaVuMBN84Fj27u.eM4Fd4/e8DlreDsj6I1XOtmdVNjRS7O', '');
   ```

   I have given this hash for the default password (Test@2024).

9. Create a **user account** in MySQL or simply use root.

### Frontend (React):

Create **.env.local and .env.production** files in the frontend directory and add the 3 values below in it as per your requirement.

1. VITE_PUBLIC_URL (acts as the public/base URL for the React app)

2. VITE_BASENAME (to provide a base path for the React app in case if you are going to run it in a sub-directory)

3. VITE_API_PUBLIC_URL (base URL of the API server)

## Installation:

1. Create a folder for the app.

   ```bash
   mkdir react-node-express-mysql-jwt-boilerplate
   ```

2. Navigate to the folder and clone the repository.

   ```bash
   cd react-node-express-mysql-jwt-boilerplate
   git clone https://github.com/rkrishdev/react-node-express-mysql-jwt-boilerplate .
   ```

3. Follow the **prerequisites**.

4. Navigate to each individual directory (frontend and server), and install the necessary packages.

   ```bash
   cd frontend
   npm install
   cd ../server
   npm install
   ```

5. In the root of the server folder, create two separate folders: **private** and **public**.

6. Before running the app, ensure the MySQL service is running.

7. Run the React app in development mode.

   ```bash
   cd ../frontend
   npm run dev
   ```

8. Run the Express server.

   ```bash
   cd ../server
   npm run server
   ```

9. Open your browser and navigate to **http://localhost:5173/** for the **React app** and **http://localhost:5010/** for the **Express.js server**.

## Production

To deploy this app on a production server, you need to perform additional steps. **Since you might be using any server for production, I will show you some common important steps based on my experience, but without SSL.**

I use the Apache web server for serving the React production build and for reverse proxying the Node server running on port 5010.

1. Build the React app.

   ```bash
   cd ../frontend
   npm run build
   ```

2. Navigate to the dist folder and create a **.htaccess** file. This will serve the React app on all routes. Without this, if you navigate to a route other than the landing page, you will encounter a 404 error.

   ```bash
   RewriteEngine On
   RewriteBase /
   RewriteRule ^index\.html$ - [L]
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]
   ```

3. Navigate to the **httpd/conf.d** directory of your production server and create a new conf file for the Express app. Add a virtual host like this. Note: react-node-express-boilerplate is the directory where I will be storing the React production build with the .htaccess.

   ```bash
   <VirtualHost domain.com:80>
       ServerName domain.com
       DocumentRoot "/var/www/html/react-node-express-boilerplate"

       ProxyPreserveHost On
       ProxyPass /api http://domain.com:5010/api
       ProxyPassReverse /api http://domain.com:5010/api

       ProxyPass /storage http://domain.com:5010/storage
       ProxyPassReverse /storage http://domain.com:5010/storage

       ProxyPass /storage/private http://domain.com:5010/storage/private
       ProxyPassReverse /storage/private http://domain.com:5010/storage/private
   </VirtualHost>
   ```

4. Install the PM2 module or your preferred tool, and run the Node/Express.js server.

5. Navigate to domain.com, and you will see the React app running.

Note: Only the API and storage routes will be handled by the Node/Express app. You can add other routes as aliases if you want.
