package com.example.train_reservation.activities;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import com.example.train_reservation.R;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        CardView profileCard = findViewById(R.id.profileCard);
        CardView timetableCard = findViewById(R.id.timetableCard);
        CardView reservationsCard = findViewById(R.id.reservationsCard);

        profileCard.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Navigate to ProfileActivity
//                Intent intent = new Intent(MainActivity.this, ProfileActivity.class);
//                startActivity(intent);
            }
        });

        timetableCard.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Navigate to TrainListActivity
                Intent intent = new Intent(MainActivity.this, TrainListActivity.class);
                startActivity(intent);
            }
        });

        reservationsCard.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Navigate to ReservationListActivity
                Intent intent = new Intent(MainActivity.this, ReservationListActivity.class);
                startActivity(intent);
            }
        });
    }
}
