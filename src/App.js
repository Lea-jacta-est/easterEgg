import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Eggs from './Eggs';
import Monsters from './Monsters';
import Actions from './actions';
import characterLife from './functions/characterLife';
import { Route, Switch } from 'react-router-dom';
import Intro from "./intro";
import { NavLink } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nameEgg: "",
      imageEgg: "",
      caliberEgg: "",
      farmingEgg: "",
      rarityEgg: "",
      powerEgg: "",
      victoryEgg: null,
      lifeEgg: "",
      nameMonster: "",
      imageMonster: "",
      skillsMonster: "",
      originMonster: "",
      speciesMonster: "",
    }
  }

  componentDidMount() {
    this.apiEggs();
    this.apiMonster();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.powerEgg !== this.state.powerEgg) {
      this.setState({ lifeEgg: characterLife(this.state.powerEgg) })
    }
  }


  updateLife() {
    console.log(this.state.powerEgg);
  }

  apiEggs() {
    // Récupération de l'employé via fetch
    fetch("http://easteregg.wildcodeschool.fr/api/eggs/random")
      .then(response => response.json())
      .then(data => {
        // Une fois les données récupérées, on va mettre à jour notre state avec les nouvelles données
        this.setState({
          nameEgg: data.name,
          imageEgg: data.image,
          caliberEgg: data.caliber,
          farmingEgg: data.farming,
          rarityEgg: data.rarity,
          powerEgg: data.power,
        });
      });
  }


  apiMonster() {
    // Récupération de l'employé via fetch
    fetch("http://easteregg.wildcodeschool.fr/api/characters/random")
      .then(response => response.json())
      .then(data => {
        // Une fois les données récupérées, on va mettre à jour notre state avec les nouvelles données

        this.setState({
          nameMonster: data.name,
          imageMonster: data.image,
          skillsMonster: data.skills,
          originMonster: data.origin,
          speciesMonster: data.species,

        });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="row justify-content-center my-5">
          <div className="col-3">
            <Eggs
              nameEgg={this.state.nameEgg}
              imageEgg={this.state.imageEgg}
              caliberEgg={this.state.caliberEgg}
              farmingEgg={this.state.farmingEgg}
              rarityEgg={this.state.rarityEgg}
              powerEgg={this.state.powerEgg}
              victoryEgg={this.state.victoryEgg}
              lifeEgg={this.state.lifeEgg}
            />
          </div>
          <div className="col-3">
            <Actions
              healing={this.healing}
              disabled={this.state.disabled}
            />
          </div>
          <div className="col-3">
            <Monsters
              nameMonster={this.state.nameMonster}
              imageMonster={this.state.imageMonster}
              skillsMonster={this.state.skillsMonster}
              originMonster={this.state.originMonster}
              speciesMonster={this.state.speciesMonster}
            />



            <Switch>
              <Route exact path="/generique" component={Intro} />}
            </Switch>

            <NavLink to={`/generique`} >

              <button>Générique</button>

            </NavLink>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
