from flask import Flask, render_template, redirect, url_for, request, jsonify
from sqlalchemy.engine import create_engine
import joblib
import psycopg2
from flask_cors import CORS
import os

app = Flask(__name__)

CORS(app)

# check if hosted on Heroku, set password and debug
if 'DATABASE_URL' in os.environ:
    pw = os.getenv('PASSWORD')
    debug_value = 'False'
else:
    from config import pw
    pw = pw
    debug_value = 'True'

# set Heroku variables
heroku_db = 'dfq5ifardm38b6'
heroku_user = 'henorakrtnepye'
heroku_host='ec2-34-233-214-228.compute-1.amazonaws.com'

# Heroku database connection
DATABASE_URI = f"postgresql+psycopg2://{heroku_user}:{pw}@{heroku_host}:5432/{heroku_db}"
engine = create_engine(DATABASE_URI)


# landing page
@app.route("/")
def home():
    return render_template("index.html")

# return training data from database as json
@app.route("/api/training_data")
def training_data():
    result = engine.execute("select * from survival")
    rows = result.fetchall()
    result_list = []
    for r in rows:
        result_list.append(dict(r))
    return jsonify(result_list)

# return raw data from database as json
@app.route("/api/clinical_raw")
def clinical_raw():
    result = engine.execute("select * from clinical_raw")
    rows = result.fetchall()
    result_list = []
    for r in rows:
        result_list.append(dict(r))
    return jsonify(result_list)

# return user input data from database as json
@app.route("/api/new_data")
def new_data():
    result = engine.execute("select * from input_data")
    rows = result.fetchall()
    result_list = []
    for r in rows:
       #result_list.append(r)
       result_list.append(dict(r))
    return jsonify(result_list)
    #return render_template('new_data.html', new_data_list = result_list)

# load model and scaler
loaded_model = joblib.load('static/models/randomForest_model.pkl')
loaded_scaler = joblib.load('static/models/scaler.pkl')

# prediction page
# if POST request, return input data and prediction value
# insert data into database
# else return empty form for GET requests
@app.route("/predict", methods=['POST', 'GET'])
def predict():
    if request.method == "POST":

        input_data = []

        # loop through each input field value and store into a list
        for i in range (1,20):
            element_num = f"f{i}"
            requests = request.form[element_num]
            input_data.append(requests)
        
        # create a new list and scale
        predict_data = [input_data]
        scaled_data = loaded_scaler.transform(predict_data)

        # save model prediction value
        result = (loaded_model.predict(scaled_data)).tolist()

        # append prediction value to input list
        insert_data = input_data
        insert_data.append(result[0])

        # connect to database and insert input and prediction values
        conn = psycopg2.connect(database=heroku_db, user=heroku_user, password=pw, host=heroku_host, port='5432')
        cur = conn.cursor()
        cur.execute("INSERT INTO input_data(age_at_diagnosis,chemotherapy,neoplasm_histologic_grade,hormone_therapy,lymph_nodes_examined_positive,mutation_count,radio_therapy,tumor_size,tumor_stage,encoded_type_of_breast_surgery,encoded_cancer_type_detailed,encoded_cellularity,encoded_pam50,encoded_er_status,encoded_her2_status,encoded_tumor_other_histologic_subtype,encoded_inferred_menopausal_state,encoded_integrative_cluster,encoded_pr_status,prediction) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s ,%s, %s, %s, %s, %s, %s)", insert_data)
        cur.close()
        conn.commit()
        conn.close()

        # display input and prediction values
        return render_template('predict.html', outcome=result[0], values = input_data)
        
    else:   
        return render_template("predict.html")


if __name__ == '__main__':
    app.run(debug=debug_value)