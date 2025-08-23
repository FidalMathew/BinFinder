package com.fidal.binfinder.controller;

import com.fidal.binfinder.entity.User;
import com.fidal.binfinder.service.UserDetailsServiceImpl;
import com.fidal.binfinder.service.UserService;
import com.fidal.binfinder.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/api/public")
//@Slf4j
public class PublicController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

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

        try{
            User res = userService.saveNewUser(newUser);
            return ResponseEntity.status(HttpStatus.CREATED).body(res);
        } catch (Exception e) {
            System.out.println("Error :"+e);
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already Exists");
        }


    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUserName(), user.getPassword())
            );
            UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUserName());

            String jwt = jwtUtil.generateToken(userDetails.getUsername());

            HashMap<String, String> mp= new HashMap<>();
            mp.put("userName", user.getUserName());
            mp.put("jwt", jwt);

            return new ResponseEntity<>(mp, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println("Exception occurred while createAuthenticationToken "+ e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid username or password");
        }
    }


}
