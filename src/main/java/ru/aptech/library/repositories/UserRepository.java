package ru.aptech.library.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.aptech.library.entities.User;

@Repository("userRepository")
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}