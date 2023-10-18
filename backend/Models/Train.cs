/*
 * Filename: Train.cs
 * Description: Contains of train model
 * Author: Himanka Manimendra
 */

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
    }
}
