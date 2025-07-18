package com.example.ecommerce.controllers;

import com.example.ecommerce.models.CartItems;
import com.example.ecommerce.services.CartService;
import org.hibernate.annotations.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

@Component
@RestController
@RequestMapping("/cart")
public class CartController {
    @Autowired
    CartService service;

    @GetMapping("/items/{userId}")
    public ResponseEntity<?> getCartItemsById(@PathVariable int userId)
    {
        return service.getCartItemsById(userId);
    }
    @PostMapping("/add")
    public ResponseEntity<?> addItemToCart(@RequestBody CartItems item)
    {
        return service.addItemToCart(item);
    }

    @PutMapping("/update/{cartId}")
    public ResponseEntity<String> changeQuantity(@PathVariable int cartId,@RequestParam int quantity)
    {
        return service.changeQuantity(cartId,quantity);
    }


    @DeleteMapping("/delete/{cartId}")
    public ResponseEntity<String> deleteItem(@PathVariable int cartId)
    {
        return service.deleteItem(cartId);
    }
    @GetMapping("/get")
    public ResponseEntity<?> getCartItem(@RequestParam int prodId,@RequestParam int userId)
    {
        return service.getCartItemsBy(prodId,userId);
    }



}
