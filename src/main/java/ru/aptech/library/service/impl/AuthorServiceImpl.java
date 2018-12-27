package ru.aptech.library.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import ru.aptech.library.dto.PageDto;
import ru.aptech.library.entities.Author;
import ru.aptech.library.repositories.AuthorRepository;
import ru.aptech.library.service.AuthorService;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
public class AuthorServiceImpl implements AuthorService {

	@Autowired
	AuthorRepository authorRepository;

	@Override
	public List<Author> findAll() {
		return authorRepository.findAll();
	}

	@Override
	public PageDto<Author> findAll(int page, int size) {
		Page<Author> somethings = authorRepository.findAll(PageRequest.of(page, size));
		return new PageDto<>(somethings.getTotalElements(), somethings.getContent());
	}

	@Override
	public Author findById(Long id) {
		return authorRepository.findById(id).orElse(new Author());
	}

	@Override
	public Author saveOrUpdate(Author author) {
		author.setCreated(LocalDateTime.now());
		if (author.getViews() == null) {
			author.setViews(0L);
		}
		return authorRepository.save(author);
	}

	@Override
	public void deleteById(Long id) {
		authorRepository.deleteById(id);
	}

	@Override
	public List<Author> findByFio(String fio) {
		return authorRepository.findByFio(fio);
	}

}
