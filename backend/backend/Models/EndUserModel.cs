/*
 * Filename: EndUserModel.cs
 * Description: Contains propertiese of end user(traveler)
 * Author: Hiruni Mudannayake
 */

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models
{
    public class EndUserModel
    {
        [BsonId]
        public ObjectId Id { get; set; }
        [BsonElement("Username")]
        public string? Username { get; set; }

        [BsonElement("NIC")]
        public string? NIC { get; set; }
        [BsonElement("Role")]
        public string? Role { get; set; }
        [BsonElement("Password")]
        public string? Password { get; set; }
        [BsonElement("Email")]

        public string? Email { get; set; }
        [BsonElement("Phone")]
        public string? Phone { get; set; }
        [BsonElement("Status")]
        public string? Status { get; set; }


    }
}
