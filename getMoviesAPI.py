import urllib.request
from urllib.parse import urlparse
import json

def searchKeyWordID(parameter,TMDBkey):
    url = "https://api.themoviedb.org/3/search/keyword?"
    url += "api_key=" + TMDBkey +"&page=1"
    url += "&query="+parameter
    urlEncoded = urlparse(url).geturl()

    headers = {}
    headers['User-Agent'] = "Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:48.0) Gecko/20100101 Firefox/48.0"
    
    req = urllib.request.Request(urlEncoded, headers = headers)
    response = urllib.request.urlopen(req)
    json_results = json.loads(response.read().decode('utf-8'))
    
    return json_results["results"][0]["id"]
    
def searchMoviesByKeyWords(ID,TMDBkey):
    url = "https://api.themoviedb.org/3/discover/movie?api_key="
    url += TMDBkey + "&language=en-US&sort_by=revenue.desc&include_adult=false&page=1"
    url += "&with_keywords=" + str(ID)
    
    urlEncoded = urlparse(url).geturl()
    headers = {}
    headers['User-Agent'] = "Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:48.0) Gecko/20100101 Firefox/48.0"
    
    req = urllib.request.Request(urlEncoded, headers = headers)
    response = urllib.request.urlopen(req)
    results_lists = (json.loads(response.read().decode('utf-8')))["results"]
    
    results_list2 = []
    for movie in results_lists:
        print(movie["title"])
        c = getMovieInfo(movie["id"],movie["title"],TMDBkey)
        results_list2.append(c)
     
    return json.dumps(results_list2)
    
def getMovieInfo(movie_id,name,TMDBkey):
    url = "https://api.themoviedb.org/3/movie/" + str(movie_id) + "?api_key="
    url += TMDBkey + "&language=en-US"
    
    urlEncoded = urlparse(url).geturl()
    headers = {}
    headers['User-Agent'] = "Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:48.0) Gecko/20100101 Firefox/48.0"
    
    req = urllib.request.Request(urlEncoded, headers = headers)
    response = urllib.request.urlopen(req)
    movieObj = json.loads(response.read().decode('utf-8'))
    
    movieObj2 = {"name":name}
    movieObj2["budget"] = movieObj["budget"]
    movieObj2["revenue"] = movieObj["revenue"]
    movieObj2["runtime"] = movieObj["runtime"]
    movieObj2["popularity"] = movieObj["vote_count"]
    movieObj2["rating"] = movieObj["vote_average"]
    movieObj2["year"] = movieObj["release_date"][:4]
    
    return movieObj2
