package ru.aptech.library.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.aptech.library.entities.Role;

@Repository("roleRepository")
public interface RoleRepository extends JpaRepository<Role, Integer> {
    Role findByRole(String role);

}
