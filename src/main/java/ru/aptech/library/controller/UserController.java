package ru.aptech.library.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;
import ru.aptech.library.dto.UserDto;
import ru.aptech.library.entities.Role;
import ru.aptech.library.entities.User;
import ru.aptech.library.service.impl.UserService;

import javax.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/registration")
    public UserDto createNewUser(@RequestBody @Valid User user, BindingResult bindingResult) {
        UserDto userDto = new UserDto();
        User userExists = userService.findUserByEmail(user.getEmail());
        boolean errors = false;
        if (userExists != null) {
            userDto.getErrors().add("There is already a user registered with the email provided");
            errors = true;
        }
        if (bindingResult.hasErrors()) {
            bindingResult.getAllErrors();
            for (ObjectError error : bindingResult.getAllErrors()) {
                userDto.getErrors().add(String.format("Not valid User: %s", error.getDefaultMessage()));
            }
            errors = true;
        }
        if (user.getRoles() != null && !user.getRoles().isEmpty()) {
            for (Role role : user.getRoles()) {
                if (role.getRole().equals("ADMIN")) {
                    userDto.getErrors().add("This method does not create user with role ADMIN");
                    errors = true;
                }
            }
        } else {
            userDto.getErrors().add("Roles are empty");
            errors = true;
        }
        if(!errors){
            userService.saveUser(user);
        }
        userDto.setUser(user);
        return userDto;
    }

    //данные передаются в headers, пример:
    //'Authorization': 'Basic YUBhLnJ1OjEyMzQ1'
    @GetMapping("/login")
    public User loginUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if(auth!=null && !auth.getName().equals("anonymousUser")){
            User u = userService.findUserByEmail(auth.getName());
            u.setPassword(null);
            return u;
        }
        return null;
    }

    @GetMapping("/userIsAuthorize")
    public boolean userIsAuthorize(@RequestParam String email) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if(auth!=null && !auth.getName().equals("anonymousUser")){
            User u = userService.findUserByEmail(auth.getName());
            return u.getEmail().equals(email);
        }
        return false;
    }
}
