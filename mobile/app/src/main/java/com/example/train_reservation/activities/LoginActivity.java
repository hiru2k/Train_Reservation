package com.example.train_reservation.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.train_reservation.R;
import com.example.train_reservation.utils.LoginAPIInterface;
import com.example.train_reservation.utils.LoginRequestData;
import com.example.train_reservation.utils.RegisterRequestData;

import java.util.concurrent.TimeUnit;

import okhttp3.OkHttpClient;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class LoginActivity extends AppCompatActivity {

    private EditText etUsername;
    private EditText etPassword;
    private Button btnLogin;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        etUsername = findViewById(R.id.etUsername); // Replace with your EditText ID
        etPassword = findViewById(R.id.etPassword);
        btnLogin = findViewById(R.id.btnLogin);// Replace with your EditText ID

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
                                    .connectTimeout(30, TimeUnit.SECONDS) // Adjust the timeout duration as needed
                                    .readTimeout(30, TimeUnit.SECONDS)
                                    .writeTimeout(30, TimeUnit.SECONDS)
                                    .build())
                            .addConverterFactory(GsonConverterFactory.create())
                            .build();

                    LoginAPIInterface loginAPIInterface = retrofit.create(LoginAPIInterface.class);

                    LoginRequestData loginData = new LoginRequestData();
                    loginData.setUsername(username);
                    loginData.setPassword(password);


                    Call<Void> call = loginAPIInterface.loginUser(loginData);

                    call.enqueue(new Callback<Void>() {
                        @Override
                        public void onResponse(Call<Void> call, Response<Void> response) {
                            if (response.code()==200) {

                                Toast.makeText(LoginActivity.this, "Login successful!", Toast.LENGTH_SHORT).show();
                            } else {
                                if(response.code()==403) {

                                    Toast.makeText(LoginActivity.this, "You have to wait till activate your account", Toast.LENGTH_SHORT).show();
                                }if(response.code()==401){
                                    Toast.makeText(LoginActivity.this, "Invalid Username or Password", Toast.LENGTH_SHORT).show();
                                }
                                }
                        }   @Override
                        public void onFailure(Call<Void> call, Throwable t) {

                            Toast.makeText(LoginActivity.this, "Login failed. Please try again later.", Toast.LENGTH_SHORT).show();
                        }


                    });
                }
            }
        });}

    private boolean isNetworkAvailable() {
        ConnectivityManager connectivityManager = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        if (connectivityManager != null) {
            NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
            return activeNetworkInfo != null && activeNetworkInfo.isConnected();
        }
        return false;
    }


}
