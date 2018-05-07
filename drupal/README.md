# Dear Recruity CMS

## Local development

### Getting started

```
cp init/docker/local/docker-compose.yml docker-compose.yml;
cp .dist.env .env;
docker-compose up -d;
docker cp ./init/demo/files/. $(docker-compose ps -q web):/var/www/project/web/sites/default/files/
docker-compose exec web chmod -R 777 /var/www/project/web/sites/default/files/
```

Using your own .env file is recommended, to avoid port collisions.

Also, install the required libraries with Composer. You can do this either outside
or inside the Docker container.

```
composer install
```

OR

```
docker-compose exec web composer install
```


By default, the local setup uses these ports: 8080, 80 and 443. Ensure they
are not yet in use on your system.

When succesful, you should be able to visit the following URLs (the default, look at the .env file!):

* The Drupal website (without Varnish): http://dear-recruity-cms.local

Should you get a name collision error by the browser, add the above urls to your hosts file.

### Importing/exporting changes

To import new changes, which are committed to `./config/sync`, execute the following command in the root of the application (= location of the docker-compose.yml file):

```
docker exec -i `docker-compose ps -q web` ./vendor/bin/drush cim -y
```

Similarly, execute the following to export changes:

```
docker exec -i `docker-compose ps -q web` ./vendor/bin/drush cex -y
```