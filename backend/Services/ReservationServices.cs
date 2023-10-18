/*
 * Filename: ReservationServices.cs
 * Description: Contains the services functions of reservation management
 * Author: Himanka Manimendra
 */

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

        public ReservationServices(IMongoDatabase database)
        {
            _reservationcollection = database.GetCollection<Reservation>("Reservations");
        }

        //Get all reservations
        public async Task<List<Reservation>> GetAsync() => await _reservationcollection.Find(_ => true).ToListAsync();

        //Get reservation by id
        public async Task<Reservation> GetAsync(String id) =>
        await _reservationcollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        //Add new reservation
        public async Task CreateAsync(Reservation newReservation) =>
        await _reservationcollection.InsertOneAsync(newReservation);

        //Update Reservation

        public async Task UpdateAsync(String id, Reservation updateReservation) =>
        await _reservationcollection.ReplaceOneAsync(x => x.Id == id, updateReservation);

        //Delete Reservation
        public async Task RemoveAsync(String id) =>
        await _reservationcollection.DeleteOneAsync(x => x.Id == id);

    }

}


