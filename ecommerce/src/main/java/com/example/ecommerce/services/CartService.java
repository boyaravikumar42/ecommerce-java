package com.example.ecommerce.services;

import com.example.ecommerce.models.CartItems;
import com.example.ecommerce.repos.CartRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    @Autowired
    CartRepo repo;

    public ResponseEntity<?> getCartItemsById(int userId) {
        List<CartItems> items = repo.findByUserId(userId);
        if(items==null || items.size()==0)
            return new ResponseEntity<>(items,HttpStatus.NO_CONTENT);
        return ResponseEntity.ok(items);
    }

    public ResponseEntity<?> addItemToCart(CartItems item) {
        System.out.println(item);
        CartItems item1 = repo.findByUserIdAndProductId(item.getUserId(),item.getProductId());
        if(item1!=null && item1.getQuantity()>0)
        {
            return changeQuantity(item1.getCartId(),item.getQuantity());
        }

        if(item==null)
            return new ResponseEntity<>("item is empty",HttpStatus.NOT_FOUND);
        item.setCreatedAt(new Date());
         item1 = repo.save(item);
        if(item1!=null) {
            return ResponseEntity.ok("item added to the cart successfully");
        }
        return new ResponseEntity<>("unable to add the product ", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<String> changeQuantity(int cartId,int quantity) {
        CartItems item = repo.findById(cartId).orElseThrow();
        item.setQuantity(quantity);
        repo.save(item);
        return new ResponseEntity<>("cart updated successfully",HttpStatus.OK);

    }

    public ResponseEntity<String> deleteItem(int cartId) {
        Optional<CartItems> item = repo.findByCartId(cartId);
        if(item.isPresent())
        {
            repo.deleteById(cartId);
            return new ResponseEntity<>("item deleted from the cart successfully",HttpStatus.OK);
        }
        return new ResponseEntity<>("item not found",HttpStatus.NOT_FOUND);
    }


}
