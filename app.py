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

# import function
from .show_data import return_table


# In[3]:


app=Flask(__name__)


# In[4]:


hello_dict={"Hello":"World"}


# In[10]:


@app.route("/")
def home():
    return render_template("index.html")
    #a={"Table":[5,2,6],"Test":['candy','toys','tacos']}
    #return "4"
    #return return_table().to_json(orient="table")


# In[6]:


# Create api route for ml data by REGION
@app.route("/api/region", methods=["GET"])
def apiml():
      
    region = request.args.get("region", type=str)
    gender = request.args.get("gender", type=str)
    generation = request.args.get("generation", type=str)
    #return ('cooco')
    return return_table(region,gender,generation).to_json(orient='records')


# In[12]:


@app.route("/jsonify")
def rt():
    return return_table().to_json(orient='records')


# In[14]:


if __name__=="__main__":
    app.run(debug=True)


# In[ ]:




