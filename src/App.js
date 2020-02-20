import React, { Component } from "react";

import axios from "axios";

// Components
import Sidebar from "./Sidebar";
import AuthorList from "./AuthorList";
import AuthorDetail from "./AuthorDetail";
import Loading from "./Loading";

class App extends Component {
  state = {
    currentAuthor: null,
    authors: [],
    loading: true
  };

  async componentDidMount() {
    try {
      const Response = await axios.get(
        "https://the-index-api.herokuapp.com/api/authors/"
      );
      const data = Response.data;
      this.setState({ authors: data });
      if (this.state.authors.length > 1) {
        this.setState({ loading: false });
      }
    } catch (error) {
      console.error(error);
    }
  }

  selectAuthor = author => this.setState({ currentAuthor: author });

  unselectAuthor = () => this.setState({ currentAuthor: null });

  getContentView = () => {
    if (this.state.currentAuthor) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else {
      return (
        <AuthorList
          authors={this.state.authors}
          selectAuthor={this.selectAuthor}
        />
      );
    }
  };
  checkLoadingscreen = () => {
    if (this.state.loading) {
      return <Loading />;
    } else {
      return (
        <div className="row">
          <div className="col-2">
            <Sidebar unselectAuthor={this.unselectAuthor} />
          </div>
          <div className="content col-10">{this.getContentView()}</div>
        </div>
      );
    }
  };

  render() {
    return (
      <div id="app" className="container-fluid">
        {this.checkLoadingscreen()}
      </div>
    );
  }
}

export default App;
