import pandas as pd
import sqlite3

def return_table():
    #set up sqlite
    connection = sqlite3.connect('flix_shows.db')
    df=pd.read_sql_query("select * from flix_genz",connection)
    return df 