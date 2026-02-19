package com.example.menuocr.dto;

import java.util.List;

public class DishDto {

    private String name;
    private List<String> ingredients;

    public DishDto() {
    }

    public DishDto(String name, List<String> ingredients) {
        this.name = name;
        this.ingredients = ingredients;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<String> ingredients) {
        this.ingredients = ingredients;
    }
}

