#!/bin/bash
# Test script to upload an image to the menu OCR API

# Make sure the application is running first!
# Usage: ./test-upload.sh /path/to/your/image.jpg

if [ -z "$1" ]; then
    echo "Usage: ./test-upload.sh /path/to/your/image.jpg"
    exit 1
fi

IMAGE_PATH="$1"

if [ ! -f "$IMAGE_PATH" ]; then
    echo "Error: File not found: $IMAGE_PATH"
    exit 1
fi

echo "Uploading image: $IMAGE_PATH"
echo "To endpoint: http://localhost:8080/api/menu/parse"
echo ""

curl -X POST "http://localhost:8080/api/menu/parse" \
  -F "file=@$IMAGE_PATH" \
  -H "Accept: application/json" | jq '.'

# If jq is not installed, remove the "| jq '.'" part above
