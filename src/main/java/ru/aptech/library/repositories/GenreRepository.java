package ru.aptech.library.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.aptech.library.entities.Genre;

import java.util.List;

public interface GenreRepository extends JpaRepository<Genre, Long> {
	List<Genre> findByName(String name);

	void deleteById(Long id);

}
