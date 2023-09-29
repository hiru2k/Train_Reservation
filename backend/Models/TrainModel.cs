using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models
{
    public class TrainModel
    {
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("TrainNumber")]
        public string? TrainNumber { get; set; }

        [BsonElement("TrainName")]
        public string? TrainName { get; set; }
    }
}
