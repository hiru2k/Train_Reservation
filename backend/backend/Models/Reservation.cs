//file : Reservation.cs

//IT Number:IT18161298

//Description:This class defines the Reservation model for a train booking system.

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models
{
    [BsonIgnoreExtraElements]

    public class Reservation
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public String Id { get; set; } = String.Empty;
        [BsonElement("trainname")]
        public String TrainName { get; set; } = "Train Name";
        [BsonElement("departurestation")]
        public String DepartureStation { get; set; } = "Departure Station";
        [BsonElement("arrivalstation")]
        public String ArrivalStation { get; set; } = "Arrival Station";
        [BsonElement("emergencycontact")]
        public String EmergencyContact { get; set; } = "Emergency Contact";
        [BsonElement("nic")]
        public String NIC { get; set; } = "NIC";
        [BsonElement("passengername")]
        public String PassengerName { get; set; } = "Passenger Name";
        [BsonElement("passengeraddress")]
        public String PassengerAddress { get; set; } = "Passenger Address";
        [BsonElement("fare")]
        public double Fare { get; set; } = 0.0;
        [BsonElement("currency")]
        public String Currency { get; set; } = "Currency";

        [BsonElement("seatsneeded")]
        public int SeatsNeeded { get; set; } = 0;



    }
}
