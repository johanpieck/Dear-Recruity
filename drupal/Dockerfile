#
# ---- Builder image ----
FROM composer as composer

COPY scripts/composer /app/scripts/composer
COPY composer.json composer.lock /app/

RUN composer install --ignore-platform-reqs --prefer-dist --optimize-autoloader --no-dev --no-suggest

#
# ---- Release image ----
FROM php:7.2-apache

RUN a2enmod rewrite

# install the PHP extensions we need
RUN apt-get update && apt-get install -y \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libpng-dev \
        mysql-client \
    && docker-php-ext-install -j$(nproc) mbstring opcache pdo pdo_mysql zip \
    && docker-php-ext-configure gd --with-gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ --with-png-dir=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd \
    && apt-get purge -y libfreetype6-dev libjpeg62-turbo-dev libpng-dev \
    && rm -rf /var/lib/apt/lists/*

# set recommended PHP.ini settings
# see https://secure.php.net/manual/en/opcache.installation.php
RUN { \
		echo 'opcache.memory_consumption=128'; \
		echo 'opcache.interned_strings_buffer=8'; \
		echo 'opcache.max_accelerated_files=4000'; \
		echo 'opcache.revalidate_freq=60'; \
		echo 'opcache.fast_shutdown=1'; \
		echo 'opcache.enable_cli=1'; \
	} > /usr/local/etc/php/conf.d/opcache-recommended.ini

RUN echo 'date.timezone=Europe/Brussels' > /usr/local/etc/php/conf.d/timezone.ini

WORKDIR /var/www/html

COPY --from=composer /app /var/www/html
COPY . .

RUN mkdir /var/www/html/web/sites/default/files/styles

RUN chown -R www-data:www-data web/sites

VOLUME ["/var/www/html/web/sites/default/files/styles"]

ENV APACHE_DOCUMENT_ROOT /var/www/html/web

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf \
    && sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf
