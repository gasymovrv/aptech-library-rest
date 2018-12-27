package ru.aptech.library.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ru.aptech.library.entities.Role;
import ru.aptech.library.entities.User;
import ru.aptech.library.repositories.RoleRepository;
import ru.aptech.library.repositories.UserRepository;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

@Service("userService")
public class UserService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserService(UserRepository userRepository,
                       RoleRepository roleRepository,
                       BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User saveUser(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setActive(1);
        Set<Role> roles = new HashSet<>();
        for (Role role : user.getRoles()) {
            Role userRole = roleRepository.findByRole(role.getRole());
            roles.add(userRole);
        }
        user.setRoles(roles);
        return userRepository.save(user);
    }

    public boolean comparePasswords(String rawPass, String encodePass){
        return bCryptPasswordEncoder.matches(rawPass, encodePass);
    }

}