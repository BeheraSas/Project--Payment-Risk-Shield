from flask import Flask, request, jsonify
import pandas as pd
from joblib import load
from feature_extraction import FeatureExtractor

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, Flask!"

# Load the XGBoost model
xgb_model = load('./xgboost_model.joblib')

@app.route('/extract')
def feature_prediction():
    # Feature names
    feature_names = ['Have_IP', 'Have_At', 'URL_Length', 'URL_Depth', 'Redirection',
                     'https_Domain', 'TinyURL', 'Prefix/Suffix', 'DNS_Record', 
                     'Domain_Age', 'Domain_End', 'iFrame', 'Mouse_Over', 'Right_Click', 'Web_Forwards']
    
    # URL to be analyzed
    url = request.args.get('url')
    
    # Extracting features
    extractor = FeatureExtractor(url)
    features = extractor.extractFeatures()
    
    # Make predictions using the loaded model
    
    
    # Prepare the prediction result
    result = {}
    
    # Add individual features to the result
    for i, feature_name in enumerate(feature_names):
        result[feature_name] = features[i]
    
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
