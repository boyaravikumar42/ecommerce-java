package com.example.ecommerce.repos;

import com.example.ecommerce.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {

    @Query("SELECT p FROM Product p WHERE " +
            "LOWER(p.name) LIKE LOWER(CONCAT('%', :keyWord, '%')) OR " +
            "LOWER(p.descr) LIKE LOWER(CONCAT('%', :keyWord, '%')) OR " +
            "LOWER(p.category) LIKE LOWER(CONCAT('%', :keyWord, '%'))")
    List<Product> search(@Param("keyWord") String keyWord);
}

