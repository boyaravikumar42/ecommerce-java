package com.example.ecommerce.repos;

import com.example.ecommerce.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<Users,Integer> {
    Users findByEmail(String username);
}
