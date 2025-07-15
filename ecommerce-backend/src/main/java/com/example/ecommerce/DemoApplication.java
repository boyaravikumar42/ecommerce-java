package com.example.ecommerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
//
		SpringApplication.run(DemoApplication.class, args);
//		Product product =context.getBean(Product.class);
//		System.out.println(product);

	}

}
