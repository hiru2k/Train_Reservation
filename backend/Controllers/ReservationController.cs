using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace backend.Controllers
{
    [Route("api/reservation")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly ReservationServices _reservationServices;

        public ReservationController(ReservationServices reservationServices)
        {
            _reservationServices = reservationServices;
        }
        // GET: api/reservation
        [HttpGet]
        public async Task<List<Reservation>> Get() => await _reservationServices.GetAsync();


        // GET api/reservation/6522382ab944b840e2fa2bfa
        [HttpGet("{length(24)}")]
        public async Task<ActionResult<Reservation>> Get(string id)
        {
            Reservation reservation = await _reservationServices.GetAsync(id);
            if (reservation == null)
            {
                return NotFound();
            }
            return reservation;
        }


        // POST api/reservation
        [HttpPost]
        public async Task<ActionResult<Reservation>> Post(Reservation newReservation)
            {
            await _reservationServices.CreateAsync(newReservation);
            return CreatedAtAction(nameof(Get),new { id = newReservation.Id }, newReservation);
        }
            


        
        

        // PUT api/reservation/6522382ab944b840e2fa2bfa
        [HttpPut("{id:length(24)}")]
        public async Task<ActionResult> Put(string id, Reservation updateReservation) 
        {
            Reservation reservation = await _reservationServices.GetAsync(id);
            if(reservation == null)
            {
                return NotFound("There is no Reservation with this id:"+ id);
            }
            updateReservation.Id = reservation.Id;
            await _reservationServices.UpdateAsync(id, updateReservation);
            return Ok("Updated Successfully");
        }

        // DELETE api/reservation/6522382ab944b840e2fa2bfa
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(String id)
        {
            Reservation reservation = await _reservationServices.GetAsync(id);
            if (reservation == null)
            {
                return NotFound("There is no Reservation with this id:" + id);
            }

            await _reservationServices.RemoveAsync(id);
            return Ok("Deleted Successfully");
        }
    }
}
