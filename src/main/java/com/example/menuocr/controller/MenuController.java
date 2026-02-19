package com.example.menuocr.controller;

import com.example.menuocr.dto.DishDto;
import com.example.menuocr.dto.MenuParseResponse;
import com.example.menuocr.service.GeminiService;
import com.example.menuocr.service.OcrService;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin
public class MenuController {

    private final OcrService ocrService;
    private final GeminiService geminiService;

    public MenuController(OcrService ocrService, GeminiService geminiService) {
        this.ocrService = ocrService;
        this.geminiService = geminiService;
    }

    @PostMapping(
            path = "/parse",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<MenuParseResponse> parseMenu(
            @RequestPart("file") MultipartFile file
    ) throws IOException, TesseractException {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        String rawText = ocrService.extractText(file);
        
        // Use Gemini to identify dishes and ingredients directly from the raw text
        List<DishDto> dishes = geminiService.getDishesFromText(rawText);

        MenuParseResponse response = new MenuParseResponse(dishes);
        return ResponseEntity.ok(response);
    }
}
