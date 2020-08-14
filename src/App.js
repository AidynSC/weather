import React from 'react';
import Result from './components/Result';
import './style.css'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: '',
      country: '',
      location: null
    }
  }
  
  setCity = (e) => {
    this.setState({
      city: e.target.value
    })
  }

  select = (e) => {
    e.preventDefault();
    this.setState({
      location: this.state.city
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.select}>
          <div class="form-row">
            <div class="col">
              <input type="text" onChange={this.setCity} value={this.state.city} class="form-control" placeholder="Введите город" />
            </div>
          </div>
          <div class="col">
            <button type="submit" class="btn btn-primary mb-2">Найти</button>
          </div>
        </form>
        {this.state.location && <div>
          <Result location={this.state.location} />
        </div>}
        
      </div>
    )
  }
}

export default App;
