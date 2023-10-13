package com.example.train_reservation.activities;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.train_reservation.R;
import com.example.train_reservation.models.Reservation;
import com.example.train_reservation.utils.ReservationAPIInterface;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class UpdateReservationActivity extends AppCompatActivity {
    private Reservation reservation;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_update_reservation);

        // Retrieve the reservation data from the intent
        reservation = (Reservation) getIntent().getSerializableExtra("reservation");

        // Initialize UI elements and set values to the reservation data
        TextView trainNameTextView = findViewById(R.id.trainNameTextView);
        EditText arrivalStationEditText = findViewById(R.id.arrivalStationEditText);
        EditText departureStationEditText = findViewById(R.id.departureStationEditText);
        EditText seatsNeededEditText = findViewById(R.id.seatsNeededEditText);

        // Retrieve the edited data

        String editedArrivalStation = arrivalStationEditText.getText().toString();
        String editedDepartureStation = departureStationEditText.getText().toString();
        int editedSeatsNeeded = Integer.parseInt(seatsNeededEditText.getText().toString());

        // Create a new Reservation object with the edited data
        Reservation editedReservation = new Reservation();
        editedReservation.setArrivalStation(editedArrivalStation);
        editedReservation.setDepartureStation(editedDepartureStation);
        editedReservation.setSeatsNeeded(editedSeatsNeeded);

        // Handle the update button click
        Button updateButton = findViewById(R.id.updateButton);

        updateButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Create a Retrofit instance
                Retrofit retrofit = new Retrofit.Builder()
                        .baseUrl("http://192.168.1.2:5059/api/Reservation/") // Replace with your API endpoint
                        .addConverterFactory(GsonConverterFactory.create())
                        .build();

                // Create an instance of  ReservationAPIInterface
                ReservationAPIInterface apiInterface = retrofit.create(ReservationAPIInterface.class);

                // Make an API call to update the reservation
                Call<Void> call = apiInterface.updateReservation(reservation.getId(), reservation);
                call.enqueue(new Callback<Void>() {
                    @Override
                    public void onResponse(Call<Void> call, Response<Void> response) {
                        if (response.isSuccessful()) {
                            // Handle the successful update
                            Toast.makeText(UpdateReservationActivity.this, "Reservation updated successfully", Toast.LENGTH_SHORT).show();
                        } else {
                            // Handle the update failure
                            Toast.makeText(UpdateReservationActivity.this, "Failed to update reservation", Toast.LENGTH_SHORT).show();
                        }
                    }

                    @Override
                    public void onFailure(Call<Void> call, Throwable t) {
                        // Handle the update failure
                        Toast.makeText(UpdateReservationActivity.this, "Failed to update reservation: " + t.getMessage(), Toast.LENGTH_SHORT).show();
                    }
                });
            }
        });

        // Handle the delete button click
        Button deleteButton = findViewById(R.id.deleteButton);
        deleteButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Show a confirmation dialog before deleting
                showDeleteConfirmationDialog();
            }
        });
    }

    private void showDeleteConfirmationDialog() {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setMessage("Are you sure you want to delete this reservation?");
        builder.setPositiveButton("Delete", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {


                // Create a Retrofit instance
                Retrofit retrofit = new Retrofit.Builder()
                        .baseUrl("http://192.168.1.2:5059/api/Reservation/") // Replace with your API endpoint
                        .addConverterFactory(GsonConverterFactory.create())
                        .build();

                // Create an instance of ReservationAPIInterface
                ReservationAPIInterface apiInterface = retrofit.create(ReservationAPIInterface.class);

                // Make an API call to delete the reservation
                Call<Void> call = apiInterface.deleteReservation(reservation.getId());
                call.enqueue(new Callback<Void>() {
                    @Override
                    public void onResponse(Call<Void> call, Response<Void> response) {
                        if (response.isSuccessful()) {
                            // Handle the successful deletion
                            Toast.makeText(UpdateReservationActivity.this, "Reservation deleted successfully", Toast.LENGTH_SHORT).show();
                            dialog.dismiss();
                            finish(); // Close the activity after deleting
                        } else {
                            // Handle the deletion failure
                            Toast.makeText(UpdateReservationActivity.this, "Failed to delete reservation", Toast.LENGTH_SHORT).show();
                            dialog.dismiss();
                        }
                    }

                    @Override
                    public void onFailure(Call<Void> call, Throwable t) {
                        // Handle the deletion failure
                        Toast.makeText(UpdateReservationActivity.this, "Failed to delete reservation: " + t.getMessage(), Toast.LENGTH_SHORT).show();
                        dialog.dismiss();
                    }
                });
            }
        });
        builder.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.dismiss();
            }
        });
        builder.create().show();
    }
}

