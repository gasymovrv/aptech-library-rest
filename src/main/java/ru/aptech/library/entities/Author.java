package ru.aptech.library.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity(name = "author")
@ToString(exclude = "books")
@EqualsAndHashCode(exclude = "books")
@NoArgsConstructor
@AllArgsConstructor
public class Author implements Serializable, CommonEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter
    private Long id;

    @Column(name = "fio", nullable = false)
    @Getter @Setter
    private String fio;

    @Column(name = "birthday")
    @Getter @Setter
    private LocalDate birthday;

    @Column(name = "created")
    @Getter @Setter
    private LocalDateTime created;

    @Column(name = "views")
    @Getter @Setter
    private Long views;

    @JsonIgnore
    @OneToMany(mappedBy = "author")
    @Getter @Setter
    private Set<Book> books = new HashSet<>(0);

}
