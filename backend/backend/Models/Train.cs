
/*
* Filename: Train.cs
* Description: contains the train model with train scheduling attributes like trainName, trainNumber, start station.....
* Author: Sathinka Wijesinghe
*/
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
namespace backend.Models

{

    [BsonIgnoreExtraElements]

    public class Train

    {
        [BsonId]

        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; } = string.Empty;

        [BsonElement("trainnumber")]
        public int TrainNumber { get; set; }
        [BsonElement("trainname")]

        public string TrainName { get; set; } = "Train Name";
        [BsonElement("traintype")]
        public string TrainType { get; set; } = "Train Type";
        [BsonElement("travelduration")]
        public string TravelDuration { get; set; } = "Travel Duration";
        [BsonElement("class")]
        public string ClassName { get; set; } = "Train Class Name";
        [BsonElement("startstation")]
        public string StartStation { get; set; } = "Start Station";
        [BsonElement("endstation")]
        public string EndStation { get; set; } = "End Station";
        [BsonElement("starttime")]
        public string StartTime { get; set; } = "Start Time";
        [BsonElement("endtime")]
        public string EndTime { get; set; } = "End Time";
        [BsonElement("trainstatus")]
        public string TrainStatus { get; set; } = "Status Of Train";
        [BsonElement("date")]
        public DateTime DateAndTime { get; set; }
        [BsonElement("reserved")]
        public bool IsReserved { get; set; }
        public List<string>? intermediateStops { get; set; }
        public List<string>? seatClasses { get; set; }
        public string? Number_of_seats { get; set; }

    }

}


