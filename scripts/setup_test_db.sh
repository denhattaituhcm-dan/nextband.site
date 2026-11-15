#!/bin/bash
service postgresql start
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'postgres';"
sudo -u postgres psql -c "CREATE DATABASE nextband_test;" || true
sudo -u postgres psql -d nextband_test -c "CREATE EXTENSION IF NOT EXISTS pgcrypto;"
sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/g" /etc/postgresql/16/main/postgresql.conf
echo "host all all 127.0.0.1/32 trust" >> /etc/postgresql/16/main/pg_hba.conf
echo "host all all ::1/128 trust" >> /etc/postgresql/16/main/pg_hba.conf
echo "host all all all trust" >> /etc/postgresql/16/main/pg_hba.conf
service postgresql restart
