#!/usr/bin/env python
# coding: utf-8

# In[2]:


from flask import Flask,jsonify


# In[3]:


app=Flask(__name__)


# In[4]:


hello_dict={"Hello":"World"}


# In[10]:


@app.route("/")
def home():
    return 'Hi'


# In[6]:


@app.route("/normal")
def normal():
    return hello_dict


# In[12]:


@app.route("/jsonify")
def normal():
    return jsonify(hello_dict)


# In[14]:


if __name__=="__main__":
    app.run(debug=True)


# In[ ]:




