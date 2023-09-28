const quoteList = document.getElementById("quoteList");
const newQuoteForm = document.getElementById("newQuoteForm");

// Function to fetch and display quotes
const getQuotes = () => {
fetch("http://localhost:3000/quotes?_embed=likes")
.then(response => response.json())
.then(quotes => {
quoteList.innerHTML = ""; // Clear existing quotes

  quotes.forEach(quote => {
    const li = document.createElement("li");
    li.className = "quote-card";

    const blockquote = document.createElement("blockquote");
    blockquote.className = "blockquote";

    const quoteText = document.createElement("p");
    quoteText.className = "mb-0";
    quoteText.textContent = quote.text;

    const author = document.createElement("footer");
    author.className = "blockquote-footer";
    author.textContent = quote.author;

    const likeButton = document.createElement("button");
    likeButton.className = "btn-success";
    likeButton.textContent = `Likes: ${quote.likes.length}`;

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn-danger";
    deleteButton.textContent = "Delete";

    blockquote.appendChild(quoteText);
    blockquote.appendChild(author);
    blockquote.appendChild(document.createElement("br"));
    blockquote.appendChild(likeButton);
    blockquote.appendChild(deleteButton);

    li.appendChild(blockquote);
    quoteList.appendChild(li);
  });
});
};

// Function to create a new quote
const createQuote = (quoteText, quoteAuthor) => {
fetch("http://localhost:3000/quotes", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
text: quoteText,
author: quoteAuthor
})
})
.then(response => response.json())
.then(() => {
getQuotes(); // Refresh the quote list
newQuoteForm.reset(); // Clear the form
});
};

// Event listener for form submission
newQuoteForm.addEventListener("submit", event => {
event.preventDefault();
const quoteText = document.getElementById("quoteText").value;
const quoteAuthor = document.getElementById("quoteAuthor").value;
createQuote(quoteText, quoteAuthor);
});

// Fetch and display quotes on page load
getQuotes();
```

#This code fetches quotes from the provided API, dynamically creates HTML elements for each quote, handles form submission to create new quotes, and updates the UI accordingly. The quote list is displayed in an unordered list (<ul>) with each quote as a list item (<li>). The quotes are fetched and displayed when the page loads, and new quotes are created when the form is submitted.

Please note that you need to have a JSON server running on http://localhost:3000 with a quotes endpoint that supports the required functionality for this code to work properly.

//Pseudocode

//Build a simple, Event-driven, Javascript  DOM-modifying application
//Populate page with quotes with a GET request to http://localhost:3000/quotes?_embed=likes. The query string in this URL tells json-server to include the likes for a quote in the JSON of the response. You should not use this query string when creating or deleting a quote.
//Submitting the form creates a new quote and adds it to the list of quotes without having to refresh the page. Pessimistic rendering is recommended.
//Clicking the delete button should delete the respective quote from the API and remove it from the page without having to refresh.
///Clicking the like button will create a like for this particular quote in the API and update the number of likes displayed on the page without having to refresh.
//Use a POST request to http://localhost:3000/likes
//The body of the request should be a JSON object containing a key of quoteId, with an integer value. Use the ID of the quote you're creating the like for — e.g. { quoteId: 5 } to create a like for quote 5.
//IMPORTANT: if the quoteID is a string for some reason (for example, if you've pulled the ID from a dataset) the index page will not include the like you create on any quote.
//
//Bonus (not required): add a createdAt key to your object to track when the like was created. Use UNIX timeLinks to an external site. (the number of seconds since January 1, 1970). The documentationLinks to an external site. for the JS Date class may be helpful here!
//Add an edit button to each quote-card that will allow the editing of a quote. (Hint: there is no 'correct' way to do this. You can try creating a hidden form that will only show up when hitting the edit button.)
//Currently, the number of likes of each post does not persist on the frontend after we refresh, as we set the beginning value to 0. Include an additional fetch to always have an updated number of likes for each post. You will send a GET request to http://localhost:3000/likes?quoteId= and interpolate the id of a given post.
//Add a sort button that can be toggled on or off. When off the list of quotes will appear sorted by the ID. When the sort is active, it will display the quotes by author's name, alphabetically.
//One way of doing this is to sort the quotes in JS after you've retrieved them from the API. Try this way first.
//Another way of doing this is to make a fetch to https://localhost:3000/quotes?_sort=author
//What are the pros and cons in doing the sorting on the client vs. the server? Discuss with a partner.he pros and cons of client-side sorting versus server-side sorting:

Client-side sorting:

Pros:
1. Faster initial load time: By sorting the data on the client-side, the page can load quickly since the sorting does not require an additional server request.
2. Better user experience: Sorting on the client-side allows for instant sorting without any delays caused by server requests, resulting in a smoother and more responsive user experience.
3. Reduced server load: Offloading the sorting process to the client-side can help reduce the server load and improve the scalability of the server.

Cons:
1. Increased data transfer: When sorting on the client-side, all the data needs to be transferred to the client before sorting. This can be a problem if the dataset is large, resulting in increased network bandwidth usage.
2. Limited sorting options: Client-side sorting is limited to the data that has already been loaded to the client. If you need to sort based on data that is not available on the client-side, server-side sorting might be more suitable.

Server-side sorting:

Pros:
1. Reduced data transfer: Server-side sorting allows you to request only the sorted data from the server, reducing the amount of data that needs to be transferred over the network.
2. Flexibility in sorting options: Server-side sorting provides more flexibility in terms of sorting options. You can perform complex sorting operations, sort based on multiple fields, or use custom sorting algorithms.

Cons:
1. Increased server load: Sorting large datasets on the server-side can put a strain on server resources, especially if the sorting operation is complex or the server has high traffic.
2. Slower response time: Server-side sorting requires an additional round-trip to the server, resulting in slower response times compared to client-side sorting.

Ultimately, the choice between client-side and server-side sorting depends on various factors such as the size of the dataset, the complexity of the sorting operation, and the desired user experience. It's important to consider the trade-offs and choose the approach that best suits the specific requirements of your application
