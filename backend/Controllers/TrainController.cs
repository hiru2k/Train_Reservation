/*
 * Filename: TrainController.cs
 * Description: contains the endpoints and  functionality of train timetable
 * Author: Himanka Manimendra
 */

using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace backend.Controllers
{
    [ApiController]

    [Route("api/[controller]")]

    public class TrainController : ControllerBase
    {
        private readonly TrainServices _trainServices;

        public TrainController(TrainServices trainServices)
        {
            _trainServices = trainServices;
        }


        // GET: api/train
        [HttpGet("getAllTrains")]
        public async Task<List<Train>> Get() => await _trainServices.GetAsync();


        // GET api/train/6521bf677a5813a7538d6648
        [HttpGet("{id:length(24)}")]

        public async Task<ActionResult<Train>> Get(string id)
        {
            Train train = await _trainServices.GetAsync(id);
            if (train == null)
            {
                return NotFound();
            }
            return train;
        }
    }
}
