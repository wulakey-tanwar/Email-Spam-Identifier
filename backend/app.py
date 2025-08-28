from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import json
import os

app = Flask(__name__)
CORS(app)

# Simple database connection

def get_db():
    return mysql.connector.connect(
        host=os.getenv('DB_HOST', 'localhost'),
        user=os.getenv('DB_USER', 'root'),
        password=os.getenv('DB_PASSWORD', ''),
        database=os.getenv('DB_NAME', 'spam_detector')
    )

# Create database and tables if they don't exist
def init_db():
    try:
        conn = mysql.connector.connect(
            host=os.getenv('DB_HOST', 'localhost'),
            user=os.getenv('DB_USER', 'root'),
            password=os.getenv('DB_PASSWORD', '')
        )
        cursor = conn.cursor()
        db_name = os.getenv('DB_NAME', 'spam_detector')
        
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {db_name}")
        cursor.execute(f"USE {db_name}")
        
        # Create tables
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS email_analysis (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email_content TEXT NOT NULL,
                is_spam BOOLEAN NOT NULL,
                confidence DECIMAL(5,2) NOT NULL,
                analysis_details JSON,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS image_analysis (
                id INT AUTO_INCREMENT PRIMARY KEY,
                image_name VARCHAR(255) NOT NULL,
                is_spam BOOLEAN NOT NULL,
                confidence DECIMAL(5,2) NOT NULL,
                analysis_details JSON,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        conn.commit()
        conn.close()
        print("Database initialized successfully")
    except Exception as e:
        print(f"Database init error: {e}")

# Initialize database on startup
init_db()

# ---- Analyze Email ----
@app.route('/analyze-email', methods=['GET', 'POST'])
def analyze_email():
    if request.method == 'GET':
        return jsonify({'message': 'Use POST with JSON to analyze email.'})

    data = request.get_json(silent=True)
    if not data or 'emailContent' not in data:
        return jsonify({'error': 'Invalid input. Provide "emailContent".'}), 400

    email_content = data['emailContent']

    # Dummy response (replace later with ML model)
    result = {
        'isSpam': False,
        'confidence': 0.95,
        'details': f'Processed email: {email_content[:30]}... (dummy analysis)'
    }
    
    # Save to database for model improvement
    try:
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO email_analysis (email_content, is_spam, confidence, analysis_details)
            VALUES (%s, %s, %s, %s)
        """, (email_content, result['isSpam'], result['confidence'], json.dumps(result)))
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"Database save error: {e}")
    
    return jsonify(result), 200


# ---- Analyze Images ----
@app.route('/analyze-images', methods=['GET', 'POST'])
def analyze_images():
    if request.method == 'GET':
        return jsonify({'message': 'Use POST with JSON to analyze images.'})

    data = request.get_json(silent=True)
    if not data or 'images' not in data:
        return jsonify({'error': 'Invalid input. Provide "images" as a list.'}), 400

    images = data['images']
    if not isinstance(images, list):
        return jsonify({'error': '"images" must be a list.'}), 400

    results = []
    for img in images:
        analysis_result = {
            'isSpam': False,
            'confidence': 0.90,
            'details': 'Dummy image analysis.'
        }
        
        results.append({
            'id': img.get('id'),
            'analysis': analysis_result
        })
        
        # Save to database for model improvement
        try:
            conn = get_db()
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO image_analysis (image_name, is_spam, confidence, analysis_details)
                VALUES (%s, %s, %s, %s)
            """, (img.get('name', f'image_{img.get("id")}'), analysis_result['isSpam'], analysis_result['confidence'], json.dumps(analysis_result)))
            conn.commit()
            conn.close()
        except Exception as e:
            print(f"Database save error: {e}")

    return jsonify({'results': results}), 200





if __name__ == '__main__':
    # Running locally on port 5000
    app.run(host="0.0.0.0", port=5000, debug=True)