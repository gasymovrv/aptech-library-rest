package ru.aptech.library.repositories;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import ru.aptech.library.entities.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;

@Component
public class CommandLineRunner implements org.springframework.boot.CommandLineRunner {

    private final int COUNT_AUTHORS = 15;
    private final int COUNT_BOOKS = 15;
    private final int COUNT_GENRES = 15;
    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final GenreRepository genreRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public CommandLineRunner(BookRepository br,
                             AuthorRepository ar,
                             GenreRepository gr,
                             RoleRepository rr,
                             UserRepository ur,
                             BCryptPasswordEncoder crypt) {
        this.bookRepository = br;
        this.authorRepository = ar;
        this.genreRepository = gr;
        this.roleRepository = rr;
        this.userRepository = ur;
        this.bCryptPasswordEncoder = crypt;
    }

    @Override
    public void run(String... strings) throws Exception {
        List<Genre> genres = new ArrayList<>();
        for (int i = 0; i < COUNT_GENRES; i++) {
            genres.add(genreRepository.save(
                    new Genre(null,
                            "genre" + i,
                            null)
                    )
            );
        }
        List<Author> authors = new ArrayList<>();
        for (int i = 0; i < COUNT_AUTHORS; i++) {
            authors.add(authorRepository.save(
                    new Author(null,
                            "author" + i,
                            LocalDate.now(), LocalDateTime.now(), 0L, new HashSet<>(0))
                    )
            );
        }
        for (int i = 0; i < COUNT_BOOKS; i++) {
            bookRepository.save(
                    new Book(
                            null,
                            "book" + i,
                            10 * i,
                            "isbn" + i,
                            genres.get(getRandomIntegerInRange(0, COUNT_GENRES-1)),
                            authors.get(getRandomIntegerInRange(0, COUNT_AUTHORS/2)),
                            1800 + i,
                            new byte[10],
                            "описание",
                            null,
                            null,
                            0L,
                            LocalDateTime.now(),
                            0L,
                            getRandomDoubleInRange(500, 1000),
                            ".pdf",
                            "application/pdf",
                            "10B"
                    )
            );
        }
        Role userRole = new Role(1, "ROLE_USER");
        Role admin = new Role(2, "ADMIN");
        roleRepository.save(admin);
        roleRepository.save(userRole);

        HashSet<Role> adminRoles = new HashSet<>();
        adminRoles.add(admin);
        adminRoles.add(userRole);
        String adminPass = bCryptPasswordEncoder.encode("12345");
        userRepository.save(new User(2, "a@a.ru", adminPass, "a", "a", 1, adminRoles));

        HashSet<Role> userRoles = new HashSet<>();
        userRoles.add(userRole);
        String userPass = bCryptPasswordEncoder.encode("12345");
        userRepository.save(new User(1, "u@u.ru", userPass, "u", "u", 1, userRoles));
    }

    private int getRandomIntegerInRange(int min, int max) {
        if (min >= max) {
            throw new IllegalArgumentException("max must be greater than min");
        }
        Random r = new Random();
        return r.nextInt((max - min) + 1) + min;
    }

    private double getRandomDoubleInRange(double min, double max) {
        if (min >= max) {
            throw new IllegalArgumentException("max must be greater than min");
        }
        return (Math.random() * ((max - min) + 1)) + min;
    }
}