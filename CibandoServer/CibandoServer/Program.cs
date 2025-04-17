using CibandoServer.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
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

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

app.MapGet("/Recipes", () =>
{
    return Results.Ok(new[]
    {
        new Recipe
        {
            Id = 1,
            Title = "Spaghetti Bolognese",
            Description = @"Gli spaghetti alla bolognese (spaghetti bolognese in inglese) sono una ricetta gastronomica diffusa nella cucina internazionale, a base di spaghetti conditi con un sugo che ricorda il ragù bolognese, ma che, al contrario di esso, è più ricco di pomodoro che di carne.[3]
            Il piatto è di origini incerte ed erroneamente attribuito alla tradizione culinaria bolognese,[4][5][6][7] in quanto la cucina emiliana tradizionalmente abbina il ragù alla sfoglia all'uovo, e non alla semola di grano duro.
            Nonostante la supposta origine italiana, il piatto è difficilmente reperibile in Italia, se non nei ristoranti turistici che offrono cucina internazionale.",
            Difficulty = 2,
            CreatedAt = DateOnly.FromDateTime(DateTime.Now),
            ImageUrl = "https://supervalu.ie/thumbnail/800x600/var/files/real-food/recipes/Uploaded-2020/spaghetti-bolognese-recipe.jpg",
            IsPiblished = true
        },
        new Recipe
        {
            Id = 2,
            Title = "Chicken Curry",
            Description = "Il pollo al curry è un piatto tradizionale dell'Asia meridionale, originario dell'India, che risulta risalire all'Impero Moghul,[1] ed è oggi comune nel subcontinente indiano, nei Caraibi, nella penisola arabica, nel sud-est asiatico, in Gran Bretagna, ed in Giappone. Esso consiste in una preparazione a base di pollo e curry da insaporire con ingredienti a piacere tra cui riso e peperoncino.[2] Esistono diverse varianti del piatto, tra cui il chicken tikka masala, ricetta della cucina anglo-indiana inventata a Glasgow ed eletta piatto nazionale nel Regno Unito, e il ca ri ga vietnamita, con latte di cocco e citronella.",
            Difficulty = 3,
            CreatedAt = DateOnly.FromDateTime(DateTime.Now),
            ImageUrl = "https://www.gustorotondo.it/wp-content/uploads/2019/07/pollo-al-curry.jpg",
            IsPiblished = true
        },
        new Recipe
        {
            Id = 3,
            Title = "Cannelloni alla rossini",
            Description = "I cannelloni alla Rossini sono un piatto classico della cucina italiana, nato a cavallo tra il XIX e il XX secolo. Si tratta di un primo piatto ricco e cremoso, a base di cannelloni ripieni di un ragù di di vitello, funghi e carne, e conditi con una besciamella.",
            Difficulty = 3,
            CreatedAt = DateOnly.FromDateTime(DateTime.Now).AddDays(-2),
            ImageUrl = "https://www.cantinacaio.it/wp-content/uploads/2023/11/cannelloni-alla-rossini.jpg",
            IsPiblished = true
        },
        new Recipe
        {
            Id = 4,
            Title = "Tagliata di Angus",
            Description = "La tagliata di Angus è un secondo piatto di carne molto apprezzato in Italia e nel mondo. Si tratta di una fettina di carne di manzo, proveniente dal controfiletto, che viene cotta in padella o alla griglia. La tagliata di Angus è caratterizzata da una carne tenera e succosa, con un sapore intenso e deciso.',",
            Difficulty = 3,
            CreatedAt = DateOnly.FromDateTime(DateTime.Now).AddDays(-10),
            ImageUrl = "https://www.cantinacaio.it/wp-content/uploads/2023/11/tagliata-di-angus.jpg",
            IsPiblished = true
        },
        new Recipe
        {
            Id = 5,
            Title = "Insalata russa",
            Description = "L’insalata russa è un piatto iconico che porta freschezza e versatilità in ogni tavola. Perfetta per ogni occasione, questa ricetta è amata da molti per il suo mix di ingredienti e sapori. In questo articolo, esploreremo la ricetta dell’insalata russa e come abbinarla ai vini di Cantina Caio per un’esperienza culinaria completa.",
            Difficulty = 3,
            CreatedAt = DateOnly.FromDateTime(DateTime.Now).AddDays(-15),
            ImageUrl = "https://www.cantinacaio.it/wp-content/uploads/2024/07/insalata-russa.jpg",
            IsPiblished = true
        },
        new Recipe
        {
            Id = 6,
            Title = "Soufflé al cioccolato",
            Description = "Il soufflé al cioccolato è un dessert francese classico, conosciuto per la sua consistenza morbida e ariosa e il suo gusto intenso di cioccolato. È un dolce relativamente semplice da preparare, ma richiede un pizzico di tecnica e la giusta dose di attenzione.',",
            Difficulty = 3,
            CreatedAt = DateOnly.FromDateTime(DateTime.Now).AddDays(-20),
            ImageUrl = "https://www.cantinacaio.it/wp-content/uploads/2024/07/souffle-al-cioccolato.jpg",
            IsPiblished = true
        }
    });
});

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
