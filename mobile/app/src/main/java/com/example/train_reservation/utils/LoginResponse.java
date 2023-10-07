package com.example.train_reservation.utils;

import com.example.train_reservation.models.User;

public class LoginResponse {

    private boolean success;
    private String message;
    private String token;
    private User user;



    public User getUser() {
        return user;
    }
}
