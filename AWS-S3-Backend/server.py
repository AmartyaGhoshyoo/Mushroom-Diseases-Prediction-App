from flask import render_template_string,Flask, request, jsonify, url_for, Response
from werkzeug.middleware.proxy_fix import ProxyFix

from flask_cors import CORS
import torch
import boto3
import io
import os
import cv2
import numpy as np
from PIL import Image
from uuid import uuid4
import warnings

# Suppress the specific FutureWarning from YOLOv5
warnings.filterwarnings("ignore", message=".*torch.cuda.amp.autocast.*", category=FutureWarning)

app = Flask(__name__)
CORS(app)
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)
app.config['PREFERRED_URL_SCHEME'] = 'https'
# Load YOLOv5 model
model = torch.hub.load('ultralytics/yolov5', 'custom', path='best_mac.pt')
model.conf = 0.70
model.iou=0.4
model.max_det=50
# S3 setup
s3 = boto3.client('s3')
BUCKET_NAME = 'your-bucket-name'  # Replace with your S3 bucket name

def upload_bytes_to_s3(byte_data, s3_key):
    s3.upload_fileobj(io.BytesIO(byte_data), BUCKET_NAME, s3_key)

def download_from_s3(s3_key):
    return s3.get_object(Bucket=BUCKET_NAME, Key=s3_key)['Body'].read()

@app.route('/health')
def health():
    return f"Looking for mushrooms?🍄"

