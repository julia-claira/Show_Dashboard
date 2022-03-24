import pandas as pd
from .app import db
from sqlalchemy.sql import text

#function does an sql query by gender
def return_gender_table(region,generation,category,gender):
    
    #set up sqlite
    #connection = sqlite3.connect('flix.db')
    connection = db

    #assemble query

    if region=='all' or generation=='all':
        sql_query=f"select gender,title, sum(cast(replace(view,',','') as integer)) as views, genre \
        from flix_shows where gender='{gender}'"
    else:
         sql_query=f"select gender,title,cast(replace(view,',','') as integer) as views, genre \
         from flix_shows where gender='{gender}'"
        
    if region!='all': 
        sql_query=sql_query+f"and viewing_country='{region}'"
        option_count=1
    if generation!='all':
        sql_query=sql_query+f"and generation='{generation}'"
    if category!='all':
        sql_query=sql_query+f"and category='{category}'"
        
    
    sql_query=sql_query+" group by title order by views desc"
        
    print(sql_query)
    df=pd.read_sql_query(sql_query,connection)
    
    #this is working but need to have views add up on group by but I want to keep the comma as well"
    
    return df 

#function sorts genre into main and subcategory
def sort_gender_table(df2):  

    genre_main=[]
    genre_sub=[]


    for row in df2.itertuples():
        cat=str(row[4]).split('|')
        genre_sub_temp=""
        if (len(cat)>1):
            if(cat[1]==' Netflix' or cat[1]==' Disney+' or cat[1]==' Hulu' or cat[1]==' HBO Max' \
               or cat[1]==' HBO' or cat[1]==' Amazon'):
                genre_main.append(cat[2])
                if (len(cat)>2):
                    for i in range(3,len(cat)):
                        genre_sub_temp=genre_sub_temp+(cat[i])
                else: 
                    genre_sub.append("")
            else:
                genre_main.append(cat[1])
                if (len(cat)>1):
                    for i in range(2,len(cat)):
                        genre_sub_temp=genre_sub_temp+(cat[i])
                else:
                    genre_sub.append("")
        else:
            genre_main.append("")
        genre_sub.append(genre_sub_temp)

    df2['genre_main']=genre_main
    df2['genre_sub']=genre_sub
    
    return df2 

#main function
def get_gender_data(region,generation,category):

    
    df=return_gender_table(region,generation,category,'men')
    df3=sort_gender_table(df)
    men_df=df3[['gender','title','views','genre_main','genre_sub']] 

    df=return_gender_table(region,generation,category,'women')
    df3=sort_gender_table(df)
    women_df=df3[['gender','title','genre_main','genre_sub','views']] 
    
    #concatinate df
    m_w_concat_df=pd.concat([men_df, women_df], axis=0).reset_index()
    m_w_concat_df.drop(['index'], axis = 1, inplace = True) 
    m_w_concat_df
    
    return  m_w_concat_df