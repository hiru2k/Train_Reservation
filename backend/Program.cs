using backend.Data;
using backend.Services;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// configs
builder.Services.Configure<DatabaseSettings>(builder.Configuration.GetSection("DB"));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors((o) =>
{
    o.AddPolicy("Allow FE", (conf) =>
    {
        conf.WithOrigins("http://localhost:3000");
        conf.AllowAnyHeader();
        conf.AllowAnyMethod();
    });
});

// MongoDB Configuration
var connectionString = builder.Configuration.GetSection("DB:ConnectionString").Value;
var databaseName = builder.Configuration.GetSection("DB:DatabaseName").Value;
var client = new MongoClient(connectionString);
var database = client.GetDatabase(databaseName);

// Register MongoDB Service
builder.Services.AddSingleton(database);

// custom services
builder.Services.AddTransient<ITrainService, TrainService>();
builder.Services.AddTransient<IUserService, UserService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("Allow FE");

app.UseAuthorization();

app.MapControllers();

app.Run();
