from flask import Flask, render_template,request
import getMoviesAPI
import getMoviesAPI
import json
app = Flask(__name__)


@app.route('/charts')
def host_chartHTML(name=None):
    return render_template('charts2.html', name=name)

@app.route('/')
@app.route('/maps')
def host_mapHTML(name=None):
    return render_template('maps.html', name=name)

@app.route('/moviesdata',methods = ['GET'])
def getMoviesJson():
    keyWord = "Marvel%20Cinematic%20Universe"
    TMDBkey = "63479aa9958f77e8683c52aad1f94d5e"
    ID = getMoviesAPI.searchKeyWordID(keyWord,TMDBkey)
    jsonResults = getMoviesAPI.searchMoviesByKeyWords(ID,TMDBkey)
    return jsonResults

@app.route('/moviesGross',methods = ['GET'])
def getMoviesGrossJson():
    moviename = request.args.get('name')
    print(moviename)
    responseobj = {"Greenland": 800000, "Brazil": 1300000, "Canada": 300000, "Mexico": 1000000, "China": 1100000, "France": 3100000, "India": 110000, "Germany": 900000, "Japan": 100000, "Italy": 350000};
    return json.dumps(responseobj)

if __name__ == '__main__':
    app.run(debug = True)
