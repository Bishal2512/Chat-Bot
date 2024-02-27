document.getElementById("submit-button").addEventListener("click", function() {
    var userInput = document.getElementById("user-input").value.trim();
    
    if (userInput) {
        // Only process the user input if it's not empty.
        if (userInput.toLowerCase() === "today's news") {
            // If the user's input is "Today's News", trigger fetching news.
            appendMessage("User", userInput);
            fetchNews();
        } else if (userInput.toLowerCase() === "hello") {
            // If the user's input is "Hello", provide a description of the chatbot.
            appendMessage("User", userInput)
            appendMessage("Bot", "Hello! I'm a chatbot that can provide you with the latest news from around the regions of India. You can ask me for 'Today's News' to get started!");
        } else {
            // Otherwise, send the user's message to the backend as usual.
            sendMessage(userInput);
        }
        
        // Append the user's message to the chat interface.
        
        // Clear the input field after processing the message.
        document.getElementById("user-input").value = "";
    }
});

function sendMessage(message) {
    // This function sends a message to the backend and displays the response.
    // It accepts a message as input and sends it to the Flask backend.
    // After receiving the response from the backend, it displays the response in the chat interface.

    // Send a POST request to the backend (/get_response endpoint) with the user's message.
    fetch("/get_response", {
        method: "POST",
        body: JSON.stringify({ message: message }), // Send the message in JSON format.
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json()) // Parse the JSON response from the backend.
    .then(data => {
        if (data && data.response) {
            // Check if the response from the backend is not undefined.
            appendMessage("Bot", data.response); // Display the bot's response in the chat interface.
        }
    })
    .catch(error => {
        console.error('Error:', error); // Log any errors that occur during the request.
        appendMessage("Bot", "Running....");
    });
}

function fetchNews() {
    // This function sends a request to the backend to fetch today's news.
    // It sends a GET request to the /get_news endpoint.

    fetch("/get_news", {
        method: "GET"
    })
    .then(response => response.json()) // Parse the JSON response from the backend.
    .then(data => {
        if (data && data.articles) {
            // Check if the articles data from the backend is not undefined.
            displayNews(data.articles); // Display the news articles in the chat interface.
        } else {
            // If the articles data is undefined, display an error message.
            appendMessage("Bot", "Error: No news articles found");
        }
    })
    .catch(error => {
        console.error('Error:', error); // Log any errors that occur during the request.
        appendMessage("Bot", "Error: Failed to fetch news from the server");
    });
}

function displayNews(articles) {
    // This function displays the news articles in the chat interface.

    appendMessage("Bot", "Today's News:"); // Display a header for today's news.
    for (var i = 0; i < articles.length; i++) {
        // Display each news article title, description, and URL.
        appendMessage("Bot", "Title: " + articles[i].title);
        appendMessage("Bot", "Description: " + articles[i].description);
        appendMessage("Bot", "URL: " + articles[i].url);
        appendMessage("Bot", ""); // Add a blank line for separation.
    }
}

function appendMessage(sender, message) {
    // This function appends a message to the chat interface.
    // It accepts the sender's name and the message content as input and adds a new message element to the chat interface.
    
    var chatBox = document.getElementById("chat-box"); // Get the chat box element.
    var messageElement = document.createElement("div"); // Create a new div element for the message.
    messageElement.innerHTML = "<strong>" + sender + ":</strong> " + message; // Set the inner HTML of the message element.
    chatBox.appendChild(messageElement); // Append the message element to the chat box.
}
