package com.fidal.binfinder.controller;

import com.fidal.binfinder.entity.User;
import com.fidal.binfinder.service.UserDetailsServiceImpl;
import com.fidal.binfinder.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public")
public class PublicController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    private UserService userService;

    @GetMapping("/test")
    public ResponseEntity<?> get(){

        return ResponseEntity.ok("testing successful");
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        User newUser = new User();

        System.out.println("dsa "+user.getUserName()+" "+user.getPassword());

        newUser.setUserName(user.getUserName());
        newUser.setPassword(user.getPassword());

        User res = userService.saveNewUser(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUserName(), user.getPassword())
            );

            // If successful, authentication object will have user details
            return ResponseEntity.ok("Login successful for: " + authentication.getName());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }


}