@app.route('/')
def hello():
    html_template = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🍄 AI Mushroom Mentor - Meghalaya's Mycology Guide</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1a4b2f 0%, #2d5016 30%, #4a7c59 70%, #8fbc8f 100%);
            color: #333;
            overflow-x: hidden;
            position: relative;
        }

        .particles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 1;
        }

        .particle {
            position: absolute;
            font-size: 20px;
            opacity: 0.6;
            animation: float 8s infinite ease-in-out;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-20px) rotate(90deg); }
            50% { transform: translateY(0px) rotate(180deg); }
            75% { transform: translateY(-10px) rotate(270deg); }
        }

        .container {
            position: relative;
            z-index: 2;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .hero-section {
            text-align: center;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 60px 40px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            max-width: 900px;
            width: 100%;
            animation: slideUp 1s ease-out;
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .title {
            font-size: 3.5rem;
            font-weight: bold;
            background: linear-gradient(45deg, #1a4b2f, #8fbc8f, #2d5016);
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: gradientShift 3s ease-in-out infinite;
            margin-bottom: 20px;
        }

        @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }

        .subtitle {
            font-size: 1.4rem;
            color: #555;
            margin-bottom: 20px;
            line-height: 1.6;
        }

        .location-tag {
            display: inline-block;
            background: linear-gradient(45deg, #ff6b6b, #ffa500);
            color: white;
            padding: 8px 20px;
            border-radius: 25px;
            font-weight: bold;
            margin-bottom: 30px;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }

        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 25px;
            margin: 40px 0;
        }

        .feature-card {
            background: linear-gradient(135deg, #f0f8f0, #e8f5e8);
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            transition: all 0.3s ease;
            border: 2px solid transparent;
            position: relative;
            overflow: hidden;
        }

        .feature-card::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(45deg, transparent, rgba(143, 188, 143, 0.1), transparent);
            transform: rotate(45deg);
            transition: all 0.5s;
            opacity: 0;
        }

        .feature-card:hover::before {
            opacity: 1;
            transform: rotate(45deg) translate(50%, 50%);
        }

        .feature-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(26, 75, 47, 0.3);
            border-color: #8fbc8f;
        }

        .feature-icon {
            font-size: 3rem;
            margin-bottom: 20px;
            display: block;
            position: relative;
            z-index: 2;
        }

        .feature-title {
            font-size: 1.3rem;
            font-weight: bold;
            color: #1a4b2f;
            margin-bottom: 15px;
            position: relative;
            z-index: 2;
        }

        .feature-desc {
            font-size: 1rem;
            color: #666;
            line-height: 1.5;
            position: relative;
            z-index: 2;
        }

        .cta-section {
            margin-top: 40px;
        }

        .download-btn {
            display: inline-flex;
            align-items: center;
            gap: 15px;
            background: linear-gradient(45deg, #1a4b2f, #4a7c59);
            color: white;
            padding: 20px 45px;
            border-radius: 50px;
            text-decoration: none;
            font-size: 1.3rem;
            font-weight: bold;
            transition: all 0.3s ease;
            box-shadow: 0 10px 25px rgba(26, 75, 47, 0.4);
            position: relative;
            overflow: hidden;
        }

        .download-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
        }

        .download-btn:hover::before {
            left: 100%;
        }

        .download-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 35px rgba(26, 75, 47, 0.6);
        }

        .hack-message {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: #00ff00;
            padding: 10px 15px;
            border-radius: 10px;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            animation: typewriter 2s infinite;
            z-index: 10;
        }

        @keyframes typewriter {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
        }

        .footer {
            margin-top: 50px;
            text-align: center;
            color: rgba(255, 255, 255, 0.9);
            font-size: 1rem;
            background: rgba(0, 0, 0, 0.2);
            padding: 20px;
            border-radius: 15px;
        }

        .special-features {
            background: linear-gradient(135deg, #e8f5e8, #f0fff0);
            border: 2px solid #8fbc8f;
            border-radius: 20px;
            padding: 30px;
            margin: 30px 0;
        }

        .special-title {
            font-size: 1.5rem;
            color: #1a4b2f;
            font-weight: bold;
            text-align: center;
            margin-bottom: 20px;
        }

        .benefit-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            text-align: left;
        }

        .benefit-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px;
            background: rgba(255, 255, 255, 0.7);
            border-radius: 10px;
        }

        @media (max-width: 768px) {
            .title {
                font-size: 2.5rem;
            }
            
            .hero-section {
                padding: 40px 25px;
            }
            
            .features {
                grid-template-columns: 1fr;
            }
            
            .benefit-list {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="particles" id="particles"></div>
    
    <div class="hack-message">
        > Mushroom.ai initialized in Meghalaya 🍄
    </div>

    <div class="container">
        <div class="hero-section">
            <h1 class="title">🍄 AI Mushroom Mentor</h1>
            <div class="location-tag">📍 Specialized for Meghalaya</div>
            <p class="subtitle">Your intelligent companion for exploring Meghalaya's rich mycological diversity. Empowering farmers and enthusiasts with AI-powered mushroom identification and disease detection.</p>
            
            <div class="special-features">
                <div class="special-title">🌿 Built for Northeast India</div>
                <div class="benefit-list">
                    <div class="benefit-item">
                        <span>🏔️</span>
                        <span>Meghalaya native species database</span>
                    </div>
                    <div class="benefit-item">
                        <span>👨‍🌾</span>
                        <span>Farmer-focused disease detection</span>
                    </div>
                    <div class="benefit-item">
                        <span>🌧️</span>
                        <span>Monsoon season guidance</span>
                    </div>
                    <div class="benefit-item">
                        <span>🗣️</span>
                        <span>Local language support</span>
                    </div>
                </div>
            </div>
            
            <div class="features">
                <div class="feature-card">
                    <span class="feature-icon">🔍</span>
                    <div class="feature-title">AI Disease Detection</div>
                    <div class="feature-desc">Advanced AI instantly identifies mushroom diseases and provides treatment recommendations for farmers and cultivators</div>
                </div>
                
                <div class="feature-card">
                    <span class="feature-icon">🏔️</span>
                    <div class="feature-title">Meghalaya Species Guide</div>
                    <div class="feature-desc">Comprehensive database of indigenous mushrooms found in Khasi Hills, Garo Hills, and Jaintia Hills regions</div>
                </div>
                
                <div class="feature-card">
                    <span class="feature-icon">👨‍🌾</span>
                    <div class="feature-title">Farmer Support</div>
                    <div class="feature-desc">Specialized tools for mushroom cultivation, pest management, and yield optimization for local farmers</div>
                </div>
                
                <div class="feature-card">
                    <span class="feature-icon">📱</span>
                    <div class="feature-title">Offline Capability</div>
                    <div class="feature-desc">Works without internet in remote areas of Meghalaya - perfect for field identification and farming assistance</div>
                </div>
                
                <div class="feature-card">
                    <span class="feature-icon">⚕️</span>
                    <div class="feature-title">Health & Safety</div>
                    <div class="feature-desc">Identifies toxic species native to Northeast India with detailed safety warnings and emergency contacts</div>
                </div>
                
                <div class="feature-card">
                    <span class="feature-icon">💰</span>
                    <div class="feature-title">Market Intelligence</div>
                    <div class="feature-desc">Local market prices, seasonal demand patterns, and export opportunities for mushroom farmers</div>
                </div>
            </div>

            <div class="cta-section">
                <a href="#" class="download-btn" onclick="showDownloadInfo()">
                    <span>📱</span>
                    Download from Play Store
                </a>
            </div>
        </div>

        <div class="footer">
            <p>🍄 Empowering Meghalaya's farmers and mycology enthusiasts • AI-Powered • Locally Focused • Culturally Aware</p>
            <p>Supporting sustainable mushroom cultivation and biodiversity conservation in Northeast India</p>
        </div>
    </div>

    <script>
        function createParticles() {
            const particles = document.getElementById('particles');
            const mushroomEmojis = ['🍄', '🌿', '🍃', '🌱', '🏔️', '🌧️'];
            
            for (let i = 0; i < 25; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.textContent = mushroomEmojis[Math.floor(Math.random() * mushroomEmojis.length)];
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 8 + 's';
                particle.style.animationDuration = (8 + Math.random() * 4) + 's';
                particles.appendChild(particle);
            }
        }

        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.background = 'linear-gradient(135deg, #e8f5e8, #d4f0d4)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.background = 'linear-gradient(135deg, #f0f8f0, #e8f5e8)';
            });
        });

        function showDownloadInfo() {
            alert('🍄 AI Mushroom Mentor for Meghalaya is coming soon to Google Play Store!\\n\\n🏔️ Features:\\n• Meghalaya-specific mushroom database\\n• AI disease detection for farmers\\n• Offline functionality\\n• Local language support\\n• Market intelligence\\n\\nGet ready to revolutionize mushroom farming in Northeast India!');
        }

        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('feature-icon')) {
                e.target.style.transform = 'scale(1.5) rotate(360deg)';
                e.target.style.transition = 'transform 0.5s ease';
                setTimeout(() => {
                    e.target.style.transform = 'scale(1) rotate(0deg)';
                }, 500);
            }
        });

        window.addEventListener('load', createParticles);
    </script>
