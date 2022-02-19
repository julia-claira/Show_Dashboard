import pandas as pd

def return_table():
    my_dict={"Pets":["Freya","Alexander"],"Color":["White","Gray"]}
    return pd.DataFrame(my_dict)