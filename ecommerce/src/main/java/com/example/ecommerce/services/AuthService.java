package com.example.ecommerce.services;

import com.example.ecommerce.config.JWTUtil;
import com.example.ecommerce.models.Users;
import com.example.ecommerce.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;


@Service
public class AuthService {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JWTUtil jwtutil;
    @Autowired
    UserRepo repo;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    EmailService emailService;
    public ResponseEntity<?> login(Users user) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword()));

        String token = jwtutil.generateToken(user.getEmail());

        Users user1 = repo.findByEmail(user.getEmail());
        user1.setPassword(token);
        return ResponseEntity.ok(user1);
    }
    public ResponseEntity<String> register(Users user)
    {
        Users user1 = repo.findByEmail(user.getEmail());
        if(user1!=null)
        {
            return new ResponseEntity<>("mail already exist", HttpStatus.ALREADY_REPORTED);
        }
        user.setPassword(encoder.encode(user.getPassword()));
        user.setCreatedAt(new Date());
        repo.save(user);
        sentOtp(user.getEmail());
        return new ResponseEntity<>("Otp sent to the provided mail",HttpStatus.CONTINUE);
    }
    public ResponseEntity<String> verifyOtp(String mail, String otp)
    {
        Users user =repo.findByEmail(mail);
        if(user !=null)
        {
            if(user.getOtp().equals(otp))
            {
                user.setVerified(true);
                user.setOtp(null);
                repo.save(user);
                return ResponseEntity.ok("user successfully verified");
            }
        }
        return new ResponseEntity<>("unable to verify the user",HttpStatus.BAD_REQUEST);
    }
    public String  sentOtp(String mail)
    {
        Users user = repo.findByEmail(mail);
        String otp = emailService.generateOtp();
        user.setOtp(otp);
        user.setVerified(false);
        repo.save(user);
        emailService.sendEmail(user.getEmail(),"Mail verification from the BYTE BAZAAR","This is mail verification from the byte bazaar otp is "+otp);
        return "ok";
    }

    public ResponseEntity<?> getuserByMail(String mail) {

        Users user =repo.findByEmail(mail);
        if(user!=null)
            return ResponseEntity.ok(user);
        else{
            return new ResponseEntity<>("user not found",HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> updateUser(int userId, Users user)
    {
       Optional<Users> user1 =repo.findById(userId);
       if(user1.isPresent())
       {
           user.setUserId(userId);
           user =repo.save(user);
           return ResponseEntity.ok(user);
       }
       return new ResponseEntity<>("not found",HttpStatus.NOT_FOUND);

    }

//    public ResponseEntity<String> changePassword(String mail) {
//        Users user = repo.findByEmail(mail);
//        if(user==null)
//        {
//            return new ResponseEntity<>("mail not found", HttpStatus.NOT_FOUND);
//        }
//        user.setPassword(encoder.encode(user.getPassword()));
//        String otp = emailService.generateOtp();
//        user.setOtp(otp);
//        repo.save(user);
//        emailService.sendEmail(user.getEmail(),"Mail verification from the BYTE BAZAAR","This is mail verification from the byte bazaar otp is "+otp);
//        return new ResponseEntity<>("Otp sent to the provided mail",HttpStatus.CONTINUE);
//
//    }
}
