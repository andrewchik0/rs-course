import React from 'react';

class SearchBar extends React.Component<Record<string, never>, { value: string }> {
  constructor(props: Record<string, never>) {
    super(props);

    this.state = { value: localStorage.getItem('search-value') || '' };
    this.changeState = this.changeState.bind(this);
    this.saveState = this.saveState.bind(this);
  }

  saveState() {
    localStorage.setItem('search-value', this.state.value);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.saveState);
  }

  componentWillUnmount() {
    this.saveState();
    window.removeEventListener('beforeunload', this.saveState);
  }

  changeState(e: React.FocusEvent<HTMLInputElement>) {
    this.setState({ value: e.target.value });
  }

  render(): React.ReactNode {
    return (
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          onChange={this.changeState}
          value={this.state.value}
        />
        <button className="search-button">
          <img src="./search.svg" alt="Search" height="40px" />
        </button>
      </div>
    );
  }
}

export default SearchBar;
