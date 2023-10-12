using backend.Models;

namespace backend.Services
{
    public interface ITrainService
    {
        void AddTrain(TrainModel train);
        void DeleteTrain(string trainNumber);
        TrainModel GetTrainByNumber(string trainNumber);
        List<TrainModel> GetTrains();
        void UpdateTrain(string trainNumber, TrainModel trainIn);
    }
}