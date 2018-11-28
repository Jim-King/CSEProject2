function loadPages()
{
    var xhttp = new XMLHttpRequest(); 
    xhttp.onreadystatechange = function(){
    if (this.readyState === 4 && this.status === 200)
        {
          var movie_data_json = JSON.parse(this.response);
          scatterChartPlot(movie_data_json);
          scatterChartPlot2(movie_data_json);
          barChartPlot(movie_data_json);
          pieChartPlot(movie_data_json);
          //drawChoroplethMap2();
        }
    };
    xhttp.open("GET", "/moviesdata");
    xhttp.send();
}

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

function prepareData(movie_data_json)
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


function scatterChartPlot(movie_data_json)
{
	var data = [prepareData(movie_data_json),];
	var layout = prepareLayout();

	Plotly.newPlot('myScatterChart', data, layout);
}



function prepareData2 (movie_data_json)
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

function scatterChartPlot2(movie_data_json)
{
	var data2 = [prepareData2(movie_data_json),];
	var layout2 = prepareLayout2();
	Plotly.newPlot('myScatterChart2', data2, layout2);
}

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

function prepareDataByYear(movie_data_json)
{
		var y_series = [2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018];
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

function prepareBarLayout()
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


function barChartPlot(movie_data_json)
{
	var data = prepareDataByYear(movie_data_json);
	var layout = prepareBarLayout();

	Plotly.newPlot('myBarChart', data, layout);
}


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

function pieChartPlot(movie_data_json)
{
	var pie_data = [preparePieData(movie_data_json),];
	var pie_layout = preparePieLayout();

	Plotly.newPlot('myPieChart', pie_data, pie_layout);
}

function drawChoroplethMap2()
{
    Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/2014_world_gdp_with_codes.csv', function(err, rows){
      function unpack(rows, key) {
          return rows.map(function(row) { return row[key]; });
      }

       var data = [{
            type: 'choropleth',
            locations: unpack(rows, 'CODE'),
            z: unpack(rows, 'GDP (BILLIONS)'),
            text: unpack(rows, 'COUNTRY'),
            colorscale: [
                [0,'rgb(5, 10, 172)'],[0.35,'rgb(40, 60, 190)'],
                [0.5,'rgb(70, 100, 245)'], [0.6,'rgb(90, 120, 245)'],
                [0.7,'rgb(106, 137, 247)'],[1,'rgb(220, 220, 220)']],
            autocolorscale: false,
            reversescale: true,
            marker: {
                line: {
                    color: 'rgb(180,180,180)',
                    width: 0.5
                }
            },
            tick0: 0,
            zmin: 0,
            dtick: 1000,
            colorbar: {
                autotic: true,
                tickprefix: '$',
                title: 'Millions US$'
            }
      }];

      var layout = {
          title: 'MCU International Box Office since 2008 - 2018',
          width: 1500,
          height: 800,
          autosize: true,
          geo:{
              showframe: false,
              showcoastlines: false,
              projection:{
                  type: 'mercator'
              }
          }
      };
      Plotly.plot("myMapPlot", data, layout, {showLink: false});
});
}