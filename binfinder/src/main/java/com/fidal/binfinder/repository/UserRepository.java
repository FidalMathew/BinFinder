package com.fidal.binfinder.repository;

import com.fidal.binfinder.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUserName(String username);

    void deleteByUserName(String username);
}
