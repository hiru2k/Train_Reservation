/*
 * Filename: ProfileActivity.java
 * Description: Contains the functionality of traveler profile page with edit and deactivate account options.
 * Author: Hiruni Mudannayake
*/
package com.example.train_reservation.activities;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.example.train_reservation.R;
import com.example.train_reservation.models.User;
import com.example.train_reservation.utils.RegisterAPIInterface;
import com.example.train_reservation.utils.UpdateProfileAPIInterface;
import com.example.train_reservation.utils.UserInputValidation;
import com.example.train_reservation.utils.SQLiteManager;

import java.util.concurrent.TimeUnit;

import okhttp3.OkHttpClient;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ProfileActivity extends AppCompatActivity {

    // Update CAN NOT done without internet cause ,when user logging if password has
    // been changed , user can't log.
    // because, changed password is not in mongo db.

    private EditText etUsername, etPassword, etEmail, etPhone;
    private TextView etNIC;
    private Button btnEditProf, btnDeactivate, btnLogout;
    private User user;
    private SQLiteManager dbHelper;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);

        dbHelper = new SQLiteManager(this);

        etUsername = findViewById(R.id.etUsername);
        etNIC = findViewById(R.id.etNIC);
        etPassword = findViewById(R.id.etPassword);
        etEmail = findViewById(R.id.etEmail);
        etPhone = findViewById(R.id.etPhone);
        btnEditProf = findViewById(R.id.btnEditProf);
        btnLogout = findViewById(R.id.btnLogout);

        btnDeactivate = findViewById(R.id.btnDeactivate);

        // get nic from local storage

        SharedPreferences prefs = getSharedPreferences("MyPrefs", MODE_PRIVATE);
        String nic = prefs.getString("nic", null);

        user = dbHelper.getUserByNIC(nic);

        if (user != null) {
            etUsername.setText(user.username);
            etNIC.setText(user.nic);
            etPassword.setText(user.password);
            etEmail.setText(user.email);
            etPhone.setText(user.phone);
        }

        btnEditProf.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                if (isNetworkAvailable()) {

                    String editedUsername = etUsername.getText().toString();
                    String editedPassword = etPassword.getText().toString();
                    String editedEmail = etEmail.getText().toString();
                    String editedPhone = etPhone.getText().toString();

                    if (UserInputValidation.validateAllFields(editedUsername, nic, editedEmail, editedPassword,
                            editedPhone)) {

                        // Retrofit initialization
                        Retrofit retrofit = new Retrofit.Builder()
                                .baseUrl("http://192.168.8.102:5059/api/EndUser/")
                                .client(new OkHttpClient.Builder()
                                        // Allow SSL redirects
                                        .connectTimeout(30, TimeUnit.SECONDS)
                                        .readTimeout(30, TimeUnit.SECONDS)
                                        .writeTimeout(30, TimeUnit.SECONDS)
                                        .build())
                                .addConverterFactory(GsonConverterFactory.create())
                                .build();

                        // Create an instance of API interface
                        UpdateProfileAPIInterface registerAPIInterface = retrofit
                                .create(UpdateProfileAPIInterface.class);

                        // Update the user object with edited values
                        user.username = editedUsername;
                        user.password = editedPassword;
                        user.email = editedEmail;
                        user.phone = editedPhone;
                        user.status = "Active";

                        // Call API endpoint
                        Call<Void> call = registerAPIInterface.updateUserProfile(nic, user);

                        call.enqueue(new Callback<Void>() {
                            @Override
                            public void onResponse(Call<Void> call, Response<Void> response) {
                                if (response.isSuccessful()) {

                                    Toast.makeText(ProfileActivity.this, "Updated Sucessful!,", Toast.LENGTH_SHORT)
                                            .show();

                                }

                            }

                            @Override
                            public void onFailure(Call<Void> call, Throwable t) {

                                Toast.makeText(ProfileActivity.this, "Edition failed. Please try again later.",
                                        Toast.LENGTH_SHORT).show();
                            }
                        });
                    }

                }
            }
        });
        btnDeactivate.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if (isNetworkAvailable()) {

                    Retrofit retrofit = new Retrofit.Builder()
                            .baseUrl("http://192.168.8.103:5059/api/EndUser/")
                            .client(new OkHttpClient.Builder()
                                    // Allow SSL redirects
                                    .connectTimeout(30, TimeUnit.SECONDS)
                                    .readTimeout(30, TimeUnit.SECONDS)
                                    .writeTimeout(30, TimeUnit.SECONDS)
                                    .build())
                            .addConverterFactory(GsonConverterFactory.create())
                            .build();

                    // Create an instance of API interface
                    UpdateProfileAPIInterface registerAPIInterface = retrofit.create(UpdateProfileAPIInterface.class);

                    // Build an alert dialog
                    AlertDialog.Builder builder = new AlertDialog.Builder(ProfileActivity.this);
                    builder.setTitle("Deactivate Account");
                    builder.setMessage("Are you sure you want to deactivate your account?");

                    // "Yes" button
                    builder.setPositiveButton("Yes", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            // Update the user status to deactivate in the database
                            user.status = "Deactivate";
                            // Call API endpoint
                            Call<Void> call = registerAPIInterface.updateUserProfile(nic, user);

                            call.enqueue(new Callback<Void>() {
                                @Override
                                public void onResponse(Call<Void> call, Response<Void> response) {
                                    if (response.isSuccessful()) {

                                        Toast.makeText(ProfileActivity.this, "Deactivated Sucessful!,",
                                                Toast.LENGTH_SHORT).show();

                                        Intent intent = new Intent(ProfileActivity.this, LoginActivity.class);
                                        startActivity(intent);
                                        finish();
                                    }
                                }

                                @Override
                                public void onFailure(Call<Void> call, Throwable t) {

                                    Toast.makeText(ProfileActivity.this, "Deactivation failed. Please try again later.",
                                            Toast.LENGTH_SHORT).show();
                                }
                            });
                        }
                    });

                    // Add "No" button with no functionality (closes the dialog)
                    builder.setNegativeButton("No", new DialogInterface.OnClickListener() {
                        @Override
                        public void onClick(DialogInterface dialog, int which) {
                            // Dismiss the dialog (do nothing)
                            dialog.dismiss();
                        }
                    });

                    // Show the alert dialog
                    AlertDialog alertDialog = builder.create();
                    alertDialog.show();
                }
            }
        });

        Button btnLogout = findViewById(R.id.btnLogout);
        btnLogout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Remove token from local storage
                removeTokenFromLocalStorage();
                dbHelper.deleteUserByNIC(nic);

                Intent intent = new Intent(ProfileActivity.this, LoginActivity.class);
                startActivity(intent);
                finish();
            }
        });

    }

    private boolean isNetworkAvailable() {
        ConnectivityManager connectivityManager = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        if (connectivityManager != null) {
            NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
            return activeNetworkInfo != null && activeNetworkInfo.isConnected();
        }
        return false;
    }

    private void removeTokenFromLocalStorage() {
        // Get SharedPreferences editor
        SharedPreferences.Editor editor = getSharedPreferences("MyPrefs", MODE_PRIVATE).edit();

        // Remove the token with the key "token"
        editor.remove("token");

        // Apply the changes
        editor.apply();
    }

}