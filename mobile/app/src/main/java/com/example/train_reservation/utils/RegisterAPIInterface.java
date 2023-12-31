/*
 * Filename: RegisterAPIInterface.java
 * Description: Contains the functionality of calling the API for registration
 * Author: Hiruni Mudannayake
*/
package com.example.train_reservation.utils;

import com.example.train_reservation.models.User;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.POST;

public interface RegisterAPIInterface {

    @POST("register")
    Call<Void> registerUser(@Body User registerUser);
}
