import React, { Component } from "react";
import Sidebar from "../Components/Sidebar";
import NavBar from "../Components/NavBar";
import Ride from "../Components/Ride";
import logo from "../Components/In-Quire.png";
import RideCheckBox from "../Components/RideCheckBoxes";
import RideDropDown from "../Components/RideDropDown";
import UserContext from "../Context/UserContext";

import http from "../APIServices/httpService";
import config from "../APIServices/config.json";
import { Box, Container, Grid } from "@material-ui/core";
import { toast, ToastContainer } from "react-toastify";

class RideMaintenance extends Component {
  static contextType = UserContext;

  state = {
    ownsRide2: true,
    price: 5000,

    duration: 14,
    cartCapacity: 4,

    ride1Capacity: 4,
    ride2Capacity: 4,
    ride1Minutes: 4,
    ride2Minutes: 4,

    rides: [],
    team: [],
    ride1: null,
    ride2: null,

    waterproof1: null,
    waterproof2: null,
    waterproof3: null,
    waterproof4: null,
  };

  async componentDidMount() {
    http
      .get(config.apiEndpoint + "/team/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ team: res.data });
        this.context.currentUser.budget = res.data.budget; //updates the context
      });

    http.get(config.apiEndpoint + "/rides/" + "1").then((res) => {
      if (res.data[0]) {
        this.setState({
          ride1: res.data[0],
          waterproof1: res.data[0].waterproof,
          //put all upgrades here
        });
      }
      if (res.data[1]) {
        this.setState({
          ride2: res.data[1],
          waterproof2: res.data[1].waterproof,
        });
      }
      if (res.data[2]) {
        this.setState({
          ride3: res.data[2],
          waterproof3: res.data[2].waterproof,
        });
      }
      if (res.data[3]) {
        this.setState({
          ride4: res.data[3],
          waterproof4: res.data[3].waterproof,
        });
      }
    });
  }

  //maybe one submit button that calls 2 functions instead of both submitting here??
  formSubmit(event) {
    event.preventDefault();
    console.log("form submitted");
  }

  ride1Submit = (e) => {
    //ride1
    const { team, waterproof1, price, ride1 } = this.state;

    let amount = 0;
    if (waterproof1) {
      amount = amount + price;
      ride1.waterproof = true;
    }
    //do this for each upgrade we have
    console.log(amount);
    const budget = team.budget; // used to set api team.budget

    const isBudgetNotNegative = parseInt(budget, 10) - parseInt(amount, 10);
    if (isBudgetNotNegative < 0) {
      toast.error("You don't have enough money!");
      return;
    }
    team.budget = parseInt(budget, 10) - parseInt(amount, 10);
    this.context.currentUser.budget = team.budget; //updates the context
    this.setState({ test: true });
    http.put(
      config.apiEndpoint + "/team/" + this.context.currentUser.teamID,
      team
    );
    //end budget check
    http.put(
      config.apiEndpoint + "/rides/" + this.context.currentUser.teamID + "/1",
      ride1
    );
    //put request here to ride/teamid/rideid
  };

  handleCheckBoxChange = (e) => {
    let state = e.currentTarget.attributes.stateVar.value; //this is the state var being changed by checking box
    this.setState((initialState) => ({
      [state]: !initialState[state],
    }));
  };

  handleDropDownChange = (e) => {
    this.setState({
      [e.currentTarget.attributes.stateVar.value]: parseInt(
        e.currentTarget.value,
        10
      ),
    });
  };

  render() {
    const {
      buyMinutes1,
      buyMinutes2,
      price,
      ride1Capacity,
      ride2Capacity,
      ride1Minutes,
      ride2Minutes,
      ride1,
      ride2,
      waterproof1,
      waterproof2,
    } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <Box display="flex" id="wrapper">
          <Sidebar activePage="rides" />
          <Container id="page-content-wrapper">
            <NavBar pagename="Rides" budget={this.context.currentUser.budget} />
            <Box
              px={5}
              py={4}
              className="bg-white box-shadow rounded"
              minHeight={"calc(100vh - 140px)"}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box
                    p={1}
                    textAlign="center"
                    fontWeight="fontWeightBold"
                    className="bg-blue box-shadow rounded"
                  >
                    Ride Maintenance
                  </Box>
                </Grid>
                <Box
                  p={2}
                  margin="auto"
                  textAlign="center"
                  float="center"
                  fontWeight="fontWeightBold"
                  className="bg-lightblue box-shadow rounded"
                >
                  Duration: {this.state.duration} <br />
                  Cart Capacity: {this.state.cartCapacity}
                </Box>
              </Grid>
              <br />
              {!ride2 && (
                <Box>
                  {ride1 && (
                    <div class="cardData">
                      <Ride
                        rideNum="1"
                        name="California " //{ride1.name}
                        pictureLink={logo} //{ride1.image}
                      ></Ride>
                      <form class="center" onSubmit={this.formSubmit}>
                        <RideCheckBox
                          name="Waterproof"
                          price={price}
                          checked={waterproof1}
                          stateVar="waterproof1"
                          onChange={this.handleCheckBoxChange}
                        />
                        <br />
                        <RideCheckBox
                          name="Buy 5 Minutes"
                          price={price}
                          checked={buyMinutes1}
                          stateVar="buyMinutes1"
                          onChange={this.handleCheckBoxChange}
                        />
                        <br />
                        <RideDropDown
                          name="Capacity"
                          value={ride1Capacity}
                          onChange={this.handleDropDownChange}
                          stateVar="ride1Capacity"
                        ></RideDropDown>
                        <br />
                        <RideDropDown
                          name="Minutes"
                          value={ride1Minutes}
                          onChange={this.handleDropDownChange}
                          stateVar="ride1Minutes"
                        ></RideDropDown>
                        <br />
                        <button
                          onClick={this.ride1Submit}
                          className="btn btn-dark "
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  )}
                </Box>
              )}
              {ride2 && (
                <Box class="columns2">
                  {ride1 && (
                    <div class="cardData">
                      <Ride
                        rideNum="1"
                        name="California " //{ride1.name}
                        pictureLink={logo} //{ride1.image}
                      ></Ride>
                      <form class="center" onSubmit={this.formSubmit}>
                        <RideCheckBox
                          name="Waterproof"
                          price={price}
                          checked={waterproof1}
                          stateVar="waterproof1"
                          onChange={this.handleCheckBoxChange}
                        />
                        <br />
                        <RideCheckBox
                          name="Buy 5 Minutes"
                          price={price}
                          checked={buyMinutes1}
                          stateVar="buyMinutes1"
                          onChange={this.handleCheckBoxChange}
                        />
                        <br />
                        <RideDropDown
                          name="Capacity"
                          value={ride1Capacity}
                          onChange={this.handleDropDownChange}
                          stateVar="ride1Capacity"
                        ></RideDropDown>
                        <br />
                        <RideDropDown
                          name="Minutes"
                          value={ride1Minutes}
                          onChange={this.handleDropDownChange}
                          stateVar="ride1Minutes"
                        ></RideDropDown>
                        <br />
                        <button
                          onClick={this.ride1Submit}
                          className="btn btn-dark "
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  )}
                  <br></br>

                  {ride2 && (
                    <div class="cardData">
                      <Ride
                        rideNum="2"
                        name="ride 2" //{ride1.name}
                        pictureLink={logo} //{ride1.image}
                      ></Ride>
                      <form class="center" onSubmit={this.formSubmit}>
                        <RideCheckBox
                          name="Waterproof"
                          price={price}
                          checked={waterproof2}
                          stateVar="waterproof2"
                          onChange={this.handleCheckBoxChange}
                        />
                        <br />
                        <RideCheckBox
                          name="Buy 5 Minutes"
                          price={price}
                          checked={buyMinutes2}
                          stateVar="buyMinutes2"
                          onChange={this.handleCheckBoxChange}
                        />
                        <br />
                        <RideDropDown
                          name="Capacity"
                          value={ride2Capacity}
                          onChange={this.handleDropDownChange}
                          stateVar="ride2Capacity"
                        ></RideDropDown>
                        <br />
                        <RideDropDown
                          name="Minutes"
                          value={ride2Minutes}
                          onChange={this.handleDropDownChange}
                          stateVar="ride2Minutes"
                        ></RideDropDown>
                        <br />
                        <button
                          onClick={this.ride2Submit}
                          className="btn btn-dark "
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  )}
                </Box>
              )}
            </Box>
          </Container>
        </Box>
      </React.Fragment>
    );
  }
}

export default RideMaintenance;
