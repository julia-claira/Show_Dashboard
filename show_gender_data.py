    import pandas as pd
    import sqlite3

#function does an sql query by gender


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