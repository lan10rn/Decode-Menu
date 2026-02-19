package com.example.menuocr.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import com.example.menuocr.dto.DishDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GeminiService {

    @Value("${GEMINI_API_KEY}")
    private String geminiApiKey;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public List<DishDto> getDishesFromText(String rawText) {
        if (rawText == null || rawText.isEmpty()) {
            return new ArrayList<>();
        }

        Client client = Client.builder().apiKey(geminiApiKey).build();
        String prompt = "Analyze the following menu text: \"" + rawText + "\". " +
                "1. Identify all the dish names listed in the text. " +
                "2. For each dish, provide a list of its typical ingredients based on your general knowledge (even if not listed in the text). " +
                "3. Return ONLY a JSON array of objects with keys 'name' (string) and 'ingredients' (array of strings). " +
                "Do not include markdown formatting or any other text.";

        try {
            GenerateContentResponse response = client.models.generateContent(
                    "gemini-3-flash-preview",
                    prompt,
                    null);

            String jsonText = response.text();
//            System.out.println(response);
            // Clean up markdown if present
            if (jsonText != null) {
                jsonText = jsonText.replaceAll("```json", "").replaceAll("```", "").trim();
                return objectMapper.readValue(jsonText, new TypeReference<List<DishDto>>() {});
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ArrayList<>();
    }
}
