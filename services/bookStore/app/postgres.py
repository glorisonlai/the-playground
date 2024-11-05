import os
import psycopg2

pg_host_ = os.environ['PG_HOST']
pg_db_ = os.environ['PG_DB']
pg_user_ = os.environ['PG_USER']
pg_pass_ = os.environ['PG_PASS']

pg_host = pg_host_ if pg_host_ else 'localhost'
pg_db = pg_db_ if pg_db_ else 'postgres'
pg_user = pg_user_ if pg_user_ else 'postgres'
pg_pass = pg_pass_ if pg_pass_ else 'postgres'

class PostgresClient():
    def __init__(self, host, db, user, password):
        self.host = host
        self.db = db
        self.user = user
        self.password = password
        self.conn = None

    def __enter__(self):
        self.conn = psycopg2.connect(
            host = self.host, 
            database = self.db,
            user=self.user,
            password=self.password)
        return self.conn

    def with_cursor(self, func):
        def with_cursor_(self, *args, **kwargs):
            cursor = self.conn.cursor()
            try:
                rv = func(cursor, *args, **kwargs)
            except Exception as e:
                raise e
            finally:
                cursor.close()

            return rv
        return with_cursor_

    def __exit__(self, ec_type, exc_val, exc_tb):
        if exc_tb is None:
            print("committing...")
            self.conn.commit()
        else:
            print("rollback...")
            self.conn.rollback()
        print("closing...")
        self.conn.close()
