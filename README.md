# 👋 Welcome to <b>PrintHub!!</b>

## Set up the development environment
Make sure you have <b>Node.js</b> & <b>npm</b> (Node Package Manager) v18.18.0 and <b>Composer</b> installed on your system.
### On Windows OS
Get Node.js and npm v18.18.0 from the official website (https://nodejs.org/) and Composer from the official Laravel website (https://getcomposer.org/).
### On Linux/Ubuntu OS
#### Install Node Version Manager
<pre>
  <code>curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash</code>
  <code>source ~/.zshrc</code>
  <code>export NVM_DIR="$HOME/.nvm"</code>
  <code>[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"</code>
  <code>[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"</code>
</pre>
## Verify Node Version Manager is installed
<pre>
  <code>nvm</code>
</pre>

## Install a node version
<pre>
  <code>nvm ls-remote</code>
  <code>nvm install [version]</code>
  <code>nvm use [version]</code>
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
  <code>sudo apt install apache2 php libapache2-mod-php php-curl php-xml php-dom</code>
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

## Upgrade npm version to the latest
<pre>
  <code>npm install npm@latest</code>
</pre>
## Create the Laravel project
<pre>
  <code>composer create-project laravel/laravel printhub</code>
  <code>cd printhub</code>
</pre>

## Configure the .env file
Configure the <code>.env</code> file in the root of your Laravel project based on your database credentials and other necessary settings.

## Install Laravel dependencies
Run the following command to install Laravel dependencies:
<pre>
  <code>composer install</code>
  <code>composer update</code>
</pre>

## Include React into the Laravel project
Run the following command to install React:
<pre>
  <code>npm install create-vite</code>
  <code>npm install @vitejs/plugin-react</code>
  <code>npm install react@latest react-dom@latest</code>
</pre>

## Build React assets
<pre>
  <code>npm install</code>
</pre>

## Run Laravel development server
In two terminals run the following commands:
<pre>
  <code>npm run printhub</code>
</pre>

# How to proceed
Create React components in <code>resources/js/components/name.jsx</code>

Create React pages in <code>resources/js/pages/page.jsx</code>, in each of them add the necessary if's to control where the components will be displayed.

Import each component in <code>resources/js/app.js</code>

Create a view in <code>resources/views/name.blade.php</code> and add the following line in the head of the HTML:
<pre>
  <code>@vite("resources/js/app.js")</code>
</pre>

To create a route URL for a view add a similar code in <code>routes/web.php</code> file:
<pre>
  <code>Route::get('/url', function () {
    return view('view_name without .blade.php');
  });</code>
</pre>

# For developers
Clone this repository, create a <code>.env</code> file and configure it, there will be a template of <code>.env</code> in <code>.env.example</code> file.

Run the following commands:
<pre>
  <code>composer install</code>
  <code>npm install create-vite</code>
</pre>

## Run Laravel development server
In two terminals run the following commands:
<pre>
  <code>npm run dev</code>
</pre>
<pre>
  <code>php artisan serve</code>
</pre>
