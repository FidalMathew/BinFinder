package com.fidal.binfinder.controller;

import com.fidal.binfinder.entity.User;
import com.fidal.binfinder.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    // Add a new user
//    @PostMapping("/addUser")
//    public ResponseEntity<User> addUser(@RequestBody @Valid User user) {
//        try {
//
////            System.out.println("Printing "+user.getUserName()+" "+user.getEmail()+" "+user.getPassword());
//            User savedUser = userService.saveUser(user);
//            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(null);
//        }
//    }

    @GetMapping
    public ResponseEntity<?> getLoggedInUser(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String userName = auth.getName();

        return ResponseEntity.ok(userService.findUserByUserName(userName));
    }

    // Get all users
    @GetMapping("/findAll")
    public ResponseEntity<List<User>> findAllUsers() {
        try {
            List<User> users = userService.getAllUsers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }
}
