package com.example.menuocr.service;

import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class OcrService {

    private final Tesseract tesseract;

    public OcrService() {
        this.tesseract = new Tesseract();
        // Tesseract tessdata path - adjust if needed for your system
        this.tesseract.setDatapath("/usr/share/tesseract/tessdata");
        this.tesseract.setLanguage("eng");
    }

    public String extractText(MultipartFile file) throws IOException, TesseractException {
        File temp = File.createTempFile("menu_", "_" + file.getOriginalFilename());
        file.transferTo(temp);
        try {
            return tesseract.doOCR(temp);
        } finally {
            // best-effort cleanup
            //noinspection ResultOfMethodCallIgnored
            temp.delete();
        }
    }
}

