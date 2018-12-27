package ru.aptech.library.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import ru.aptech.library.entities.Book;

import java.util.List;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {

	List<Book> findAll();

	Page<Book> findAll(Pageable pageable);

	Optional<Book> findById(Long id);

	List<Book> findByName(String name);

	List<Book> findByAuthorFio(String fio);

	void deleteById(Long id);
}
