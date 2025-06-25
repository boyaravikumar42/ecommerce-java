package com.example.ecommerce.services;

import com.example.ecommerce.models.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.ecommerce.repos.ProductRepo;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    ProductRepo repo;
    public ProductService() {
    }

    public List<Product> getProducts() {

        List<Product> products= repo.findAll();
        return products;
    }

    public Product addProduct(Product product, MultipartFile imgFile) throws IOException {

        product.setImgName(imgFile.getOriginalFilename());
        product.setImgType(imgFile.getContentType());
        product.setImgData(imgFile.getBytes());
        Product product1= repo.save(product);
        System.out.println(product1);
        return product1;
    }

    public Product getProductById(int prodId) {
        Optional product =repo.findById(prodId);
        return (Product) product.orElse(new Product());

    }

    public List<Product> getMatchedProducts(String keyWord) {
        System.out.println("entry");
        return repo.search(keyWord);
    }

    public boolean deleteProductById(int prodId) {
        Optional product =repo.findById(prodId);
        if(product.isPresent())
        {
            repo.deleteById(prodId);
            return true;
        }
        return false;


    }

    public Product updateProductById(int prodId, Product product, MultipartFile imgFile) throws IOException {
        Optional product1 =repo.findById(prodId);
        if(product1.isPresent()) {
            product.setImgName(imgFile.getOriginalFilename());
            product.setImgType(imgFile.getContentType());
            product.setImgData(imgFile.getBytes());
            return repo.save(product);
        }
        return null;

    }
}
