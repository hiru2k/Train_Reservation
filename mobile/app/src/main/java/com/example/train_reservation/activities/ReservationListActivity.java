package com.example.train_reservation.activities;

import android.os.Bundle;
import android.widget.ListView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.train_reservation.R;
import com.example.train_reservation.models.Reservation;
import com.example.train_reservation.utils.ReservationAPIInterface;

import java.util.List;

import okhttp3.OkHttpClient;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import java.security.cert.X509Certificate;


public class ReservationListActivity extends AppCompatActivity {
    private ListView reservationListView;
    private ReservationListAdapter reservationAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_reservation_list);

        reservationListView = findViewById(R.id.reservationListView);

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

            Retrofit retrofit = new Retrofit.Builder()
                    .baseUrl("http://192.168.1.2:5059/api/Reservation/")
                    .addConverterFactory(GsonConverterFactory.create())
                    .client(new OkHttpClient.Builder()
                            .sslSocketFactory(sslContext.getSocketFactory(), (X509TrustManager) trustAllCertificates[0])
                            .hostnameVerifier((hostname, session) -> true)
                            .build())
                    .build();

            ReservationAPIInterface reservationAPIInterface = retrofit.create(ReservationAPIInterface.class);

            Call<List<Reservation>> call = reservationAPIInterface.getReservation(); // Adjust the API call according to backend

            call.enqueue(new Callback<List<Reservation>>() {
                @Override
                public void onResponse(Call<List<Reservation>> call, Response<List<Reservation>> response) {
                    if (response.isSuccessful()) {
                        List<Reservation> reservationList = response.body();

                        // Create an adapter and set it to the ListView or RecyclerView
                        reservationAdapter = new ReservationListAdapter(ReservationListActivity.this, reservationList);
                        reservationListView.setAdapter(reservationAdapter);
                    } else {
                        Toast.makeText(ReservationListActivity.this, "1. Failed to fetch Reservation data", Toast.LENGTH_SHORT).show();
                    }
                }

                @Override
                public void onFailure(Call<List<Reservation>> call, Throwable t) {
                    Toast.makeText(ReservationListActivity.this, "2. Failed to fetch Reservation data"+ t.getMessage(), Toast.LENGTH_SHORT).show();
                }
            });
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
