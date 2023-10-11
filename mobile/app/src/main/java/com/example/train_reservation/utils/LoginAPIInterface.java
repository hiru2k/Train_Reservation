/*
 * Filename: LoginAPIInterface.java
 * Description: Contains the functionality of calling the API for login
 * Author: Hiruni Mudannayake
*/
package com.example.train_reservation.utils;

import com.example.train_reservation.models.User;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface LoginAPIInterface

{
    @POST("login") // <LoginRespose> is not void cause it return user obj
    Call<LoginResponse> loginUser(@Body User loginUser);
}
