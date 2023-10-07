package com.example.train_reservation.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.train_reservation.R;
import com.example.train_reservation.models.User;
import com.example.train_reservation.utils.RegisterAPIInterface;
import com.example.train_reservation.utils.RegistrationInputValidation;
import com.example.train_reservation.utils.SQLiteManager;

import java.util.concurrent.TimeUnit;

import okhttp3.OkHttpClient;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RegisterActivity extends AppCompatActivity {

    private EditText etUsername;
    private EditText etPassword;
    private EditText etNIC;
    private EditText etEmail;
    private EditText etPhone;
    private Button btnRegister;
    private SQLiteManager sqLiteManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        sqLiteManager = new SQLiteManager(this);

        etUsername = findViewById(R.id.etUsername);
        etPassword = findViewById(R.id.etPassword);
        etNIC = findViewById(R.id.etNIC);
        etEmail = findViewById(R.id.etEmail);
        etPhone = findViewById(R.id.etPhone);
        btnRegister = findViewById(R.id.btnRegister);

        btnRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (isNetworkAvailable()) {
                String username = etUsername.getText().toString().trim();
                String password = etPassword.getText().toString().trim();
                String nic = etNIC.getText().toString().trim();
                String email = etEmail.getText().toString().trim();
                String phone = etPhone.getText().toString().trim();


                if (RegistrationInputValidation.validateAllFields(username, nic, "Users", email, password, phone)) {

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

                    // Create an instance of API interface
                    RegisterAPIInterface registerAPIInterface = retrofit.create(RegisterAPIInterface.class);

                    User user = new User(username,nic,"User",password,email,phone,"Pending");

                    // Call API endpoint
                    Call<Void> call = registerAPIInterface.registerUser(user);

                    call.enqueue(new Callback<Void>() {
                        @Override
                        public void onResponse(Call<Void> call, Response<Void> response) {
                            if (response.isSuccessful()) {

                                Toast.makeText(RegisterActivity.this, "Registration successful!,", Toast.LENGTH_SHORT).show();

                                etUsername.setText("");
                                etPassword.setText("");
                                etNIC.setText("");
                                etEmail.setText("");
                                etPhone.setText("");

                                // Navigate to the login activity
                                Intent intent = new Intent(RegisterActivity.this, LoginActivity.class);
                                startActivity(intent);
                                finish();
                            }
                            if (response.code()==401)
                            {  Toast.makeText(RegisterActivity.this, "User is already exist in same NIC", Toast.LENGTH_SHORT).show(); }

                        }

                        @Override
                        public void onFailure(Call<Void> call, Throwable t) {

                            Toast.makeText(RegisterActivity.this, "Registration failed. Please try again later.", Toast.LENGTH_SHORT).show();
                        }
                    });
                } else {

                    Toast.makeText(RegisterActivity.this, "Invalid input. Please check the fields.", Toast.LENGTH_SHORT).show();
                }
            } else {

                Toast.makeText(RegisterActivity.this, "No Internet connection. Please check your network settings.", Toast.LENGTH_SHORT).show();
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
}
