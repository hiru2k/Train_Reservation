/*
 * Filename: LoginActivity.java
 * Description: Contains traveler login functionality with calling the login API
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
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.example.train_reservation.R;
import com.example.train_reservation.models.User;
import com.example.train_reservation.utils.LoginAPIInterface;
import com.example.train_reservation.utils.LoginResponse;
import com.example.train_reservation.utils.SQLiteManager;
import com.example.train_reservation.utils.UpdateProfileAPIInterface;
import com.google.gson.Gson;

import java.util.concurrent.TimeUnit;

import okhttp3.OkHttpClient;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class LoginActivity extends AppCompatActivity {

    // Login CANNOT done without internet because , if the user register through the
    // web, the deatails are stored only in mongodb
    private EditText etUsername;
    private EditText etPassword;
    private Button btnLogin;

    private TextView signUpLink;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        etUsername = findViewById(R.id.etUsername);
        etPassword = findViewById(R.id.etPassword);
        btnLogin = findViewById(R.id.btnLogin);
        signUpLink = findViewById(R.id.signUpLink);

        signUpLink.setOnClickListener((new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(LoginActivity.this, RegisterActivity.class);
                startActivity(intent);
            }
        }));

        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (isNetworkAvailable()) {
                    String username = etUsername.getText().toString().trim();
                    String password = etPassword.getText().toString().trim();

                    // Retrofit initialization
                    Retrofit retrofit = new Retrofit.Builder()
                            .baseUrl("http://192.168.8.101:5059/api/EndUser/")
                            .client(new OkHttpClient.Builder()
                                    // Allow SSL redirects
                                    .connectTimeout(30, TimeUnit.SECONDS)
                                    .readTimeout(30, TimeUnit.SECONDS)
                                    .writeTimeout(30, TimeUnit.SECONDS)
                                    .build())
                            .addConverterFactory(GsonConverterFactory.create())
                            .build();

                    LoginAPIInterface loginAPIInterface = retrofit.create(LoginAPIInterface.class);

                    User user = new User();
                    user.username = username;
                    user.password = password;
                    System.out.print(user.username);
                    // call the api login
                    Call<LoginResponse> call = loginAPIInterface.loginUser(user);

                    call.enqueue(new Callback<LoginResponse>() {
                        @Override
                        public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                            if (response.code() == 200 && response.body() != null) {
                                LoginResponse loginResponse = response.body();

                                User user = loginResponse.user;
                                String token = loginResponse.token;

                                if (user.status.equals("Active")) { // not working =="Active"

                                    // Save the token in SharedPreferences
                                    saveTokenToSharedPreferences(token, user);

                                    // Insert the User object into the SQLite database
                                    SQLiteManager dbHelper = new SQLiteManager(LoginActivity.this);
                                    dbHelper.insertUser(user);// inset user to use in update function

                                    Toast.makeText(LoginActivity.this, "Login successful!", Toast.LENGTH_SHORT).show();

                                    etUsername.setText("");
                                    etPassword.setText("");

                                    // Navigate to the login activity
                                    Intent intent = new Intent(LoginActivity.this, ProfileActivity.class);
                                    startActivity(intent);
                                    finish();
                                } else {

                                    // Build an alert dialog
                                    AlertDialog.Builder builder = new AlertDialog.Builder(LoginActivity.this);
                                    builder.setTitle("Activate Account");
                                    builder.setMessage(
                                            "Your account has deactivated , Are you sure you want to reactivate your account?");

                                    // "Yes" button
                                    builder.setPositiveButton("Yes", new DialogInterface.OnClickListener() {
                                        @Override
                                        public void onClick(DialogInterface dialog, int which) {

                                            // Retrofit initialization
                                            Retrofit retrofit = new Retrofit.Builder()
                                                    .baseUrl("http://192.168.8.101:5059/api/EndUser/")
                                                    .client(new OkHttpClient.Builder()
                                                            // Allow SSL redirects
                                                            .connectTimeout(30, TimeUnit.SECONDS)
                                                            .readTimeout(30, TimeUnit.SECONDS)
                                                            .writeTimeout(30, TimeUnit.SECONDS)
                                                            .build())
                                                    .addConverterFactory(GsonConverterFactory.create())
                                                    .build();

                                            // Create an instance of API interface
                                            UpdateProfileAPIInterface updateProfileAPIInterface = retrofit
                                                    .create(UpdateProfileAPIInterface.class);

                                            user.status = "Pending";

                                            // Call API endpoint
                                            Call<Void> call = updateProfileAPIInterface.updateUserProfile(user.nic,
                                                    user);

                                            call.enqueue(new Callback<Void>() {
                                                @Override
                                                public void onResponse(Call<Void> call, Response<Void> response) {
                                                    if (response.isSuccessful()) {

                                                        Toast.makeText(LoginActivity.this,
                                                                "Request is recored, wait until the activation!,",
                                                                Toast.LENGTH_SHORT).show();

                                                    }
                                                }

                                                @Override
                                                public void onFailure(Call<Void> call, Throwable t) {

                                                    Toast.makeText(LoginActivity.this,
                                                            "Request failed. Please try again later.",
                                                            Toast.LENGTH_SHORT).show();
                                                }
                                            });
                                        }
                                    });

                                    // "No" button
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

                            } else {
                                if (response.code() == 403) {

                                    Toast.makeText(LoginActivity.this, "You have to wait till activate your account",
                                            Toast.LENGTH_SHORT).show();
                                }
                                if (response.code() == 401) {
                                    Toast.makeText(LoginActivity.this, "Invalid Username or Password",
                                            Toast.LENGTH_SHORT).show();
                                }

                            }
                        }

                        @Override
                        public void onFailure(Call<LoginResponse> call, Throwable t) {

                            Toast.makeText(LoginActivity.this, "Login failed. Please try again later.",
                                    Toast.LENGTH_SHORT).show();
                        }

                    });
                }
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

    private void saveTokenToSharedPreferences(String token, User user) {
        // Get SharedPreferences editor
        SharedPreferences.Editor editor = getSharedPreferences("MyPrefs", MODE_PRIVATE).edit();

        // save token with key "token"
        editor.putString("token", token);

        // Save the user JSON string with a unique key
        editor.putString("nic", user.nic);

        // Apply the changes
        editor.apply();
    }

}
