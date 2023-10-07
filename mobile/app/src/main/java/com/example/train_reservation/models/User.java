package com.example.train_reservation.models;

import com.google.gson.annotations.SerializedName;

public class User {

    @SerializedName("username")
    private String username;

    @SerializedName("nic")
    private String nic;

    @SerializedName("role")
    private String role;

    @SerializedName("password")
    private String password;

    @SerializedName("email")
    private String email;

    @SerializedName("phone")
    private String phone;

    @SerializedName("status")
    private String status;

    // Constructors, getters, and setters

    public User() {
    }

    public User(String username, String nic, String role, String password, String email, String phone, String status) {
        this.username = username;
        this.nic = nic;
        this.role = role;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.status = status;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public String getNic() {
        return nic;
    }

    public String getRole() {
        return role;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getStatus() {
        return status;
    }

}
