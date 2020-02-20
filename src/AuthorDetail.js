import React, { Component } from "react";
import axios from "axios";

// Componanats
import BookRow from "./BookRow";
import Loading from "./Loading";

class AuthorDetail extends Component {
  state = {
    book: [],
    loading: true,
    allAuthers: []
  };

  author = this.props.author;
  authorName = `${this.author.first_name} ${this.author.last_name}`;

  async componentDidMount() {
    try {
      const Response = await axios.get(
        `https://the-index-api.herokuapp.com/api/authors/${this.author.id}`
      );
      const data = Response.data;
      this.setState({ book: data.books });
      this.setState({ allAuthers: data.books.authors });
      if (this.state.book.length > 1) {
        this.setState({ loading: false });
      }
    } catch (error) {
      console.error(error);
      console.error("somthing went wronge");
    }
  }

  mappingBooksObj = () => {
    const books = this.state.book.map(obj => (
      <BookRow book={obj} key={obj.title} authorName={this.authorName} />
    ));
    return books;
  };

  // here why do i have to make the  map inside the unction
  // also why (books = this.state.book;) is not working even though the value inside is valid

  checkLoadingscreen = () => {
    if (this.state.loading) {
      return <Loading />;
    } else {
      return <tbody>{this.mappingBooksObj()}</tbody>;
    }
  };

  render() {
    return (
      <div className="author col-xs-10">
        <div>
          <h3>{this.authorName}</h3>
          <img
            src={this.author.imageUrl}
            className="img-thumbnail"
            alt={this.authorName}
          />
        </div>
        <table className="mt-3 table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Authors</th>
              <th>Color</th>
            </tr>
          </thead>
          {this.checkLoadingscreen()}
        </table>
      </div>
    );
  }
}

export default AuthorDetail;
