package ru.aptech.library.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.aptech.library.dto.PageDto;
import ru.aptech.library.entities.Author;
import ru.aptech.library.service.AuthorService;

import java.util.List;


@RestController
@RequestMapping("/authors")
public class AuthorController {

    @Autowired
    private AuthorService authorService;

    @GetMapping("/findAll")
    public List<Author> findAll() {
        return authorService.findAll();
    }

    @GetMapping("/findAll/{page}/{size}")
    public PageDto<Author> findAll(@PathVariable Integer page, @PathVariable Integer size) {
        return authorService.findAll(page, size);
    }

    @GetMapping("/findById/{id}")
    public Author findById(@PathVariable Long id) {
        return authorService.findById(id);
    }

    @PostMapping("/save")
    public Author save(@RequestBody Author author){
        return authorService.saveOrUpdate(author);
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteById(@PathVariable Long id) {
        authorService.deleteById(id);
    }
}
