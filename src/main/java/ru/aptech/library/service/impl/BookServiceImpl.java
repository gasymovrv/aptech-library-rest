package ru.aptech.library.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import ru.aptech.library.dto.PageDto;
import ru.aptech.library.entities.Book;
import ru.aptech.library.repositories.BookRepository;
import ru.aptech.library.service.BookService;

import java.util.List;

@Service
@Slf4j
public class BookServiceImpl implements BookService {

	@Autowired
	BookRepository bookRepository;

	@Override
	public List<Book> findAll() {
		return bookRepository.findAll();
	}

	@Override
	public PageDto<Book> findAll(int page, int size) {
		Page<Book> somethings = bookRepository.findAll(PageRequest.of(page, size));
        return new PageDto<>(somethings.getTotalElements(), somethings.getContent());
	}

	@Override
	public Book findById(Long id) {
		return bookRepository.findById(id).orElse(new Book());
	}

	@Override
	public Book saveOrUpdate(Book expense) {
		return bookRepository.save(expense);
	}

	@Override
	public boolean deleteById(Long id) {
		boolean success = false;
		try {
			bookRepository.deleteById(id);
			success = true;
		} catch (Exception e) {
			log.error("Не удалось удалить запись с id = " + id, e);
		}
		return success;
	}

	@Override
	public List<Book> findByName(String name) {
		return bookRepository.findByName(name);
	}

	@Override
	public List<Book> findByAuthorFio(String fio) {
		return bookRepository.findByAuthorFio(fio);
	}

}
