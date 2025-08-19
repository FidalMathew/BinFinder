package com.fidal.binfinder.service;

import com.fidal.binfinder.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User saveUser(User user);

    List<User> getAllUsers();

    void deleteById(Long id);

    Optional<User> findUserById(Long id);

    User saveNewUser(User newUser);

    User findUserByUserName(String userName);
}
