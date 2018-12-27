package ru.aptech.library.enums;

public enum SortType {
    NAME("По названию/имени"),
    CREATION_DATE("По дате добавления"),
    POPULARITY("По популярности"),
    PRICE("По цене");

    private String text;

    SortType(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }
}
