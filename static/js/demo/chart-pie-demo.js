movie_data_json =
    [
        {"budget": 300000000, "name": "Avengers: Infinity War", "rating": 8.3, "year": "2018", "revenue": 2046239637, "popularity": 9414, "runtime": 149},
        {"budget": 220000000, "name": "The Avengers", "rating": 7.6, "year": "2012", "revenue": 1519557910, "popularity": 16842, "runtime": 143},
        {"budget": 280000000, "name": "Avengers: Age of Ultron", "rating": 7.3, "year": "2015", "revenue": 1405403694, "popularity": 11092, "runtime": 141},
        {"budget": 200000000, "name": "Black Panther", "rating": 7.3, "year": "2018", "revenue": 1346739107, "popularity": 9044, "runtime": 134},
        {"budget": 200000000, "name": "Iron Man 3", "rating": 6.9, "year": "2013", "revenue": 1215439994, "popularity": 12265, "runtime": 130},
        {"budget": 240000000, "name": "Captain America: Civil War", "rating": 7.3, "year": "2016", "revenue": 1153304495, "popularity": 11784, "runtime": 147},
        {"budget": 175000000, "name": "Spider-Man: Homecoming", "rating": 7.4, "year": "2017", "revenue": 880166924, "popularity": 9421, "runtime": 133},
        {"budget": 200000000, "name": "Guardians of the Galaxy Vol. 2", "rating": 7.7, "year": "2017", "revenue": 863756051, "popularity": 10163, "runtime": 137},
        {"budget": 180000000, "name": "Thor: Ragnarok", "rating": 7.5, "year": "2017", "revenue": 853977126, "popularity": 8986, "runtime": 130},
        {"budget": 170000000, "name": "Guardians of the Galaxy", "rating": 7.9, "year": "2014", "revenue": 773328629, "popularity": 15350, "runtime": 121},
        {"budget": 170000000, "name": "Captain America: The Winter Soldier", "rating": 7.6, "year": "2014", "revenue": 714766572, "popularity": 9105, "runtime": 136},
        {"budget": 166000000, "name": "Doctor Strange", "rating": 7.3, "year": "2016", "revenue": 677718395, "popularity": 10355, "runtime": 115},
        {"budget": 170000000, "name": "Thor: The Dark World", "rating": 6.7, "year": "2013", "revenue": 644571402, "popularity": 8326, "runtime": 112},
        {"budget": 200000000, "name": "Iron Man 2", "rating": 6.7, "year": "2010", "revenue": 623933331, "popularity": 10334, "runtime": 124},
        {"budget": 140000000, "name": "Ant-Man and the Wasp", "rating": 7.0, "year": "2018", "revenue": 622379576, "popularity": 3418, "runtime": 119},
        {"budget": 140000000, "name": "Iron Man", "rating": 7.5, "year": "2008", "revenue": 585174222, "popularity": 13198, "runtime": 126},
        {"budget": 130000000, "name": "Ant-Man", "rating": 7.1, "year": "2015", "revenue": 519311965, "popularity": 9866, "runtime": 117},
        {"budget": 150000000, "name": "Thor", "rating": 6.7, "year": "2011", "revenue": 449326618, "popularity": 10616, "runtime": 115},
        {"budget": 140000000, "name": "Captain America: The First Avenger", "rating": 6.8, "year": "2011", "revenue": 370569774, "popularity": 10661, "runtime": 124},
        {"budget": 150000000, "name": "The Incredible Hulk", "rating": 6.2, "year": "2008", "revenue": 163712074, "popularity": 5192, "runtime": 114}];


function rating_classified(obj)
{
    var results = [0,0,0,0,0];
    for(var item of obj)
    {
        var rating = item.rating;
        var index = 0;
        if(rating < 6.5)
        {
          index = 0;
        }
        else if(rating < 7.0 && rating >= 6.5)
        {
            index = 1;
        }
        else if(rating < 7.5 && rating >= 7.0)
        {
            index = 2;
        }
        else if(rating < 8.0 && rating >= 7.5)
        {
            index = 3;
        }
        else if(rating >= 8.0)
        {
            index = 4;
        }

        results[index] += 1;
    }

    return results;
}
function preparePieData (obj)
{
    var data = {
        values: rating_classified(obj),
        labels: ['below 6.5', '6.5 -7.0', '7.0 - 7.5','7.5 - 8', 'above 8'],
        type: 'pie'
    };

    return data;
}

function preparePieLayout()
{
    var layout = {
        height: 450,
        width: 400
    };

    return layout;

}

var pie_data = [preparePieData(movie_data_json),];
var pie_layout = preparePieLayout();

Plotly.newPlot('myPieChart', pie_data, pie_layout);