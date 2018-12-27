package ru.aptech.library.entities;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity(name = "genre")
@ToString(exclude = "parent")
@EqualsAndHashCode(exclude = "parent")
@NoArgsConstructor
@AllArgsConstructor
public class Genre implements Serializable, CommonEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter
    private Long id;

    @Column(name = "name")
    @Getter @Setter
    private String name;

    @Column(name = "parent")
    @Getter @Setter
    private Genre parent;

}
