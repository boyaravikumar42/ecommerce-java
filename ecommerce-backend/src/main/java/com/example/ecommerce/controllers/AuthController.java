package com.example.ecommerce.controllers;

import com.example.ecommerce.config.JWTUtil;
import com.example.ecommerce.models.Users;
import com.example.ecommerce.services.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@Component
public class AuthController {
    @Autowired
    AuthService service;
    @Autowired
    JWTUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Users user) {
        return service.login(user);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Users user) {
        System.out.println(user);
        return service.register(user);
    }
    //sending otp
    @PostMapping("/sentotp")
    public ResponseEntity<String> sentOtp(@RequestParam String mail) {
         service.sentOtp(mail);
         return ResponseEntity.ok("otp sent if mail exist");
    }
    @PostMapping("/verifyotp")
    public ResponseEntity<String> sentOtp(@RequestParam String mail, @RequestParam String otp) {
        return service.verifyOtp(mail, otp);
    }
    @PutMapping("/resetpassword")
    public ResponseEntity<String> sentOtp(@RequestBody Users user, @RequestParam String otp) {
        return service.resetPassword(user, otp);
    }

    @GetMapping("/user")
    public ResponseEntity<?> getUser(HttpServletRequest req) {
        String token = req.getHeader("Authorization");
        token = token.substring(7);
        String mail = jwtUtil.extractUsername(token);
        return service.getuserByMail(mail);

    }
    @PutMapping("/update/{userId}")
    public ResponseEntity<?> updateuser(@RequestBody Users user,@PathVariable int userId)
    {
        return service.updateUser(userId,user);

    }
    @PostMapping("/getpassword/{userId}")
    public ResponseEntity<Boolean> getPassword(@RequestBody Users user,@PathVariable int userId)
    {
        return service.getPassword(user.getPassword(),userId);
    }

    @PutMapping("/update-password/{userId}")
    public ResponseEntity<?> changePassword(@PathVariable int userId,@RequestBody Users user )
    {
        return service.changePassword(userId,user);
    }

}



