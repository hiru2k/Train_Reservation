package com.example.train_reservation.activities;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.train_reservation.R;
import com.example.train_reservation.models.Reservation;
import com.example.train_reservation.utils.ReservationAPIInterface;

import java.security.cert.X509Certificate;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import okhttp3.OkHttpClient;
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

        // Log that the activity is created
        Log.d("UpdateReservationActivity", "Activity created");

        // Retrieve the reservation data from the intent
        reservation = (Reservation) getIntent().getSerializableExtra("reservation");

        // Initialize UI elements and set values to the reservation data
        //TextView trainNameTextView = findViewById(R.id.trainNameTextView);
        EditText arrivalStationEditText = findViewById(R.id.arrivalStationEditText);
        EditText departureStationEditText = findViewById(R.id.departureStationEditText);
        EditText seatsNeededEditText = findViewById(R.id.seatsNeededEditText);

//        // Retrieve the edited data
//
//        String editedArrivalStation = arrivalStationEditText.getText().toString();
//        String editedDepartureStation = departureStationEditText.getText().toString();
//        int editedSeatsNeeded = Integer.parseInt(seatsNeededEditText.getText().toString());
//
//        // Create a new Reservation object with the edited data
//        Reservation editedReservation = new Reservation();
//        editedReservation.setArrivalStation(editedArrivalStation);
//        editedReservation.setDepartureStation(editedDepartureStation);
//        editedReservation.setSeatsNeeded(editedSeatsNeeded);


        arrivalStationEditText.setText(reservation.getArrivalStation());
        departureStationEditText.setText(reservation.getDepartureStation());
        seatsNeededEditText.setText(String.valueOf(reservation.getSeatsNeeded()));


        // Handle the update button click
        Button updateButton = findViewById(R.id.updateButton);

        // Log that the activity is created
        Log.d("UpdateReservationActivity", "Activity created");

        updateButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Log.d("UpdateReservationActivity", "Update button clicked");

                String editedArrivalStation = arrivalStationEditText.getText().toString();
                String editedDepartureStation = departureStationEditText.getText().toString();
                String seatsNeededText = seatsNeededEditText.getText().toString();

                if (!seatsNeededText.isEmpty()) {
                    int editedSeatsNeeded = Integer.parseInt(seatsNeededText);

//                    // Create a new Reservation object with the edited data
//                    Reservation editedReservation = new Reservation();
//                    editedReservation.setArrivalStation(editedArrivalStation);
//                    editedReservation.setDepartureStation(editedDepartureStation);
//                    editedReservation.setSeatsNeeded(editedSeatsNeeded);

                    // Update the existing Reservation object with the edited data
                    reservation.setArrivalStation(editedArrivalStation);
                    reservation.setDepartureStation(editedDepartureStation);
                    reservation.setSeatsNeeded(editedSeatsNeeded);


                    // Create a TrustManager that trusts all certificates
                    TrustManager[] trustAllCertificates = new TrustManager[]{
                            new X509TrustManager() {
                                @Override
                                public void checkClientTrusted(X509Certificate[] chain, String authType) {
                                }

                                @Override
                                public void checkServerTrusted(X509Certificate[] chain, String authType) {
                                }

                                @Override
                                public X509Certificate[] getAcceptedIssuers() {
                                    return new X509Certificate[0];
                                }
                            }
                    };

                    // Set up SSL context with the custom TrustManager
                    try {
                        SSLContext sslContext = SSLContext.getInstance("TLS");
                        sslContext.init(null, trustAllCertificates, new java.security.SecureRandom());

                        // Create a Retrofit instance
                        Retrofit retrofit = new Retrofit.Builder()
                                .baseUrl("http://192.168.1.2:5059/api/Reservation/") // Replace with your API endpoint
                                .addConverterFactory(GsonConverterFactory.create())
                                .client(new OkHttpClient.Builder()
                                        .sslSocketFactory(sslContext.getSocketFactory(), (X509TrustManager) trustAllCertificates[0])
                                        .hostnameVerifier((hostname, session) -> true)
                                        .build())
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
                                    Log.d("UpdateReservationActivity", "Reservation updated successfully");
                                    Toast.makeText(UpdateReservationActivity.this, "Reservation updated successfully", Toast.LENGTH_SHORT).show();
                                    // Redirect to ReservationListActivity and finish the current activity
                                    startActivity(new Intent(UpdateReservationActivity.this, ReservationListActivity.class));
                                    finish();
                                } else {
                                    // Handle the update failure
                                    Log.e("UpdateReservationActivity", "Failed to update reservation");
                                    Toast.makeText(UpdateReservationActivity.this, "Failed to update reservation", Toast.LENGTH_SHORT).show();
                                }
                            }

                            @Override
                            public void onFailure(Call<Void> call, Throwable t) {
                                // Handle the update failure
                                Log.e("UpdateReservationActivity", "Failed to update reservation: " + t.getMessage());
                                Toast.makeText(UpdateReservationActivity.this, "Failed to update reservation: " + t.getMessage(), Toast.LENGTH_SHORT).show();
                            }
                        });
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                } else {
                    // Handle the case where the input is empty or not a valid integer
                    Toast.makeText(UpdateReservationActivity.this, "Please enter a valid seat count", Toast.LENGTH_SHORT).show();
                }
            }
        });

        // Handle the delete button click
        Button deleteButton = findViewById(R.id.deleteButton);
        deleteButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Log.d("UpdateReservationActivity", "Delete button clicked");

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


                // Create a TrustManager that trusts all certificates
                TrustManager[] trustAllCertificates = new TrustManager[]{
                        new X509TrustManager() {
                            @Override
                            public void checkClientTrusted(X509Certificate[] chain, String authType) {
                            }

                            @Override
                            public void checkServerTrusted(X509Certificate[] chain, String authType) {
                            }

                            @Override
                            public X509Certificate[] getAcceptedIssuers() {
                                return new X509Certificate[0];
                            }
                        }
                };

                // Set up SSL context with the custom TrustManager
                try {
                    SSLContext sslContext = SSLContext.getInstance("TLS");
                    sslContext.init(null, trustAllCertificates, new java.security.SecureRandom());


                    // Create a Retrofit instance
                    Retrofit retrofit = new Retrofit.Builder()
                            .baseUrl("http://192.168.1.2:5059/api/Reservation/") // Replace with your API endpoint
                            .addConverterFactory(GsonConverterFactory.create())
                            .client(new OkHttpClient.Builder()
                                    .sslSocketFactory(sslContext.getSocketFactory(), (X509TrustManager) trustAllCertificates[0])
                                    .hostnameVerifier((hostname, session) -> true)
                                    .build())
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
                                // Redirect to ReservationListActivity and finish the current activity
                                startActivity(new Intent(UpdateReservationActivity.this, ReservationListActivity.class));
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
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
        builder.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.dismiss();
                startActivity(new Intent(UpdateReservationActivity.this, ReservationListActivity.class));
                finish();
            }
        });
        builder.create().show();
    }
}

