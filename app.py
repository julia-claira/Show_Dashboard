#!/usr/bin/env python
# coding: utf-8
#search - generation - gender - country
# In[2]:


from flask import (
    Flask,
    render_template,
    jsonify,
    request)
import pandas as pd
#import sqlite3

# import function
from .show_data import return_table
#from .show_gender_data import get_gender_data


# In[3]:


app=Flask(__name__)




@app.route("/")
def home():
    #return 'Hello, World!'
    return return_table
    #return render_template("index.html")


# Create api route for ml data by REGION
@app.route("/api/region", methods=["GET"])
def apiml():
      
    region = request.args.get("region", type=str)
    generation = request.args.get("generation", type=str)
    category = request.args.get("category", type=str)

    #return return_table(region,'all',generation,category).to_json(orient='records')


# Create api route for data by gender
@app.route("/api/gender", methods=["GET"])
def apigender():

    region = request.args.get("region", type=str)
    generation = request.args.get("generation", type=str)
    category = request.args.get("category", type=str)
    
    return get_gender_data(region,generation,category).to_json(orient='records')
    #return jsonify(get_gender_data(region,generation,category))
    



if __name__=="__main__":
    app.run()



# In[ ]:




