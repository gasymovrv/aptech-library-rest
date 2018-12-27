package ru.aptech.library.service;

import ru.aptech.library.dto.PageDto;
import ru.aptech.library.entities.Book;

import java.util.List;

public interface BookService {

	List<Book> findAll();

	PageDto<Book> findAll(int page, int size);

	Book findById(Long id);
	
	List<Book> findByName(String name);

	List<Book> findByAuthorFio(String fio);
	
	Book saveOrUpdate(Book book);

	boolean deleteById(Long id);

}
