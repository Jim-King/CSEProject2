var movie_data_json =
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

var y_series = [2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018]

function get_profits_by_year(obj)
{
    var results = [0,0,0,0,0,0,0,0,0,0,0];
    for(var item of obj)
    {
        var year = item.year;
        results[parseInt(year)-2008] += (item.revenue)/100000000;
    }
    console.log(results);
    return results;
}

function get_popularity_by_year(obj)
{
    var results = [0,0,0,0,0,0,0,0,0,0,0];
    for(var item of obj)
    {
        var year = item.year;
        results[parseInt(year)-2008] += (item.popularity)/1000;
    }
    console.log(results);
    return results;
}

function prepareDataByYear ()
{

    var x1_series =  get_profits_by_year(movie_data_json);
    var x2_series = get_popularity_by_year(movie_data_json);
    var profits_year_bar = {
        x: x1_series,
        y: y_series,
        xaxis: 'x1',
        yaxis: 'y1',
        type: 'bar',
        marker: {
            color: 'rgba(50,171,96,0.6)',
            line: {
                color: 'rgba(50,171,96,1.0)',
                width: 1
            }
        },
        name: 'Movies overall profits per year',
        orientation: 'h'
    };

    var popularity_year_bar = {
        x: x2_series,
        y: y_series,
        xaxis: 'x2',
        yaxis: 'y1',
        mode: 'lines+markers',
        line: {
            color: 'rgb(128,0,128)'
        },
        name: 'Popularity of movies per year among audiences on IMDB'
    };

    return [profits_year_bar,popularity_year_bar];
}

function prepareLayout()
{

    var layout = {
      title: 'Movies popularity & Incomes From 2008 -  2018',
      xaxis1: {
        range: [5, 42],
        domain: [0, 0.6],
        zeroline: false,
        showline: false,
        showticklabels: true,
        showgrid: true
      },
      xaxis2: {
          range: [0, 50],
          domain: [0.6, 1],
          zeroline: false,
          showline: false,
          showticklabels: true,
          showgrid: true,
          side: 'top',
          dtick: 10
        },
        legend: {
            x: 0.029,
            y: 1.238,
            font: {
                size: 10
            }
        },
        margin: {
            l: 50,
            r: 50,
            t: 120,
            b: 120
        },
        paper_bgcolor: 'rgb(248,248,255)',
        plot_bgcolor: 'rgb(248,248,255)'
    };

    return layout;
}

var data = prepareDataByYear();
var layout = prepareLayout();



Plotly.newPlot('myBarChart', data, layout);
