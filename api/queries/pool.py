import os
from psycopg_pool import ConnectionPool

# pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])
pool = ConnectionPool("DATABASE_URL")
