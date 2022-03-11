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
from .show_gender_data import get_gender_data


# In[3]:


app=Flask(__name__)


# In[4]:


hello_dict={"Hello":"World"}


# In[10]:


@app.route("/")
def home():
    return render_template("index.html")


# Create api route for ml data by REGION
@app.route("/api/region", methods=["GET"])
def apiml():
      
    region = request.args.get("region", type=str)
    gender = request.args.get("gender", type=str)
    generation = request.args.get("generation", type=str)
    category = request.args.get("category", type=str)

    return return_table(region,gender,generation,category).to_json(orient='records')


# Create api route for data by gender
@app.route("/api/gender", methods=["GET"])
def apigender():
      
    region = request.args.get("region", type=str)
    generation = request.args.get("generation", type=str)
    category = request.args.get("category", type=str)
    
    return return_table(region,generation,category).to_json(orient='records')


@app.route("/jsonify")
def rt():
    return return_table().to_json(orient='records')


# In[14]:


if __name__=="__main__":
    app.run(debug=True)


# In[ ]:




