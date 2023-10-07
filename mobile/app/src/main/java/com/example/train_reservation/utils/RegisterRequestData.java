package com.example.train_reservation.utils;

public class RegisterRequestData {
    private String Username;
    private String Password;
    private String NIC;
    private String Role;
    private String Email;
    private String Phone;
    private String Status;

    public void setUsername(String username) {
        Username = username;
    }

    public void setPassword(String password) {
        Password = password;
    }

    public void setNIC(String NIC) {
        this.NIC = NIC;
    }

    public void setRole(String role) {
        Role = role;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public void setPhone(String phone) {
        Phone = phone;
    }

    public void setStatus(String status) {
        Status = status;
    }
}
