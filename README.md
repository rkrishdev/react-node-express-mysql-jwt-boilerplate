# React/Node.js/Express.js/MySQL boilerplate

I made this boilerplate to get better understanding with JWT and to add scalability and flexibility for small to medium sized projects. And also to use this as the goto boilerplate for full stack node/express.js app currently for me. Understand that I made this with focus on pure functionality and features not the UI. So please bear with the UI.

## Features:

1. CRUD ready decoupled react and node/express app

2. Reliable custom JWT authentication with access token and refresh token mechanism

3. Stay signed in option which stores the refresh token in a http only secure cookie

4. Memoised api requests to reduce unwanted rerenders

5. Good caching and initial render because of the use of TanStack query 

6. Vite js React app with TypeScript

7. Ready to deploy with few changes for production

8. Tested React production build in Apache server and express app using pm2 module

9. Scalable MVC structure for express.js

10. Private assets directory secured with authentication middleware

11. Basic password authentication with Bcrypt

12. Used MySQL2 plugin as it provides better opportunity to master SQL (best to use prepared statements)

13. Used Context Api to store the access token and secure protected routes

14. Followed REST api principles

15. Optimized the code as much I can using DRY pattern

16. Easily switch between development and production

## Prerequisites:

This project requires several things in order to run. Let's start with server.

### Server:

1. The JWT algorithm is RS256 hence it requires a RSA key pair. To generate one install OpenSSL or download it from SOURCEFORGE (https://sourceforge.net/projects/openssl/). Follow the below steps to generate a key by yourself using OpenSSL.

    ```bash
    ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
    # Don't add passphrase
    openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
    cat jwtRS256.key
    cat jwtRS256.key.pub
    ```

Save both keys in **server/certs** directory.

(**credits**: [ygotthilf](https://gist.github.com/ygotthilf/baa58da5c3dd1f69fae9))

2. An encryption key for AES-256-CBC algorithm. You can get it by several ways but for simplicity you can use this website (https://generate-random.org/encryption-key-generator) to get a 256 bit key. Store that key in a .env file as AES_ENC_KEY.

3. Checkout the **.env.example** for other values.

4. Install MySQL/MariaDB or use xampp server.

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

8. Insert a row for initial user account,

    ```bash
    INSERT INTO user (u_user_id, u_name, u_email, u_mobile, u_password, u_image) VALUES (CONCAT('UID', FLOOR(100000000 + RAND() * 899999999)), 'Dev', 'developer@gmail.com', '9411111111', '$2y$10$veKVq0kHaVuMBN84Fj27u.eM4Fd4/e8DlreDsj6I1XOtmdVNjRS7O', '');
    ```

    I have given this hash for default password (Test@2024).

9. Create a **user account** in MySQL or simple use root.

### Frontend (React):

Create **.env.local and .env.production** files in the frontend directory and add below 3 values in it as per you requirement.

1. VITE_PUBLIC_URL (acts as the public/base url for react app)

2. VITE_BASENAME (to provide base path for the react in case if you are going to run in a sub-directory)

3. VITE_API_PUBLIC_URL (base url of the api server)

## Installation:

1. Create a folder for the app

    ```bash
    mkdir react-node-express-mysql-jwt-boilerplate
    ```

2. Go to the folder and clone the repository,

    ```bash
    cd react-node-express-mysql-jwt-boilerplate
    git clone https://github.com/rkrishdev/react-node-express-mysql-jwt-boilerplate .
    ```

3. Follow the prequisites.

4. Go to each individual directories (frontend and server),

    ```bash
    cd frontend
    npm install
    cd server
    npm install
    ```

5. Before running the app make sure the MySQL service is running.

6. Run the react app in development.

    ```bash
    cd frontend
    npm run dev    
    ```

6. Run the express server.

    ```bash
    cd server
    npm run server
    ```

7. Open your browser and go to http://localhost:5173/ for the react app and http://localhost:5010/ for the server

## Production

To deploy this app in production server, you need to do additional steps. Since you might be using any server for production, I will be show you some important steps based on mine but without SSL.

I use apache web server for serving the react production build and reverse proxying the node server running on port 5010.

1. Build the react app.

    ```bash
    cd frontned
    npm run build
    ```

2. Go to the dist folder and create a .htaccess file. This will serve the react app in all routes because without this if you go to some other route other than landing page you will get 404 error.

    ```bash
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
    ```

3. Go to the httpd/conf.d directory of your production server and create a new conf file for the express app. Add virtual host like this. Note! react-node-express-boilerplate is the directory where I will be storing the react production build with the .htaccess.

    ```bash
    <VirtualHost domain.com:80>
        ServerName domain.com
        DocumentRoot "/var/www/html/react-node-express-boilerplate"

        ProxyPreserveHost On
        ProxyPass /api http://domain.com:5010/api
        ProxyPassReverse /api http://domain.com:5010/api

        ProxyPass /static/assets http://domain.com:5010/static/assets
        ProxyPassReverse static/assets http://domain.com:5010/static/assets

        ProxyPass /static/private http://domain.com:5010/static/private
        ProxyPassReverse static/private http://domain.com:5010/static/private
    </VirtualHost>
    ```

4. Install pm2 module or your preferred tool and run the node/express.js server.

5. Go to domain.com you will see the react app running.

Note! only api and static routes will be handled by the node/express app. You can add other routes if you want as alias.