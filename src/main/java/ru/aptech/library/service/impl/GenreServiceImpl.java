package ru.aptech.library.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.aptech.library.entities.Genre;
import ru.aptech.library.repositories.GenreRepository;
import ru.aptech.library.service.GenreService;

import java.util.List;

@Service
@Slf4j
public class GenreServiceImpl implements GenreService {

	@Autowired
	GenreRepository genreRepository;

	@Override
	public List<Genre> findAll() {
		return genreRepository.findAll();
	}

	@Override
	public Genre saveOrUpdate(Genre genre) {
		return genreRepository.save(genre);
	}

	@Override
	public boolean deleteById(Long id) {
		boolean success = false;
		try {
			genreRepository.deleteById(id);
			success = true;
		} catch (Exception e) {
			log.error("Не удалось удалить запись с id = " + id, e);
		}
		return success;
	}

	@Override
	public List<Genre> findByName(String name) {
		return genreRepository.findByName(name);
	}

}
