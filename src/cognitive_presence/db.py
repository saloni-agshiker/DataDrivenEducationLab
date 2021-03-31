import psycopg2
import sys
import os
import pandas as pd

'''
We expect a db_cred.txt file in ./.credentials folder with the following format:

      Host: <url>
      Port: <number>
      Database: <name>
      User: <string>
      Password: <string>
'''

credentials = {}
credentials_text = open('./.credentials/db_cred.txt', 'r')
lines = credentials_text.readlines()
for line in lines:
    key, prop = [w.strip() for w in line.split(":")]
    credentials[key.lower()] = prop

#os.environ['LIBMYSQL_ENABLE_CLEARTEXT_PLUGIN'] = '1'

try:
    conn = psycopg2.connect(**credentials)
    cur = conn.cursor()

    '''
    Get and print a list of all the tables in the database

    src: https://stackoverflow.com/questions/10598002/how-do-i-get-tables-in-postgres-using-psycopg2
    '''

#    cur.execute("select relname from pg_class where relkind='r' and relname !~ '^(pg_|sql_)';")
#    query_results = cur.fetchall()
#    for result in query_results:
#        print(result[0])


    '''
    We are interested in two tables:
        cs6601_p_anonymized
        cs6601_np_anonymized
    '''
    cur.execute("select * from cs6601_p_anonymized")
    cs6601_p_anonymized = pd.DataFrame(cur.fetchall())

    cur.execute("select * from cs6601_np_anonymized")
    cs6601_np_anonymized = pd.DataFrame(cur.fetchall())

    cur.close()

    '''
    Convert these results into a pandas dataframe
        src:
            https://naysan.ca/2020/05/31/postgresql-to-pandas/
            https://gist.github.com/kunanit/eb0723eef653788395bb41c661c1fa86
    '''

    print(cs6601_p_anonymized)
    print(cs6601_np_anonymized)
    

except Exception as e:
    print("Database connection failed due to {}".format(e))
