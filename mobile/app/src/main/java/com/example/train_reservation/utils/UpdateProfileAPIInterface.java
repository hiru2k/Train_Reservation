/*
 * Filename: UpdateProfileAPIInterface.java
 * Description: Contains the functionality of calling the API for updating the profile
 * Author: Hiruni Mudannayake
*/
package com.example.train_reservation.utils;

import com.example.train_reservation.models.User;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface UpdateProfileAPIInterface {
    @PUT("profile/{nic}")
    Call<Void> updateUserProfile(@Path("nic") String nic, @Body User user);
}
