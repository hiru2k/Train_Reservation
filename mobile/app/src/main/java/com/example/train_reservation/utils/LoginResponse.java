/*
 * Filename: LoginResponse.java
 * Description: Contains properties of the response of the login API
 * Author: Hiruni Mudannayake
*/
package com.example.train_reservation.utils;

import com.example.train_reservation.models.User;

public class LoginResponse {

    public boolean success;
    public String message;
    public String token;
    public User user;

}
