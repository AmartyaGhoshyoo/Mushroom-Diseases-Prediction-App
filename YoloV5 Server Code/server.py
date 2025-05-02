from flask import Flask, request, jsonify, send_from_directory, url_for, send_file
from flask_cors import CORS
import torch
import os
import cv2
import numpy as np
from PIL import Image

app = Flask(__name__)
CORS(app)

# Load your YOLOv5 model
model = torch.hub.load('ultralytics/yolov5', 'custom', path='runs/train/exp3/weights/best.pt', force_reload=True)

# Create a directory to save processed images and videos
save_directory = 'processed_media'
os.makedirs(save_directory, exist_ok=True)

@app.route('/detect/upload', methods=['POST'])
def detect_uploaded_image():
    try:
        file = request.files['file']
        img = Image.open(file.stream)

        # Convert the PIL image to a format YOLOv5 can work with (NumPy array)
        img_np = np.array(img)

        # Perform YOLOv5 detection
        results = model(img_np)

        # Render results directly on the image
        results.render()

        # Convert the rendered image back to PIL format
        rendered_image = Image.fromarray(results.ims[0])

        # Extract detected classes
        detected_classes = [det['name'] for det in results.pandas().xyxy[0].to_dict(orient="records")]

        # Define the output image path
        output_image_filename = 'output_image.jpg'
        output_image_path = os.path.join(save_directory, output_image_filename)

        # Save the rendered image using Pillow
        rendered_image.save(output_image_path)

        # Generate a URL to access the processed image
        image_url = url_for('download_image', filename=output_image_filename, _external=True)
        return jsonify({'url': image_url, 'detected_classes': detected_classes})

    except Exception as e:
        print("Error processing image:", str(e))
        return jsonify({'error': str(e)}), 500

@app.route('/download/image/<filename>', methods=['GET'])
def download_image(filename):
    """Endpoint to serve the processed image file by filename."""
    try:
        return send_from_directory(save_directory, filename, mimetype='image/jpeg')
    except Exception as e:
        print("Error downloading image:", str(e))
        return jsonify({'error': str(e)}), 500

@app.route('/detect/video', methods=['POST'])
def detect_uploaded_video():
    try:
        file = request.files['file']
        video_path = os.path.join(save_directory, file.filename)
        file.save(video_path)

        cap = cv2.VideoCapture(video_path)

        if not cap.isOpened():
            return jsonify({'error': 'Cannot open video file'}), 400

        fps = cap.get(cv2.CAP_PROP_FPS)
        width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
        height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

        output_video_filename = 'output_video.mp4'
        output_video_path = os.path.join(save_directory, output_video_filename)
        fourcc = cv2.VideoWriter_fourcc(*'mp4v')
        out = cv2.VideoWriter(output_video_path, fourcc, fps, (width, height))

        frame_count = 0
        all_detected_classes = set()

        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            # Convert frame to RGB format for YOLOv5
            img = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))

            # Perform YOLOv5 detection
            results = model(img)

            # Collect detected classes from each frame
            detected_classes = [det['name'] for det in results.pandas().xyxy[0].to_dict(orient="records")]
            all_detected_classes.update(detected_classes)

            # Render the results on the frame
            results.render()

            # Convert the rendered frame from RGB back to BGR for OpenCV compatibility
            rendered_frame = cv2.cvtColor(np.array(results.ims[0]), cv2.COLOR_RGB2BGR)

            # Write the rendered frame to the output video
            out.write(rendered_frame)
            frame_count += 1

        cap.release()
        out.release()

        if frame_count == 0:
            return jsonify({'error': 'No frames were processed'}), 500

        # Generate a URL to access the processed video
        video_url = url_for('download_video', filename=output_video_filename, _external=True)
        return jsonify({'url': video_url, 'detected_classes': list(all_detected_classes)})

    except Exception as e:
        print("Error processing video:", str(e))
        return jsonify({'error': str(e)}), 500

@app.route('/download/video/<filename>', methods=['GET'])
def download_video(filename):
    """Endpoint to serve the processed video file by filename."""
    try:
        return send_file(
            os.path.join(save_directory, filename),
            as_attachment=True,
            mimetype='video/mp4'
        )
    except Exception as e:
        print("Error downloading video:", str(e))
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
