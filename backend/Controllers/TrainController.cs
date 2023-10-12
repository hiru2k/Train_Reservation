using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TrainController : ControllerBase
    {
        private readonly ITrainService _trainService;

        public TrainController(ITrainService trainService)
        {
            _trainService = trainService;
        }

        [HttpGet]
        public ActionResult<List<TrainModel>> GetTrains()
        {
            var trains = _trainService.GetTrains();
            return Ok(trains);
        }

        [HttpGet("{trainNumber}")]
        public ActionResult<TrainModel> GetTrainByNumber(string trainNumber)
        {
            var train = _trainService.GetTrainByNumber(trainNumber);
            if (train == null)
            {
                return NotFound();
            }
            return Ok(train);
        }

        [HttpPost]
        public IActionResult AddTrain(TrainModel train)
        {
            _trainService.AddTrain(train);
            return Ok(train);
        }

        [HttpPut("{trainNumber}")]
        public IActionResult UpdateTrain(string trainNumber, TrainModel trainIn)
        {
            var existingTrain = _trainService.GetTrainByNumber(trainNumber);
            if (existingTrain == null)
            {
                return NotFound();
            }
            _trainService.UpdateTrain(trainNumber, trainIn);
            return NoContent();
        }

        [HttpDelete("{trainNumber}")]
        public IActionResult DeleteTrain(string trainNumber)
        {
            var existingTrain = _trainService.GetTrainByNumber(trainNumber);
            if (existingTrain == null)
            {
                return NotFound();
            }
            _trainService.DeleteTrain(trainNumber);
            return NoContent();
        }
    }
}
