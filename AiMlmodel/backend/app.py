from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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
        results.append({
            'id': img.get('id'),
            'analysis': {
                'isSpam': False,
                'confidence': 0.90,
                'details': 'Dummy image analysis.'
            }
        })

    return jsonify({'results': results}), 200


if __name__ == '__main__':
    # Running locally on port 5000
    app.run(host="127.0.0.1", port=5000, debug=True)