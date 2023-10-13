package com.example.train_reservation.activities;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.example.train_reservation.R;
import com.example.train_reservation.models.Reservation;

import java.util.List;

public class ReservationListAdapter extends BaseAdapter {
    private Context context;
    private List<Reservation> reservationList;

    public ReservationListAdapter(Context context, List<Reservation> reservationList) {
        this.context = context;
        this.reservationList = reservationList;
    }

    @Override
    public int getCount() {
        return reservationList.size();
    }

    @Override
    public Reservation getItem(int position) {
        return reservationList.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        if (convertView == null) {
            LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            convertView = inflater.inflate(R.layout.list_item_reservation, null);
        }

        // Get references to UI elements in list_item_train.xml
        TextView trainName = convertView.findViewById(R.id.trainName);
        TextView arrivalStation = convertView.findViewById(R.id.arrivalStation);
        TextView departureStation = convertView.findViewById(R.id.departureStation);
        TextView seatsNeeded = convertView.findViewById(R.id.seatsNeeded);

        // Bind data to the UI elements
        Reservation reservation = reservationList.get(position);
        trainName.setText(reservation.getTrainName());
        arrivalStation.setText("Arrival Station: " + reservation.getArrivalStation());
        departureStation.setText("Departure Station: " + reservation.getDepartureStation());
        seatsNeeded.setText("Seat Count: " + reservation.getSeatsNeeded());

        // Add an OnClickListener to each list item
        convertView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Handle item click here
                Reservation reservation = reservationList.get(position);

                // Create an intent to open the UpdateReservationActivity
                Intent intent = new Intent(context, UpdateReservationActivity.class);

                // Pass reservation data to the UpdateReservationActivity
                intent.putExtra("reservation", reservation);

                // Start the UpdateReservationActivity
                context.startActivity(intent);
            }
        });

        return convertView;
    }
}
