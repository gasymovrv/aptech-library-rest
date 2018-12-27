package ru.aptech.library.service;

import ru.aptech.library.entities.Genre;

import java.util.List;

public interface GenreService {

	List<Genre> findAll();

	List<Genre> findByName(String name);
	
	Genre saveOrUpdate(Genre genre);
	
	boolean deleteById(Long id);

}
