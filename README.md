# Menu OCR Backend

A Spring Boot backend application that extracts dish names from menu images using OCR and returns the required ingredients for those dishes.

## Prerequisites

- **Java 17** or higher (✅ Already installed)
- **Tesseract OCR** (needs to be installed)
- **Maven** (optional - Maven wrapper included)

## Installation Steps

### 1. Install Tesseract OCR

On Fedora Linux:
```bash
sudo dnf install tesseract tesseract-langpack-eng
```

On Ubuntu/Debian:
```bash
sudo apt-get install tesseract-ocr tesseract-ocr-eng
```

Verify installation:
```bash
tesseract --version
```

### 2. Verify Tesseract Data Path

The application expects Tesseract data at `/usr/share/tesseract/tessdata`. If your installation uses a different path, update `src/main/java/com/example/menuocr/service/OcrService.java`:

```java
this.tesseract.setDatapath("/your/tessdata/path");
```

## Running the Application

### Option 1: Using Maven Wrapper (Recommended)

```bash
./mvnw spring-boot:run
```

### Option 2: Using Maven (if installed)

```bash
mvn spring-boot:run
```

### Option 3: Build JAR and Run

```bash
./mvnw clean package
java -jar target/menu-ocr-backend-0.0.1-SNAPSHOT.jar
```

The application will start on **http://localhost:8080**

## API Usage

### Endpoint: Parse Menu Image

**POST** `/api/menu/parse`

**Content-Type:** `multipart/form-data`

**Request:**
- Field name: `file`
- Value: Image file (JPG, PNG, etc.)

**Response:**
```json
{
  "dishes": [
    {
      "name": "MARGHERITA PIZZA",
      "ingredients": [
        "pizza dough",
        "tomato sauce",
        "mozzarella",
        "basil",
        "olive oil",
        "salt"
      ]
    }
  ],
  "rawText": "Extracted text from image..."
}
```

### Example: Using cURL

```bash
curl -X POST "http://localhost:8080/api/menu/parse" \
  -F "file=@/path/to/your/menu-image.jpg"
```

### Example: Using Postman

1. Method: POST
2. URL: `http://localhost:8080/api/menu/parse`
3. Body → form-data
4. Key: `file` (type: File)
5. Value: Select your image file
6. Send

## Adding More Dishes

Edit `src/main/java/com/example/menuocr/service/DishService.java` to add more dish-to-ingredient mappings:

```java
dishIngredients.put("DISH NAME", Arrays.asList(
    "ingredient1", "ingredient2", "ingredient3"
));
```

## Troubleshooting

### Tesseract Not Found
- Ensure Tesseract is installed: `tesseract --version`
- Check tessdata path in `OcrService.java`

### Port Already in Use
- Change port in `src/main/resources/application.properties`:
  ```
  server.port=8081
  ```

### Maven Wrapper Issues
- Make `mvnw` executable: `chmod +x mvnw`
- Or install Maven: `sudo dnf install maven` (Fedora) or `sudo apt-get install maven` (Ubuntu)

## Project Structure

```
.
├── pom.xml                          # Maven configuration
├── mvnw                             # Maven wrapper script
├── src/
│   └── main/
│       ├── java/com/example/menuocr/
│       │   ├── MenuOcrApplication.java    # Main Spring Boot app
│       │   ├── controller/
│       │   │   └── MenuController.java     # REST API endpoint
│       │   ├── service/
│       │   │   ├── OcrService.java         # OCR text extraction
│       │   │   └── DishService.java        # Dish-to-ingredients mapping
│       │   └── dto/
│       │       ├── DishDto.java            # Dish data transfer object
│       │       └── MenuParseResponse.java  # API response DTO
│       └── resources/
│           └── application.properties      # Application configuration
└── README.md                        # This file
```
