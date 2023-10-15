//file : ReservationController.cs

//IT Number:IT18161298

//Description:Controller for managing train reservations in a web API

using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]


    //[Route("api/reservation")]
    //[ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly ReservationServices _reservationServices;

        public ReservationController(ReservationServices reservationServices)
        {
            _reservationServices = reservationServices;
        }


        // GET: api/reservation
        //This method retrieves a list of reservations using _reservationServices.
        [HttpGet("getAllReservations")]
        public async Task<List<Reservation>> Get() => await _reservationServices.GetAsync();



        // GET api/reservation/6522382ab944b840e2fa2bfa
        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Reservation>> Get(string id)
        {

            //This method retrieves reservation by its unique identifier(id).
            Reservation reservation = await _reservationServices.GetAsync(id);
            if(reservation == null)
            {
                return NotFound();
            }
            return reservation;
        }


        // POST api/reservation
      [HttpPost("newReservation")]
        public async Task<ActionResult<Reservation>> Post(Reservation newReservation)
        {
            //This method creates new reservations using _reservationServices.
            await _reservationServices.CreateAsync(newReservation);
              return CreatedAtAction(nameof(Get), new {id = newReservation.Id }, newReservation);
        }
       //[HttpPost]  


       // PUT api/reservation/6522382ab944b840e2fa2bfa
       [HttpPut("updateReservation/{id}")]
        public async Task<ActionResult> Put(string id, Reservation updateReservation)
        {
            //This method retrieve an existing reservation by its unique identifier
            Reservation reservation = await _reservationServices.GetAsync(id);
            if (reservation == null)
            {
                return NotFound("There is no reservation with this id:"+id);
            }

            //Assign unique identifier to updateReservation object
            updateReservation.Id = reservation.Id;
            //Update the reservation using _reservationServices
            await _reservationServices.UpdateAsync(id, updateReservation);
            return Ok("updated successfully");

        }


        // DELETE api/reservation/6522382ab944b840e2fa2bfa
        [HttpDelete("deleteReservation/{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            //retrieves an existing reservation from its unique identifier.
            Reservation reservation = await _reservationServices.GetAsync(id);
            if (reservation == null)
            {
                return NotFound("There is no reservation with this id:" + id);
            }

           //Remove the reservation using the _reservationServices.
            await _reservationServices.RemoveAsync(id);
            return Ok("deleted successfully");

        }
    }
}
