package ru.aptech.library.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.aptech.library.entities.User;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    @Getter @Setter
    private User user;
    @Getter @Setter
    private List<String> errors = new ArrayList<>();

}
