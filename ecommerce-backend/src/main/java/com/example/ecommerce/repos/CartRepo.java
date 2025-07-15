package com.example.ecommerce.repos;

import com.example.ecommerce.models.CartItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepo extends JpaRepository<CartItems,Integer> {
   List<CartItems> findByUserId(int userId);

   CartItems findByUserIdAndProductId(int userId, int productId);

   Optional<CartItems> findByCartId(int cartId);
}
