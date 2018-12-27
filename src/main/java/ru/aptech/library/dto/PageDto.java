package ru.aptech.library.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ru.aptech.library.entities.CommonEntity;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
public class PageDto<T extends CommonEntity> {
    @Getter @Setter
    private Long totalElements;
    @Getter @Setter
    private List<T> content;
}
