package com.example.train_reservation.models;

import com.google.gson.annotations.SerializedName;

public class User {

    @SerializedName("username")
    public String username;

    @SerializedName("nic")
    public String nic;

    @SerializedName("role")
    public String role;

    @SerializedName("password")
    public String password;

    @SerializedName("email")
    public String email;

    @SerializedName("phone")
    public String phone;

    @SerializedName("status")
    public String status;

    // Constructors, getters, and setters

    public User() {
    }


}
