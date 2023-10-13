package com.example.train_reservation.models;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class Reservation implements Serializable {

    @SerializedName("id")
    private String id;

    @SerializedName("trainName")
    private String trainName;

    @SerializedName("arrivalStation")
    private String arrivalStation;

    @SerializedName("departureStation")
    private String departureStation;

    @SerializedName("seatsNeeded")
    private int seatsNeeded;

    @SerializedName("trainId")
    private String trainId;

    @SerializedName("emergencyContact")
    private String emergencyContact;

    @SerializedName("nic")
    private String nic;

    @SerializedName("passengerName")
    private String passengerName;

    @SerializedName("passengerAddress")
    private String passengerAddress;

    @SerializedName("fare")
    private Double fare;

    @SerializedName("currency")
    private String currency;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTrainName() {
        return trainName;
    }

    public void setTrainName(String trainName) {
        this.trainName = trainName;
    }

    public String getArrivalStation() {
        return arrivalStation;
    }

    public void setArrivalStation(String arrivalStation) {
        this.arrivalStation = arrivalStation;
    }

    public String getDepartureStation() {
        return departureStation;
    }

    public void setDepartureStation(String departureStation) {
        this.departureStation = departureStation;
    }

    public int getSeatsNeeded() {
        return seatsNeeded;
    }

    public void setSeatsNeeded(int seatsNeeded) {
        this.seatsNeeded = seatsNeeded;
    }

    public String getTrainId() {
        return trainId;
    }

    public void setTrainId(String trainId) {
        this.trainId = trainId;
    }

    public String getEmergencyContact() {
        return emergencyContact;
    }

    public void setEmergencyContact(String emergencyContact) {
        this.emergencyContact = emergencyContact;
    }

    public String getNic() {
        return nic;
    }

    public void setNic(String nic) {
        this.nic = nic;
    }

    public String getPassengerName() {
        return passengerName;
    }

    public void setPassengerName(String passengerName) {
        this.passengerName = passengerName;
    }

    public String getPassengerAddress() {
        return passengerAddress;
    }

    public void setPassengerAddress(String passengerAddress) {
        this.passengerAddress = passengerAddress;
    }

    public Double getFare() {
        return fare;
    }

    public void setFare(Double fare) {
        this.fare = fare;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }
}
