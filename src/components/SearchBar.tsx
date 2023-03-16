import React from "react";

class SearchBar extends React.Component<{}, { value: string}> {

  constructor(props: {}) {
    super(props);

    this.saveText = this.saveText.bind(this);
  }

  state = {
    value: localStorage.getItem('search-value') ? localStorage.getItem('search-value') as string : ""
  };

  saveText(e: React.FocusEvent<HTMLInputElement>) {
    this.setState({ value: e.target.value }, () => {
      localStorage.setItem('search-value', this.state.value);
    });
  }

  render(): React.ReactNode {
    return (
      <div className="search-bar">
        <input type="text"  className="search-input" placeholder="Search..." onChange={this.saveText} value={this.state.value}/>
        <button className="search-button"><img src="./search.svg" alt="Search" height="40px"/></button>
      </div>
    );  
  }
}

export default SearchBar;