FROM php:8.2-fpm

# Install dependencies
RUN apt-get update && \
	apt-get install -y \
    	libfreetype-dev \
    	libjpeg62-turbo-dev \
    	libpng-dev \
    	libzip-dev \
    	zlib1g-dev \
    	nodejs \
    	npm && \
	docker-php-ext-configure gd --with-freetype --with-jpeg && \
	docker-php-ext-install -j$(nproc) gd zip pdo_mysql && \
	apt-get clean && \
	rm -rf /var/lib/apt/lists/*

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www/html

COPY . /var/www/html
COPY .env /var/www/html

RUN composer install --no-scripts

RUN npm install

EXPOSE 8000

# Run the application
CMD ["sh", "-c", "npm run printhub_docker"]
