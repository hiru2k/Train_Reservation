package com.example.train_reservation.utils;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.POST;


public interface RegisterAPIInterface {


    @POST("register") // endpoint
    Call<Void> registerUser(@Body RegisterRequestData registerData);
}
