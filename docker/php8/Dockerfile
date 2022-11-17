ARG image
ARG tz

FROM $image

RUN ln -snf /usr/share/zoneinfo/$tz /etc/localtime && echo $tz > /etc/timezone

RUN apt-get update && \
    apt-get install -y \
            zip \
            unzip \
            gnupg \
            libmagickwand-dev \
            libfreetype6-dev \
            libmcrypt-dev \
            libjpeg62-turbo-dev \
            libzip-dev \
            libxml2-dev \
            && rm -rf /var/lib/apt/lists/*

RUN cd / && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN docker-php-ext-install \
    zip \
    intl \
    pdo_mysql \
    bcmath \
    simplexml \
    sockets \
    opcache \
    exif \
    && docker-php-ext-configure gd --with-freetype=/usr/include/ --with-jpeg=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd

RUN docker-php-ext-enable sockets

# Install imagick
RUN yes | pecl install imagick && docker-php-ext-enable imagick

# Install apcu
RUN yes | pecl install apcu && docker-php-ext-enable apcu \
&& echo "apc.enable_cli=1" > /usr/local/etc/php/conf.d/docker-php-ext-apcu.ini \
&& echo "apc.enable=1" > /usr/local/etc/php/conf.d/docker-php-ext-apcu.ini

# Install xdebug
RUN yes | pecl install xdebug && docker-php-ext-enable xdebug \
&& echo "xdebug.idekey=PHPSTORM" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

# Install Yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get -y install yarn

RUN echo "opcache.enable=1" >> /usr/local/etc/php/conf.d/docker-php-ext-opcache.ini \
&& echo "opcache.enable_cli=1" >> /usr/local/etc/php/conf.d/docker-php-ext-opcache.ini


RUN apt-get install -y exim4
RUN echo 'sendmail_path = /usr/sbin/sendmail -t -i' >> /usr/local/etc/php/php.ini
RUN echo "befree.com" > /etc/mailname
COPY config/exim4/update-exim4.conf.conf /etc/exim4/update-exim4.conf.conf
RUN update-exim4.conf


ENV COMPOSER_ALLOW_SUPERUSER=1
ENV COMPOSER_ALLOW_XDEBUG=0
ENV COMPOSER_DISABLE_XDEBUG_WARN=1
ENV COMPOSER_MEMORY_LIMIT=-1

WORKDIR /var/www/html