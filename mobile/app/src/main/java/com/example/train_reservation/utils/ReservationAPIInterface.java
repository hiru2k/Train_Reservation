package com.example.train_reservation.utils;

import com.example.train_reservation.models.Reservation;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface ReservationAPIInterface {
    // method for getting reservations
    @GET("getAllReservations")
    Call<List<Reservation>> getReservation();

    // method for updating a reservation
    @PUT("updateReservation/{id}")
    Call<Void> updateReservation(@Path("reservationId") String reservationId, @Body Reservation reservation);

    // method for deleting a reservation
    @DELETE("deleteReservation/{id}")
    Call<Void> deleteReservation(@Path("reservationId") String reservationId);
}
