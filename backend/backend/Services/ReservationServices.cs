//file : ReservationServices.cs

//IT Number:IT18161298

//Description:Service class responsible for managing reservations in a MongoDB database.



using backend.Models;
using MongoDB.Driver;
using System.Drawing.Printing;

namespace backend.Services

{
    public class ReservationServices
    {
        private readonly IMongoCollection<Reservation> _reservationCollection;

        public ReservationServices(IMongoDatabase database)
        {
            //Initialize the reservation collection to interact with MongoDB for reservations
            _reservationCollection = database.GetCollection<Reservation>("Reservations");
        }


        //get all Reservations
        public async Task<List<Reservation>> GetAsync() => await _reservationCollection.Find(_ => true).ToListAsync();



        //get Reservation by id
        public async Task<Reservation> GetAsync(string id) =>
            await _reservationCollection.Find(x => x.Id == id).FirstOrDefaultAsync();



        //add new reservation
        public async Task CreateAsync(Reservation newReservation) =>
            await _reservationCollection.InsertOneAsync(newReservation);



        //update reservation
        public async Task UpdateAsync(string id, Reservation updateReservation) =>
            await _reservationCollection.ReplaceOneAsync(x => x.Id == id, updateReservation);


        //delete reservation
        public async Task RemoveAsync(string id) =>
            await _reservationCollection.DeleteOneAsync(x => x.Id == id);


    }




}
