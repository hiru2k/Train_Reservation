using Microsoft.Extensions.Options;
using MongoDB.Driver;
using backend.Models;
using backend.Data;
using System.Security.Cryptography.X509Certificates;

namespace backend.Services
{
    public class ReservationServices
    {
        private readonly IMongoCollection<Reservation> _reservationcollection;

        public ReservationServices(IOptions<DatabaseSettings> settings)
        {
            var mongoClient = new MongoClient(settings.Value.Connection);
            var mongoDb = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _reservationcollection = mongoDb.GetCollection<Reservation>(settings.Value.CollectionName);
        }

        //get all reservations
        public async Task<List<Reservation>> GetAsync() => await _reservationcollection.Find(_ => true).ToListAsync();

        //get reservation by id
        public async Task<Reservation> GetAsync(String id) =>
        await _reservationcollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        //add new reservation
        public async Task CreateAsync(Reservation newReservation) =>
        await _reservationcollection.InsertOneAsync(newReservation);

        //Update Reservation

        public async Task UpdateAsync(String id, Reservation UpdateReservation) =>
        await _reservationcollection.ReplaceOneAsync(x => x.Id == id, UpdateReservation);

        //delete Reservation
        public async Task RemoveAsync(String id) =>
        await _reservationcollection.DeleteOneAsync(x => x.Id == id);

    }

        }
    

