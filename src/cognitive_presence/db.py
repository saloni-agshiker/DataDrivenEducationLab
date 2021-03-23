import psycopg2
import sys
import os

credentials = {}
credentials_text = open('./.credentials/db_cred.txt', 'r')
lines = credentials_text.readlines()
for line in lines:
    key, prop = [w.strip() for w in line.split(":")]
    credentials[key.lower()] = prop

host        = credentials['host']
user        = credentials['user']
port        = credentials['port']
database    = credentials['database']
password    = credentials['password']

os.environ['LIBMYSQL_ENABLE_CLEARTEXT_PLUGIN'] = '1'

#print("host", host)
try:
    conn = psycopg2.connect(host=host, port=port, database=database, user=user, password=password)
    cur = conn.cursor()

    '''
    Get and print a list of tables in the database

    src: https://stackoverflow.com/questions/10598002/how-do-i-get-tables-in-postgres-using-psycopg2
    '''

    cur.execute("select relname from pg_class where relkind='r' and relname !~ '^(pg_|sql_)';")
    query_results = cur.fetchall()
    for result in query_results:
        print(result[0])

except Exception as e:
    print("Database connection failed due to {}".format(e))
