package com.IDE.IDE.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.IDE.IDE.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
