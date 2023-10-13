/*
* Filename: TrainServices.cs
* Description: contains the web service functions of train scheduling management
* Author: Sathinka Wijesinghe
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

        //add new train
        public async Task CreateAsync(Train newTrain) =>
            await _trainCollection.InsertOneAsync(newTrain);

        //update train
        public async Task UpdateAsync(string id, Train updateTrain) =>
            await _trainCollection.ReplaceOneAsync(x => x.Id == id, updateTrain);

        //delete train
        public async Task RemoveAsync(string id)=>
            await _trainCollection.DeleteOneAsync(x=> x.Id == id);


       


    }
}
