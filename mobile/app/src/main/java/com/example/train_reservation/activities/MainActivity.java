package com.example.train_reservation.activities;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.TextView;

import com.example.train_reservation.R;

public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Find the TextView element by its ID
        TextView textView = findViewById(R.id.textView);

        // Set the text of the TextView
        textView.setText("Hello, Android!");
    }
}