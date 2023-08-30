import cv2
import requests
import yaml
import numpy as np
config = yaml.safe_load(open("./config.yaml"))
print(config)

# Initialize the webcam
cap = cv2.VideoCapture(0)

# Create a QR code scanner
qr_code_detector = cv2.QRCodeDetector()

# Main loop
while True:
    # Capture a frame from the webcam
    ret, frame = cap.read()
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    blurred_frame = cv2.GaussianBlur(gray_frame, (3, 3), 0)
    _, thresh_frame = cv2.threshold(gray_frame, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    thresh_image = cv2.adaptiveThreshold(thresh_frame, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)

    # Detect QR codes in the frame
    retval, decoded_info, points, straight_qrcode = qr_code_detector.detectAndDecodeMulti(frame)

    #print(qr_code_detector.detectAndDecodeMulti(frame))
    # If a QR code is detected
    if retval:
        for i in range(len(decoded_info)):
            # Draw a bounding box around the QR code
            curpoints = points[i].astype(int)
            cv2.polylines(frame, [curpoints], isClosed=True, color=(0, 255, 0), thickness=2)
            cv2.polylines(thresh_frame, [curpoints], isClosed=True, color=(0, 255, 0), thickness=2)

            # Get the decoded data
            print("QR Code Data:", decoded_info[i])
            
            # Send data to an API using requests
            api_url = config["backendUrl"] + "/lot/ticket/end"
            payload = {"singleLot": config["singleLotId"],"qrData": decoded_info[i]}
            token = "Bearer: " + config["lotAuthToken"]
            headers = {
                "Authorization": token,
                "Content-Type": "application/json"
            }
            response = requests.post(api_url, headers=headers,json=payload)
            print("API Response:", response.text)
    
    # Display the frame with bounding boxes
    cv2.imshow("QR Code Scanner", frame)
    cv2.imshow("thresh frame", thresh_frame)
    
    # Break the loop when 'q' is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the webcam and close the windows
cap.release()
cv2.destroyAllWindows()
