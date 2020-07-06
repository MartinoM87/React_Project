import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./styles.css";

function App() {
  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  const [apiKey, setApiKey] = useState(
    "AIzaSyDx3BTaDgp8bGdE-8X7TOe81t919gunMyU"
  );
  function handleChange(event) {
    const book = event.target.value;
    setBook(book);
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          book +
          "&key=" +
          apiKey +
          "&maxResults=40"
      )
      .then(data => {
        setResult(data.data.items);
      });
  }

  return (
    <div class="container">
      <h1 class="line">Google Books</h1>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <input
            type="text"
            onChange={handleChange}
            className="form-control"
            placeholder="Search for books"
            autoComplete="off"
          />
          <button type="Submit" className="btn">
            Search
          </button>
        </div>
      </form>

      {result.map(book => (
        <div class="image-group">
          <a target="_blank" href={book.volumeInfo.previewLink}>
            <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title} />
            <div class="style-paragraf">
              <h2> {book.volumeInfo.title}</h2>
              <h3> {book.volumeInfo.subtitle}</h3>
              <p> {book.volumeInfo.authors}</p>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
