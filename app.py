from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

NEWS_API_KEY = '7f87e313eb7d46e3ab48c1ff6df4e531'

def get_indian_news(api_key):
    # This function fetches Indian news using the NewsAPI.
    # It accepts the API key as input and returns the latest news articles.
    url = f'https://newsapi.org/v2/top-headlines?country=in&apiKey={api_key}'
    response = requests.get(url)
    data = response.json()
    articles = data['articles']
    return articles

def display_news(articles):
    # This function formats the news articles into a list of dictionaries with title, description, and URL.
    news_list = []
    for article in articles:
        news_list.append({
            "title": article['title'],
            "description": article['description'],
            "url": article['url']
        })
    return news_list

@app.route("/")
def index():
    # This route handler serves the index.html file, which contains the chat interface.
    return app.send_static_file("index.html")

@app.route("/get_news", methods=["GET"])
def get_news():
    # This route handler fetches Indian news using get_indian_news and returns it as a JSON response.
    indian_news = get_indian_news(NEWS_API_KEY)
    news_list = display_news(indian_news)
    return jsonify({"articles": news_list})

if __name__ == "__main__":
    app.run(debug=True)
