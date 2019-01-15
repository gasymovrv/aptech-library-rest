# Описание
+ Frontend - реакт, без использования create-react-app.
    + в корне проекта располагаются webpack.config.js, package.json, .babelrc с настройками
    + spring выдает index.html с использованием шаблонизатора thymeleaf, к которой подключен bundl.js
+ Backend - рест-сервис на spring-boot + один mvc-метод в HomeController для выдачи index.html.
    + в помнике подключен фронтенд плагин для упаковки node_modules в jar