#!/usr/bin/env python
# coding: utf-8

# In[2]:


from flask import Flask,jsonify
import pandas as pd


# In[3]:


app=Flask(__name__)


# In[4]:


hello_dict={"Hello":"World"}


# In[10]:


@app.route("/")
def home():
    a={"Table":[5,2,6],"Test":['candy','toys','tacos']}
    #return "4"
    return jsonify(pd.DataFrame(a).to_json(orient="table"))


# In[6]:


@app.route("/normal")
def normal():
    return hello_dict


# In[12]:


@app.route("/jsonify")
def json():
    return jsonify(hello_dict)


# In[14]:


if __name__=="__main__":
    app.run(debug=True)


# In[ ]:




