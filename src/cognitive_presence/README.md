Set up the environment
=============

#. Create the environment from the ``environment.yml`` file:

   .. code::

      conda env create -f environment.yml

Connect to DB
=============
Data is stored in [PostgreSQL](https://www.postgresql.org/). We connect to the database through db.py using the [psycopg2](https://www.psycopg.org/) library.

#. Create a ``.credentials`` folder in ``root/``.

#. Copy and paste your credentials into ``.credentials/db_cred.txt``. It should look like this:

   .. code::

      Host: <url>
      Port: <number>
      Database: <name>
      User: <string>
      Password: <string>