</body>
</html>
    """
    return render_template_string(html_template)

@app.route('/detect/upload', methods=['POST'])
def detect_uploaded_image():
    try:
        file = request.files['file']
        img = Image.open(file.stream).convert("RGB")
        img.thumbnail((640,640),Image.Resampling.LANCZOS)
        unique_id = str(uuid4())

        # Filenames
        input_filename = f"{unique_id}_input.jpg"
        output_filename = f"{unique_id}_output.jpg"
        input_s3_key = f"input/{input_filename}"
        output_s3_key = f"output/{output_filename}"

        # Upload input image to S3
        img_byte_arr = io.BytesIO()
        img.save(img_byte_arr, format='JPEG',quality=85)
        upload_bytes_to_s3(img_byte_arr.getvalue(), input_s3_key)

        # Inference
        img_np = np.array(img)
        results = model(img_np)
        results.render()
        rendered_image = Image.fromarray(results.ims[0])
        detected_classes = [det['name'] for det in results.pandas().xyxy[0].to_dict(orient="records")]

        # Upload output image to S3
        out_img_bytes = io.BytesIO()
        rendered_image.save(out_img_bytes, format='JPEG',quality=85)
        upload_bytes_to_s3(out_img_bytes.getvalue(), output_s3_key)

        # Generate download URL for frontend (same as reference logic)
        image_url = url_for('download_image', filename=output_filename, _external=True)

        return jsonify({
            'url': image_url,
            'detected_classes': detected_classes
        })

    except Exception as e:
        print("Error processing image:", str(e))
        return jsonify({'error': str(e)}), 500

@app.route('/detect/video', methods=['POST'])
def detect_uploaded_video():
    try:
        file = request.files['file']
        unique_id = str(uuid4())

        input_filename = f"{unique_id}_input.mp4"
        output_filename = f"{unique_id}_output.mp4"
        input_s3_key = f"input/{input_filename}"
        output_s3_key = f"output/{output_filename}"

        # Save input video to /tmp
        temp_input_path = f"/tmp/{input_filename}"
        temp_output_path = f"/tmp/{output_filename}"
        file.save(temp_input_path)
        upload_bytes_to_s3(open(temp_input_path, 'rb').read(), input_s3_key)

        # OpenCV processing
        cap = cv2.VideoCapture(temp_input_path)
        if not cap.isOpened():
            return jsonify({'error': 'Cannot open video file'}), 400

        fps = cap.get(cv2.CAP_PROP_FPS)
	    #width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        #height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
        width, height = 640, 640
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        out = cv2.VideoWriter(temp_output_path, fourcc, fps, (width, height))
        all_detected_classes = set()
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
            frame = cv2.resize(frame, (width, height))
            img = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
            results = model(img)
            results.render()
            detected_classes = [det['name'] for det in results.pandas().xyxy[0].to_dict(orient="records")]
            all_detected_classes.update(detected_classes)

            rendered_frame = cv2.cvtColor(np.array(results.ims[0]), cv2.COLOR_RGB2BGR)
            out.write(rendered_frame)

        cap.release()
        out.release()

        # Upload output video to S3
        upload_bytes_to_s3(open(temp_output_path, 'rb').read(), output_s3_key)

        # Generate download URL (same as reference)
        video_url = url_for('download_video', filename=output_filename, _external=True)

        return jsonify({
            'url': video_url,
            'detected_classes': list(all_detected_classes)
        })

    except Exception as e:
        print("Error processing video:", str(e))
        return jsonify({'error': str(e)}), 500

@app.route('/download/image/<filename>', methods=['GET'])
def download_image(filename):
    try:
        s3_key = f'output/{filename}'
        image_bytes = download_from_s3(s3_key)
        return Response(
            image_bytes,
            mimetype='image/jpeg',
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
    except Exception as e:
        print("Error downloading image:", str(e))
        return jsonify({'error': str(e)}), 500

@app.route('/download/video/<filename>', methods=['GET'])
def download_video(filename):
    try:
        s3_key = f'output/{filename}'
        video_bytes = download_from_s3(s3_key)
        return Response(
            video_bytes,
            mimetype='video/mp4',
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
    except Exception as e:
        print("Error downloading video:", str(e))
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)