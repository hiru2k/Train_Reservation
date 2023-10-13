package com.example.train_reservation.activities;

import android.os.Bundle;
import android.widget.ListView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.train_reservation.R;
import com.example.train_reservation.models.Train;
import com.example.train_reservation.utils.TrainAPIInterface;

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

import android.view.View;
import android.widget.AdapterView;
import android.content.Intent;

public class TrainListActivity extends AppCompatActivity {
    private ListView trainListView;
    private TrainListAdapter trainAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_train_list);

        trainListView = findViewById(R.id.trainListView);

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
                    .baseUrl("http://192.168.1.2:5059/api/train/")
                    .addConverterFactory(GsonConverterFactory.create())
                    .client(new OkHttpClient.Builder()
                            .sslSocketFactory(sslContext.getSocketFactory(), (X509TrustManager) trustAllCertificates[0])
                            .hostnameVerifier((hostname, session) -> true)
                            .build())
                    .build();

            TrainAPIInterface trainAPIInterface = retrofit.create(TrainAPIInterface.class);

            Call<List<Train>> call = trainAPIInterface.getTrains(); // Adjust the API call according to backend

            call.enqueue(new Callback<List<Train>>() {
                @Override
                public void onResponse(Call<List<Train>> call, Response<List<Train>> response) {
                    if (response.isSuccessful()) {
                        List<Train> trainList = response.body();

                        // Create an adapter and set it to the ListView or RecyclerView
                        trainAdapter = new TrainListAdapter(TrainListActivity.this, trainList);
                        trainListView.setAdapter(trainAdapter);
                    } else {
                        Toast.makeText(TrainListActivity.this, "1. Failed to fetch train data", Toast.LENGTH_SHORT).show();
                    }
                }

                @Override
                public void onFailure(Call<List<Train>> call, Throwable t) {
                    Toast.makeText(TrainListActivity.this, "2. Failed to fetch train data"+ t.getMessage(), Toast.LENGTH_SHORT).show();
                }
            });
        } catch (Exception e) {
            e.printStackTrace();
        }

        // Set item click listener to navigate to TrainDetailActivity
        trainListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Train selectedTrain = trainAdapter.getItem(position);
                Intent intent = new Intent(TrainListActivity.this, NewReservationActivity.class);
                intent.putExtra("selectedTrain", selectedTrain);
                startActivity(intent);
            }
        });
    }
}
