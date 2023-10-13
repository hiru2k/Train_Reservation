package com.example.train_reservation.utils;

import com.example.train_reservation.models.Reservation;
import com.example.train_reservation.models.Train;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;

public interface TrainAPIInterface {

    // method for get a all trains
    @GET("getAllTrains")
    Call<List<Train>> getTrains();

    // method for create a reservation
    @POST("newReservation")
    Call<Reservation> createReservation(@Body Reservation reservation);
}
