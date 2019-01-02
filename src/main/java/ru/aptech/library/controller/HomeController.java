package ru.aptech.library.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    //При обновлении страницы, когда путь например authors/1/edit - не работает
    @RequestMapping(value = {"/", "/books/**", "/authors/**", "/about-us/**", "/auth/**"})
    public String index() {
        return "index";
    }

}
