package com.example.train_reservation.utils;

import androidx.annotation.Nullable;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class UserInputValidation {

    public static final String NIC_REGEX = "\\d{12}"; // 12 digits for NIC

    @Nullable
    public static String validateUsername( String username) {
        if (username.isEmpty()) {
            return "Username is required";
        }
        return null;
    }

    @Nullable
    public static String validateNIC( String nic) {
        if (nic.isEmpty()) {
            return "NIC is required";
        }

        Pattern pattern = Pattern.compile(NIC_REGEX);
        Matcher matcher = pattern.matcher(nic);

        if (!matcher.matches()) {
            return "NIC must be 12 digits";
        }
        return null;
    }


    @Nullable
    public static String validateRole( String role) {
        if (role.isEmpty()) {
            return "Role is required";
        }
        return null;
    }
    @Nullable
    public static String validateEmail( String email) {
        if (email.isEmpty()) {
            return "Email is required";
        }
        return null;
    }

    @Nullable
    public static String validatePassword( String password) {
        if (password.isEmpty()) {
            return "Password is required";
        }
        return null;
    }

    @Nullable
    public static String validatePhone( String phone) {
        if (phone.isEmpty()) {
            return "phone is required";
        }
        return null;
    }


    public static boolean validateAllFields(String username,  String nic,
                                             String email,  String password, String phone) {
        return validateUsername(username) == null &&
                validateNIC(nic) == null &&
                validateEmail(email) == null &&
                validatePassword(password) == null &&
                validatePhone(phone) == null;
    }
}
