import pandas as pd
import sqlite3

def return_table(region,gender,generation):
    #set up sqlite
    connection = sqlite3.connect('flix.db')
    df=pd.read_sql_query(f"select * from flix_shows where viewing_country='{region}' \
    and gender='{gender}' and generation='{generation}'",connection)
    return df 