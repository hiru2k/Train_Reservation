package com.example.train_reservation.activities;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.example.train_reservation.R;
import com.example.train_reservation.models.Train;

import java.util.List;

public class TrainListAdapter extends BaseAdapter {
    private Context context;
    private List<Train> trainList;

    public TrainListAdapter(Context context, List<Train> trainList) {
        this.context = context;
        this.trainList = trainList;
    }

    @Override
    public int getCount() {
        return trainList.size();
    }

    @Override
    public Train getItem(int position) {
        return trainList.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        if (convertView == null) {
            LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            convertView = inflater.inflate(R.layout.list_item_train, null);
        }

        // Get references to UI elements in list_item_train.xml
        TextView trainName = convertView.findViewById(R.id.trainName);
        TextView startStation = convertView.findViewById(R.id.startStation);
        TextView endStation = convertView.findViewById(R.id.endStation);
        TextView endTime = convertView.findViewById(R.id.endTime);
        TextView startTime = convertView.findViewById(R.id.startTime);


        // Bind data to the UI elements
        Train train = trainList.get(position);
        trainName.setText(train.getTrainName());
        startStation.setText("Start Station: " + train.getStartStation());
        endStation.setText("End Station: " + train.getEndStation());
        startTime.setText("Start Time: " + train.getStartTime());
        endTime.setText("End Time: " + train.getEndTime());


        return convertView;
    }
}
