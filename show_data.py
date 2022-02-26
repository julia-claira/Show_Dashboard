import pandas as pd
import sqlite3

def return_table(region,gender,generation):
    #set up sqlite
    connection = sqlite3.connect('flix.db')
    
    
    #assemble query
    option_count=0
    sql_query="select * from flix_shows"
    
    if region!='all' or gender!='all' or generation!='all':
        sql_query=sql_query+" where"
    
    if region!='all': 
        sql_query=sql_query+f" viewing_country='{region}'"
        option_count=1
    if gender!='all':
        if option_count>0: sql_query=sql_query+" and"
        sql_query=sql_query+f" gender='{gender}'"
        option_count=1
    if generation!='all':
        if option_count>0: sql_query=sql_query+" and"
        sql_query=sql_query+f" generation='{generation}'"
        
    print(sql_query)
    df=pd.read_sql_query(sql_query,connection)
    
    return df 