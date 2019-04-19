import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import Eggs from './Eggs';
import Monsters from './Monsters';
import Actions from './actions';
import NameModal from './Modal';
import { Route, Switch, withRouter } from 'react-router-dom';
import Intro from "./intro";
import { NavLink, Redirect } from 'react-router-dom';
import lifeEgg from './functions/lifeEgg';
import lifeCharacter from './functions/lifeCharacter';
import gourou from './images/benoit_superboss.png';
import Droppable from './dragNdropComp/Droppable';
import Draggable from './dragNdropComp/Draggable';
import { prototype } from 'module';
import Pub from './Pub';
import PubModal from './PubModal';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

      // eggs state
      nameEgg: "",
      imageEgg: "",
      caliberEgg: "",
      farmingEgg: "",
      rarityEgg: "",
      powerEgg: "",
      victoryEgg: null,
      lifeEgg: "",

      // monster state
      nameMonster: "",
      imageMonster: "",
      skillsMonster: "",
      originMonster: "",
      speciesMonster: "",
      lifeMonster: "",

      // popup state
      visibleModal: false,
      userName: "",
      welcomeMessage: "",

      pubModalVisible: false,

      // battle state
      isWinner: null,

      // console
      chat: [],

      //benoit
      isGourou: false,

      //CSS Break
      breakCSS: true,

      // Winable
      counterWin: 1

    }
    this.victory = this.victory.bind(this);
    this.fixCSS = this.fixCSS.bind(this);
    this.openPubModal = this.openPubModal.bind(this);
  }

  componentDidMount() {
    this.apiEggs();
    this.apiMonster();


  }

  fixCSS() {
    window.loadCSS('https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css');
    this.setState({ breakCSS: false });
    this.openModal();
  }

  openPubModal() {
    this.setState({
      pubModalVisible: true
    });
  }

  // popup open
  openModal() {
    this.setState({
      visibleModal: true
    });
  }
  // popup close
  closeModal() {
    this.setState({
      visibleModal: false
    });
  }

  takeUserName = () => {

    this.closeModal()
    this.apiEggs()
    console.log(`Welcome ${this.state.userName}`)
  }

  onChangeModal = (event) => {
    const { name, value } = event.target;
    this.setState({
      userName: `${event.target.value}`,
      welcomeMessage: `Welcome ${event.target.value}`,
      [name]: value
    }, () => console.log(`test ${this.state.userName}`));

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.powerEgg !== this.state.powerEgg) {
      this.setState({ lifeEgg: lifeEgg(this.state.powerEgg, this.state.isGourou) })
    }
    if (prevState.skillsMonster !== this.state.skillsMonster) {
      this.setState({ lifeMonster: lifeCharacter(this.state.skillsMonster) })
    }

    if ((prevState.isWinner !== this.state.isWinner) && (this.state.isWinner === true)) {
      this.apiMonster()
      this.setState({ isWinner: null })
    } else if ((prevState.isWinner !== this.state.isWinner) && (this.state.isWinner === false)) {
      this.apiEggs()
      this.setState({ isWinner: null })
    }
  }

  victory(egg, monster) {
    if (this.state.counterWin >= 5) {
      this.generique();
    } else {
      if (this.state.userName === 'sudo') {
        this.setState(prevState => {
          return {
            isWinner: true,
            counterWin: prevState.counterWin + 1,
            chat: ["Victory !", `  SKIPPY WIN AGAIN !!`].concat(prevState.chat)

          }

        })

      } else {
        if (egg >= monster) {
          this.setState(prevState => {
            return {
              isWinner: true,
              counterWin: prevState.counterWin + 1,
              chat: ["Victory !", ` ${this.state.nameMonster} is EGGsterminated !`].concat(prevState.chat)
            }

          })

        } else {
          this.setState(prevState => {
            return {
              isWinner: false,
              chat: ["Fatality !", `${this.state.nameEgg} end in omelet !`].concat(prevState.chat)
            }

          })
        }
      }
    }
  }



  // api calls
  apiEggs() {
    if (this.state.userName === 'sudo') {
      this.setState({
        nameEgg: "Le GRAND GOUROUUU!",
        imageEgg: gourou,
        caliberEgg: "Christ cosmique",
        farmingEgg: "from Bugarache",
        rarityEgg: "Unique",
        powerEgg: "murmure à l'oreille des devices",
        isGourou: true,
      });
    } else {
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
    // Récupération de l'employé via fetch

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

  sayMyName = () => {
    if (this.state.isGourou) {
      return "Ode au grand Gourou !"
    } else {
      return this.state.welcomeMessage;
    }
  }

  generique = () => {

    this.props.history.push("/generique");
  }


  render() {
    return (

      <div className="App">

        <NameModal
          visible={this.state.visibleModal}
          submitName={this.takeUserName}
          userName={this.state.userName}
          onChange={this.onChangeModal}
        />

        <PubModal
          visible={this.state.pubModalVisible}
        />


        <header className="App-header">
          <span className="d-flex align-items-center">
            <img src={logo} className="App-logo" alt="logo" />
            <span className="d-flex">
              <Droppable id="dr1" fixCSS={this.fixCSS}>
              </Droppable>
              <span className="mr-5">Omelet Wars{this.state.breakCSS && <span>&lsaquo;/h1&rsaquo;</span>}</span>
            </span>
            <img src={logo} className="App-logo" alt="logo" />
            <Droppable id="dr2">
              <Draggable id="item1">
                {this.state.breakCSS && <div>&lsaquo;h1&rsaquo;</div>}
              </Draggable>
            </Droppable>
          </span>

        </header>
        <h2> {this.sayMyName()}</h2>
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
          <div className="col-5">
            <Actions
              monsterName={this.state.nameMonster}
              nameEgg={this.state.nameEgg}
              healProps={this.state.chat}
              lifeEgg={this.state.lifeEgg}
              lifeMonster={this.state.lifeMonster}
              victory={this.victory}
            />
          </div>
          <div className="col-3">
            <Monsters
              nameMonster={this.state.nameMonster}
              imageMonster={this.state.imageMonster}
              skillsMonster={this.state.skillsMonster}
              originMonster={this.state.originMonster}
              speciesMonster={this.state.speciesMonster}
              lifeMonster={this.state.lifeMonster}
            />


            <Switch>
              <Route exact path="/generique" component={Intro} />
              }
            </Switch>
          </div>

        </div>


        <div className="pub mt-3 mb-3 d-flex justify-content-between">
          <div className="image">

          </div>
          <div className="BLINGBLING">
            <img src="https://www.theworldsworstwebsiteever.com/images/new21.gif" alt="new"></img>
            <strong>Rencontre les <span className="blink">Oeufs durs</span> de ta région </strong><br /><br />
            Organise des soirées omelettes avec des oeufs <br />du calibre de ton choix
            </div>
          <div className="majeur">
            <p>Confirme ton âge</p>

            <div>

              <div>
                <input className="mb-6 " type="radio" id="dewey" name="drone" value="dewey" />
                <label for="dewey">Je suis majeur</label>
              </div>

              <div>
                <input className="mt-3" type="radio" id="louie" name="drone" value="louie" />
                <label for="louie">mi-neur mi-curieux</label>
              </div>


            </div>

          </div>
          <div>
            <button
              onClick={() => this.openPubModal()}
              className="griss"
            >X</button>
          </div>
        </div>

      </div>

    );
  }
}

export default withRouter(App);
