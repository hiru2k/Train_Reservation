package com.example.train_reservation.utils;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface LoginAPIInterface

{
    @POST("login") // endpoint// endpoint for login
    Call<Void> loginUser(@Body LoginRequestData loginUser);
}
