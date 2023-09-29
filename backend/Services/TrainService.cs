using backend.Models;
using MongoDB.Driver;

namespace backend.Services
{
    public class TrainService : ITrainService
    {
        private readonly IMongoCollection<TrainModel> _trains;

        public TrainService(IMongoDatabase database)
        {
            _trains = database.GetCollection<TrainModel>("Trains");
        }

        public List<TrainModel> GetTrains()
        {
            return _trains.Find(train => true).ToList();
        }

        public TrainModel GetTrainByNumber(string trainNumber)
        {
            return _trains.Find(train => train.TrainNumber == trainNumber).FirstOrDefault();
        }

        public void AddTrain(TrainModel train)
        {
            _trains.InsertOne(train);
        }

        public void UpdateTrain(string trainNumber, TrainModel trainIn)
        {
            _trains.ReplaceOne(train => train.TrainNumber == trainNumber, trainIn);
        }

        public void DeleteTrain(string trainNumber)
        {
            _trains.DeleteOne(train => train.TrainNumber == trainNumber);
        }
    }
}
