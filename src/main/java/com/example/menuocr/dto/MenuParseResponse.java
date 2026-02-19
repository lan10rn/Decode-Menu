package com.example.menuocr.dto;

import java.util.List;

public class MenuParseResponse {

    private List<DishDto> dishes;
    private String rawText;

    public MenuParseResponse() {
    }

    public MenuParseResponse(List<DishDto> dishes) {
        this.dishes = dishes;
    }

    public List<DishDto> getDishes() {
        return dishes;
    }

    public void setDishes(List<DishDto> dishes) {
        this.dishes = dishes;
    }

    public String getRawText() {
        return rawText;
    }

    public void setRawText(String rawText) {
        this.rawText = rawText;
    }
}

