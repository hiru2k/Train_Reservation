/*
 * Filename: TrainServices.cs
 * Description: Contains the services functions of train timetable 
 * Author: Himanka Manimendra
 */

using backend.Models;
using MongoDB.Driver;
using System.Drawing.Printing;

namespace backend.Services

{
    public class TrainServices
    {
        private readonly IMongoCollection<Train> _trainCollection;

        public TrainServices(IMongoDatabase database)
        {

            _trainCollection = database.GetCollection<Train>("Trains");
        }
        //get all trains
        public async Task<List<Train>> GetAsync() => await _trainCollection.Find(_ => true).ToListAsync();

        //get train by id
        public async Task<Train> GetAsync(string id)=>
            await _trainCollection.Find(x => x.Id == id).FirstOrDefaultAsync();


    }
}
