using CibandoServer.Core.Interfaces;
using CibandoServer.Core.Service;
using CibandoServer.Core.Services;
using CibandoServer.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<CibandoDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("CibandoServerContext")));

builder.Services.AddTransient<IDbContextFactory, DbContextFactory>();
builder.Services.AddTransient<ICibandoRepository, CibandoRepository>();
builder.Services.AddTransient<IUserRepository, UserRepository>();

builder.Services.AddTransient<IRecipeService, RecipeService>();
builder.Services.AddTransient<IUserService, UserService>();

builder.Services.AddControllersWithViews();
builder.Services.AddEndpointsApiExplorer();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

app.UseCors(builder => builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader()
  );

app.Run();


