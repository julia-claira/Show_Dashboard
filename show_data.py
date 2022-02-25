import pandas as pd
import sqlite3

def return_table(region):
    #set up sqlite
    connection = sqlite3.connect('flix.db')
    df=pd.read_sql_query(f"select * from flix_shows where viewing_country='{region}'",connection)
    return df 