package com.fidal.binfinder.service;

import com.fidal.binfinder.entity.User;
import com.fidal.binfinder.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public User saveUser(User user) {
        userRepository.save(user);
        return user;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public User saveNewUser(User newUser) {

        if (userRepository.findByUserName(newUser.getUserName()) != null) {
            throw new RuntimeException("Username already exists: " + newUser.getUserName());
        }

        // Encode password before saving
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));

        // Optionally assign a default role
        if (newUser.getRoles() == null || newUser.getRoles().isEmpty()) {
            newUser.setRoles(Collections.singletonList("USER"));
        }

        return userRepository.save(newUser);
    }

    @Override
    public User findUserByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }


}
