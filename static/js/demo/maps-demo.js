function loadMaps()
{
    var firstTitle = "Avengers: Infinity War";
   // drawChoroplethMap(responseobj,firstTitle)
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
    if (this.readyState === 4 && this.status === 200)
        {
          var movie_data_json = JSON.parse(this.response);
          drawChoroplethMap(movie_data_json,firstTitle);
        }
    };
    xhttp.open("GET", "/moviesGross");
    xhttp.send();
}

function drawChoroplethMap(response_obj,mytitle)
{
    Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/2014_world_gdp_with_codes.csv', function(err, rows){
      function unpacksp(rows, key) {
          return rows.map(function(row) { return row[key]; });
      }
       function unpackinfo(rows, key, objs)
       {
          return rows.map(function(row)
              {
                  var name = row[key];
                  var boxoffice = 0;
                  if(name in objs)
                  {
                      boxoffice = objs[name]
                  }
                  return boxoffice;
              });
      }
       var data = [{
            type: 'choropleth',
            locations: unpacksp(rows, 'CODE'),
            z: unpackinfo(rows, 'COUNTRY',response_obj),
            text: unpacksp(rows, 'COUNTRY'),
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
          title: mytitle,
          width: 1100,
          height: 600,
          autosize: false,
          geo:{
              showframe: false,
              showcoastlines: false,
              projection:{
                  type: 'mercator'
              }
          }
      };
      Plotly.purge('myMapPlot');
      Plotly.plot("myMapPlot", data, layout, {showLink: false});
});
}

$(function(){
    $("button").click(function() {
        var value = $(this).html(); // $(this)get html value of the clicked button elements
        if(value!="Select Your Movie")
        {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function(){
            if (this.readyState === 4 && this.status === 200)
                {
                  var movie_data_json = JSON.parse(this.response);
                  drawChoroplethMap(movie_data_json,value);
                }
            };
            xhttp.open("GET", "/moviesGross?name="+value);
            xhttp.send();
        }
    });
})