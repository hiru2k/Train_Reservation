using backend.Data;
using backend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// configs
builder.Services.Configure<DatabaseSettings>(builder.Configuration.GetSection("DB"));
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("Jwt"));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors((o) =>
{
    o.AddPolicy("Allow FE", (conf) =>
    {
        conf.WithOrigins("http://localhost:3000", "http://localhost:3000/");
        conf.AllowAnyHeader();
        conf.AllowAnyMethod();
    });
});
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(o =>
    {
        o.TokenValidationParameters = new TokenValidationParameters
        {
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey
            (Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)),
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = false,
            ValidateIssuerSigningKey = true
        };
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
builder.Services.AddTransient<IEndUserService, EndUserService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("Allow FE");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
