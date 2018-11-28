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


function get_profits(obj)
{
    var result = [];
    for(var item of  obj)
    {
        result.push((item.revenue)/100000000);
    }
    return result;
}

function get_runtime(obj)
{
    var result = [];
    for(var item of  obj)
    {
        result.push(item.runtime);
    }
    return result;
}

function get_title(obj)
{
    var result = [];
    for(var item of  obj)
    {
        result.push(item.name);
    }
    return result;
}

function get_budget(obj)
{
    var result = [];
    for(var item of  obj)
    {
        result.push((item.budget)/1000000);
    }
    return result;
}

function get_rates(obj)
{
    var result = [];
    for(var item of  obj)
    {
        result.push((item.rating)*1.0);
    }
    return result;
}

function prepareData ()
{
    var  profits = get_profits(movie_data_json);
    var  budgets = get_budget(movie_data_json);
    var  names = get_title(movie_data_json);
    var  ratings = get_rates(movie_data_json);

    var trace_runtime_profits = {
        x: budgets,
        y: profits,
        text: names,
        mode: 'markers',
        type: 'scatter',
        marker: {
            size: 24,
            color: ratings,
            colorscale: 'Greens',
            line: {
                color: 'rgb(255, 255, 255)',
                width: 2
            },
            colorbar: {
                title: 'Rating of Movie'
            }
        },
        showlegend : false
    };

    return trace_runtime_profits;
}

function prepareLayout()
{


    var layout = {
        xaxis: {
            range: [100, 320],
            title: 'Budgets (M)'
        },
        yaxis: {
            range: [0, 25],
            title: 'Profits (100M)'
        },
        title: 'Budgets VS Profits',
        colorbar: true
    };

    return layout;
}

var data = [prepareData(),];
var layout = prepareLayout();

Plotly.newPlot('myScatterChart', data, layout);


function prepareData2 ()
{
    var  profits = get_profits(movie_data_json);
    var  ratings = get_rates(movie_data_json);
    var  runtime = get_runtime(movie_data_json);
    var  names = get_title(movie_data_json);

    var trace_runtime_profits = {
        x: runtime,
        y: profits,
        text: names,
        mode: 'markers',
        type: 'scatter',
        marker: {
            size: 24,
            color: ratings,
            colorscale: 'Greens',
            line: {
                color: 'rgb(255, 255, 255)',
                width: 2
            },
            colorbar: {
                title: 'Rating of Movie'
            }
        },
        showlegend : false
    };

    return trace_runtime_profits;
}

function prepareLayout2()
{


    var layout = {
        xaxis: {
            range: [105, 160],
            title: 'Runtime (min)'
        },
        yaxis: {
            range: [0, 30],
            title: 'Profits (100M)'
        },
        title: 'Runtime VS Profits',
        colorbar: true
    };

    return layout;
}

var data2 = [prepareData2(),];
var layout2 = prepareLayout2();

Plotly.newPlot('myScatterChart2', data2, layout2);