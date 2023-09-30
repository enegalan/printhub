# 👋 Welcome to <b>PrintHub!!</b>

## Set up the development environment
Make sure you have <b>Node.js</b> & <b>npm</b> (Node Package Manager) v18.18.0 and <b>Composer</b> installed on your system.
### On Windows OS
Get Node.js and npm v18.18.0 from the official website (https://nodejs.org/) and Composer from the official Laravel website (https://getcomposer.org/).
### On Linux/Ubuntu OS
#### Install Node.js & npm
<pre>
  <code>sudo apt update</code>
  <code>sudo apt install nodejs npm</code>
</pre>
Verify Node.js & npm are correctly installed
<pre>
  <code>node -v</code>
  <code>npm -v</code>
</pre>
#### Install composer
<pre>
  <code>sudo apt install composer</code>
</pre>
Verify composer is correctly installed
<pre>
  <code>composer</code>
</pre>
#### Set up web server and PHP
<b>Laravel</b> requires a web server like <b>Apache2</b> or <b>Nginx</b> and <b>PHP</b>.
<pre>
  <code>sudo apt install apache2 php libapache2-mod-php</code>
</pre>
Enable the Apache rewrite module for Laravel:
<pre>
  <code>sudo a2enmod rewrite</code>
</pre>
### Install mariadb:
<pre>
  <code>sudo apt install mariadb-server</code>
  <code>sudo systemctl start mariadb</code>
  <code>sudo systemctl enable mariadb</code>
  <code>sudo mysql_secure_installation</code>
</pre>

## Create the Laravel project
<pre>
  <code>composer create-project --prefer-dist laravel/laravel printhub</code>
  <code>cd printhub</code>
</pre>

## Configure the .env file
Configure the <code>.env</code> file in the root of your Laravel project based on your database credentials and other necessary settings.

## Install Laravel dependencies
Run the following command to install Laravel dependencies:
<pre>
  <code>composer install</code>
</pre>

## Include React into the Laravel project
Run the following command to install React in <code>js/react</code> directory:
<pre>
  <code>npx create-react-app js/react</code>
</pre>

## Set up Laravel Mix to build React
Edit the <code>webpack.mix.js</code> file in the root of the Laravel project to include the React build. Add the following lines to the file:
<pre>
  <code>mix.react('resources/js/react-app/src/index.js', 'public/js')
   .sass('resources/sass/app.css', 'public/css');</code>
</pre>
This indicates to Laravel Mix to compile the React code and styles and place them in the <code>public/js</code> and <code>public/css</code> folders.

## Build React assets
<pre>
  <code>npm install</code>
  <code>npm run dev</code>
</pre>
This will compile the React JavaScript and CSS files and place them in the <code>public/js</code> and <code>public/css</code> folders.

## Run Laravel development server
<pre>
  <code>php artisan serve</code>
</pre>
