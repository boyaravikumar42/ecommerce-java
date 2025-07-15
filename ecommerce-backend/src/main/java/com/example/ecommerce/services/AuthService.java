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
    // login logic
    public ResponseEntity<?> login(Users user) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword()));

        String token = jwtutil.generateToken(user.getEmail());

        Users user1 = repo.findByEmail(user.getEmail());
        user1.setPassword(token);
        return ResponseEntity.ok(user1);
    }
    //registration logic
    public ResponseEntity<String> register(Users user)
    {
        Users user1 = repo.findByEmail(user.getEmail());
        if(user1!=null)
        {
            return new ResponseEntity<>("mail already exist", HttpStatus.ALREADY_REPORTED);
        }
        user.setPassword(encoder.encode(user.getPassword()));
        user.setCreatedAt(new Date());
        user.setVerified(false);
        Users user2= repo.save(user);
         sentOtp(user.getEmail());
         return new ResponseEntity<>("Otp sent to the provided mail",HttpStatus.OK);
    }
    //sending otp
    public void  sentOtp(String mail)
    {
        Users user = repo.findByEmail(mail);
        String otp = emailService.generateOtp();
        user.setOtp(otp);
        user.setVerified(user.isVerified());
        repo.save(user);
        emailService.sendEmail(user.getEmail(),"Verify Your Email Address – OTP Inside","Hi "+user.getName()+",\n" +
                "\n" +
                "Thank you for being with Byte Bazaar!\n" +
                "\n" +
                "To complete your registration and verify your email address, please use the One-Time Password (OTP) below:\n" +
                "\n" +
                "\uD83D\uDD10 Your OTP: "+otp+"\n" +
                "\n" +
                "If you didn’t request this, please ignore this message.\n" +
                "\n" +
                "Best regards,\n" +
                "The Byte Bazaar Team\n");
    }
    //verifying the user
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
        return new ResponseEntity<>("invalid OTP",HttpStatus.BAD_REQUEST);
    }
    //resetting password
    public ResponseEntity<String> resetPassword(Users clientUser, String otp)
    {
        Users user =repo.findByEmail(clientUser.getEmail());
        if(user !=null)
        {
            if(user.getOtp().equals(otp))
            {
                user.setPassword(encoder.encode(clientUser.getPassword()));
                user.setOtp(null);
                repo.save(user);
                return ResponseEntity.ok("password successfully reset");
            }
        }
        return new ResponseEntity<>("invalid OTP",HttpStatus.BAD_REQUEST);
    }

    //getting user by id
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
        System.out.println(user);
       if(user1.isPresent())
       {
           user1.get().setName(user.getName());
           user1.get().setPhone(user.getPhone());
           user1.get().setAddr(user.getAddr());
           user1.get().setRole(user.getRole());
           user =repo.save(user1.get());
           return ResponseEntity.ok(user);
       }
       return new ResponseEntity<>("not found",HttpStatus.NOT_FOUND);

    }

    public ResponseEntity<Boolean> getPassword(String password, int userId) {
        Optional<Users> user = repo.findById(userId);

        System.out.println(password+" "+user);
        if(user.isPresent())
        {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.get().getEmail(),password));
            return new ResponseEntity<>(true,HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
    }
    //changing when user logged
    public ResponseEntity<?> changePassword(int userId, Users user)
    {
        Optional<Users> user1 =repo.findById(userId);
        System.out.println(user);
        if(user1.isPresent())
        {
            user.setPassword(encoder.encode(user.getPassword()));
            user =repo.save(user);
            return ResponseEntity.ok(user);
        }
        return new ResponseEntity<>("not found",HttpStatus.NOT_FOUND);
    }

}
