package com.example.train_reservation.activities;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import com.example.train_reservation.R;
import com.example.train_reservation.models.Reservation;
import com.example.train_reservation.models.Train;
import com.example.train_reservation.utils.TrainAPIInterface;

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

public class NewReservationActivity extends AppCompatActivity {
    private Train selectedTrain;
    private EditText arrivalStationEditText;
    private EditText departureStationEditText;
    private EditText seatCountEditText;
    private Button submitButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_new_reservation);

        Intent intent = getIntent();
        selectedTrain = (Train) intent.getSerializableExtra("selectedTrain");

        TextView trainNameTextView = findViewById(R.id.trainNameTextView);
        TextView startStationTextView = findViewById(R.id.startStationTextView);
        TextView endStationTextView = findViewById(R.id.endStationTextView);
        TextView startTimeTextView = findViewById(R.id.startTimeTextView);
        TextView endTimeTextView = findViewById(R.id.endTimeTextView);


        trainNameTextView.setText(selectedTrain.getTrainName());
        startStationTextView.setText("Start Station: " + selectedTrain.getStartStation());
        endStationTextView.setText("End Station: " + selectedTrain.getEndStation());
        startTimeTextView.setText("Start Time: " + selectedTrain.getStartTime());
        endTimeTextView.setText("End Time: " + selectedTrain.getEndTime());

        arrivalStationEditText = findViewById(R.id.arrivalStationEditText);
        departureStationEditText = findViewById(R.id.departureStationEditText);
        seatCountEditText = findViewById(R.id.seatCountEditText);
        submitButton = findViewById(R.id.submitButton);

        // Assuming the Retrofit and the necessary API interface set up

        submitButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String arrivalStation = arrivalStationEditText.getText().toString();
                String departureStation = departureStationEditText.getText().toString();
                int seatCount = Integer.parseInt(seatCountEditText.getText().toString());

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
                            .baseUrl("http://192.168.1.2:5059/api/Reservation/") // Base URL of the API
                            .addConverterFactory(GsonConverterFactory.create()) // Use Gson for serialization/deserialization
                            .client(new OkHttpClient.Builder()
                                    .sslSocketFactory(sslContext.getSocketFactory(), (X509TrustManager) trustAllCertificates[0])
                                    .hostnameVerifier((hostname, session) -> true)
                                    .build())
                            .build();

                    // Create an instance of API interface
                    TrainAPIInterface apiInterface = retrofit.create(TrainAPIInterface.class);

                    // Create a new Reservation object with the booking details
                    Reservation reservation = new Reservation();
                    reservation.setArrivalStation(arrivalStation);
                    reservation.setDepartureStation(departureStation);
                    reservation.setSeatsNeeded(seatCount);
                    reservation.setTrainId(selectedTrain.getId()); // Assuming a train ID

                    // Make the POST request to create a new reservation
                    Call<Reservation> call = apiInterface.createReservation(reservation);

                    call.enqueue(new Callback<Reservation>() {
                        @Override
                        public void onResponse(Call<Reservation> call, Response<Reservation> response) {
                            if (response.isSuccessful()) {
                                // Booking was successful
                                // Display a success message
                                Toast.makeText(NewReservationActivity.this, "Booking Successful", Toast.LENGTH_SHORT).show();
                            } else {
                                // Handle the case when the server returns an error
                                Toast.makeText(NewReservationActivity.this, "Booking Failed", Toast.LENGTH_SHORT).show();
                            }
                        }

                        @Override
                        public void onFailure(Call<Reservation> call, Throwable t) {
                            // Handle the case when the request fails
                            Toast.makeText(NewReservationActivity.this, "Booking Failed: " + t.getMessage(), Toast.LENGTH_SHORT).show();
                        }
                    });
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }
}
