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
import os




# In[3]:


app=Flask(__name__)


# In[4]:


from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '') or "sqlite:///flix.db"

# remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Create database variable
db = SQLAlchemy(app)

# import function
from .show_data import return_table
from .show_gender_data import get_gender_data

# In[10]:


@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/test", methods=["GET"])
def testl():
    hello_dict={"Hello":"World"}
    return jsonify(hello_dict)


# Create api route for ml data by REGION
@app.route("/api/region", methods=["GET"])
def apiml():
      
    region = request.args.get("region", type=str)
    generation = request.args.get("generation", type=str)
    category = request.args.get("category", type=str)

    return return_table(region,'all',generation,category).to_json(orient='records')


# Create api route for data by gender
@app.route("/api/gender", methods=["GET"])
def apigender():

    region = request.args.get("region", type=str)
    generation = request.args.get("generation", type=str)
    category = request.args.get("category", type=str)
    
    return get_gender_data(region,generation,category).to_json(orient='records')
    #return jsonify(get_gender_data(region,generation,category))
    


@app.route("/jsonify")
def rt():
    return return_table().to_json(orient='records')


# In[14]:


if __name__=="__main__":
    app.run(debug=False)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)


# In[ ]:




