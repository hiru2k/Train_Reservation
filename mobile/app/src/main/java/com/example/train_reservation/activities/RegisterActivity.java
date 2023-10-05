package com.example.train_reservation.activities;

import androidx.appcompat.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.train_reservation.R;
import com.example.train_reservation.utils.RegistrationInputValidation;
import com.example.train_reservation.utils.SQLiteManager;

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
                String username = etUsername.getText().toString().trim();
                String password = etPassword.getText().toString().trim();
                String nic = etNIC.getText().toString().trim();
                String email = etEmail.getText().toString().trim();
                String phone = etPhone.getText().toString().trim();

                // Validate user input
                if (RegistrationInputValidation.validateAllFields(username, nic, "Users", email, password, phone)) {
                    // Registration data is valid, proceed with registration
                    boolean isRegistered = sqLiteManager.registerUser(username, password, nic, "Users", email, phone, "Pending");
                    if (isRegistered) {
                        Toast.makeText(RegisterActivity.this, "Registration successful!", Toast.LENGTH_SHORT).show();
                        // Navigate to the next activity or perform other actions
                    } else {
                        Toast.makeText(RegisterActivity.this, "Registration failed. NIC already exists.", Toast.LENGTH_SHORT).show();
                    }
                } else {
                    // Show validation errors
                    Toast.makeText(RegisterActivity.this, "Invalid input. Please check the fields.", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }
}
