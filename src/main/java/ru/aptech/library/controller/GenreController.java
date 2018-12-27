package ru.aptech.library.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.aptech.library.entities.Genre;
import ru.aptech.library.service.GenreService;

import java.util.List;

@RestController
@RequestMapping("/genres")
public class GenreController {

    @Autowired
    private GenreService genreService;

    @GetMapping("/findAll")
    public List<Genre> findAll() {
        return genreService.findAll();
    }

    @PostMapping("/save")
    public Genre save(@RequestBody Genre genre){
        return genreService.saveOrUpdate(genre);
    }

    @DeleteMapping("/delete/{id}")
    public boolean deleteById(@PathVariable Long id) {
        return genreService.deleteById(id);
    }
    
}
