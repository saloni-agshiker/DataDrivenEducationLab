Connect to DB
=============

#. Copy and paste your credentials into ``.credentials/db_cred.txt``:

   .. code::

      Host: <url>
      Port: <number>
      Database: <name>
      User: <string>
      Password: <string>

#. Create the environment from the ``environment.yml`` file:

   .. code::

      conda env create -f environment.yml
