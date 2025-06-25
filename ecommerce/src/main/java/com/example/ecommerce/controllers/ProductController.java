package com.example.ecommerce.controllers;

import com.example.ecommerce.models.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import com.example.ecommerce.services.ProductService;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.util.List;
@Component
@RestController
@CrossOrigin("http://localhost:5173")
public class ProductController {
    @Autowired
    ProductService service;

    public ProductController() {

    }

    @RequestMapping("/")
    public String home() {
        return "home page";
    }

//    getting products
    @GetMapping("/products")
    public List<Product> getProducts() {
        return service.getProducts();
    }
//getting product by id
    @GetMapping("/products/{prodId}")
    public ResponseEntity<Product> getProductById(@PathVariable int prodId) {
        Product product = service.getProductById(prodId);
        if (product.getId() == prodId)
            return new ResponseEntity<>(product, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
//getting product image by the id
    @GetMapping("/products/img/{prodId}")
    public ResponseEntity<byte[]> getImage(@PathVariable int prodId) {
        Product product = service.getProductById(prodId);
        if (product.getId() == prodId)
            return new ResponseEntity<>(product.getImgData(), HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
//posting the product into the database
    @PostMapping("/products")
    public ResponseEntity<?> addProduct(@RequestPart Product product, @RequestPart MultipartFile imgFile) throws IOException {
        Product product1 = service.addProduct(product, imgFile);

        if (product1 != null)
            return new ResponseEntity<>(product1, HttpStatus.OK);
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

    }
//search the that are matched with teh keyword
    @GetMapping("products/search/{keyWord}")
    public ResponseEntity<List<Product>> getMatchedProducts(@PathVariable String keyWord) {
        List<Product> products = service.getMatchedProducts(keyWord);
        if (products.isEmpty())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<>(products, HttpStatus.OK);
    }
//deleting the product by the id
    @DeleteMapping("/products/delete/{prodId}")
    public ResponseEntity<String> deleteProduct(@PathVariable int prodId) {
        boolean res = service.deleteProductById(prodId);
        if (!res)
            return new ResponseEntity<>("Product was Not Found", HttpStatus.NOT_FOUND);
        return new ResponseEntity<>("Product Deleted SucessFully...", HttpStatus.OK);
    }
    //updating product by the id
    @PutMapping("/updateproduct/{prodId}")

    public ResponseEntity<?> updateProduct(@PathVariable int prodId, @RequestPart Product product, @RequestPart MultipartFile imgFile) throws IOException {
        Product product1 = service.updateProductById(prodId, product, imgFile);
        if(product==null)
        {
            return new ResponseEntity<>("Unable to update the product",HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(product1,HttpStatus.OK);
    }
}

