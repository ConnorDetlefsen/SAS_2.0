import React, { Component } from "react";
import Sidebar from "../Components/Sidebar";
import NavBar from "../Components/NavBar";
import UserContext from "../Context/UserContext";

import Ride from "../Components/RideSelection";

import http from "../APIServices/httpService";
import config from "../APIServices/config.json";
import { toast, ToastContainer } from "react-toastify";
import { Box, Container, Grid } from "@material-ui/core";
import { FastfoodOutlined } from "@material-ui/icons";

class BuyRides3 extends Component {
  static contextType = UserContext;

  state = {
    ride17Purchased: false,
    ride18Purchased: false,
    ride19Purchased: false,
    ride20Purchased: false,
    ride21Purchased: false,
    ride22Purchased: false,
    ride23Purchased: false,
    ride24Purchased: false,

    kidFriendly17: false,
    kidFriendly18: false,
    kidFriendly19: false,
    kidFriendly20: false,
    kidFriendly21: false,
    kidFriendly22: false,
    kidFriendly23: false,
    kidFriendly24: false,

    rideOptions: [],

    ride17: [],
    ride18: [],
    ride19: [],
    ride20: [],
    ride21: [],
    ride22: [],
    ride23: [],
    ride24: [],

    ridePost: {
      row_id: 1,
      team_id: null,
      ride_id: null,
      round_num: 1,
      period_num: 1,
      ride_length: null,
      seats: null,
    },
  };

  onBackClick = (e) => {
    const { history } = this.props;
    history.push("/buyride");
  };

  async componentDidMount() {
    const { history } = this.props;

    if (this.context.currentUser.name === null) {
      history.push("/");
    }

    http
      .get(config.apiEndpoint + "/team/" + "1") //this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ team: res.data });
        this.context.currentUser.budget = res.data.budget; //updates the context
      });
    http.get(config.apiEndpoint + "/rideoptions/").then((res) => {
      this.setState({
        rideOptions: res.data,
        ride17: res.data[16],
        ride18: res.data[17],
        ride19: res.data[18],
        ride20: res.data[19],
        ride21: res.data[20],
        ride22: res.data[21],
        ride23: res.data[22],
        ride24: res.data[23],

        // test: res.data.slice(0, 8),
      });
    });
  }

  /*
   {this.state.test.map((test) => (
                <tr key={test.id}>
                  <Ride
                    value={test.price}
                    description={test.description}
                    onClick={(e) => {
                      this.handleClick(e);
                    }}
                    id={test.ride_id}
                    time={test.ride_length}
                  ></Ride>
                  <br></br>
                </tr>
              ))}
              */

  handleCheckBoxChange = (e) => {
    let state = e.currentTarget.attributes.stateVar.value; //this is the state var being changed by checking box
    this.setState((initialState) => ({
      [state]: !initialState[state],
    }));
  };
  handleClick = (e) => {
    const { team, ridePost } = this.state;

    const amount = e.currentTarget.value;
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

    console.log(e.currentTarget.name);
    http.post(config.apiEndpoint + "/rides/", {
      row_id: 1, //this needs to change
      team_id: this.context.currentUser.teamID,
      ride_id: e.currentTarget.id,
      ride_length: e.currentTarget.attributes.time.value,
      seats: 4,
      round_num: 1,
      period_num: 1,
    });
  };

  render() {
    const {
      kidFriendly17,
      ride17,
      kidFriendly18,
      ride18,
      kidFriendly19,
      ride19,
      kidFriendly20,
      ride20,
      kidFriendly21,
      ride21,
      kidFriendly22,
      ride22,
      kidFriendly23,
      ride23,
      kidFriendly24,
      ride24,
    } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <Box display="flex" id="wrapper">
          <Sidebar activePage="rides" />
          <Container id="page-content-wrapper">
            <NavBar pagename="map" budget={this.context.currentUser.budget} />
            <Box
              px={5}
              py={4}
              className="bg-white box-shadow rounded"
              minHeight={"calc(100vh - 140px)"}
            >
              <Grid container>
                <Grid item xs={12}>
                  <Box
                    p={1}
                    textAlign="center"
                    fontWeight="fontWeightBold"
                    className="bg-blue box-shadow rounded"
                  >
                    Buy Rides
                  </Box>
                </Grid>
              </Grid>
              <br />

              <div class="columns4">
                <Ride
                  name={ride17.description}
                  value={ride17.price}
                  time={ride17.ride_length}
                  purchased={this.state.ride17Purchased}
                  stateVar="kidFriendly17"
                  checked={kidFriendly17}
                  onClick={this.handleClick}
                  onChange={this.handleCheckBoxChange}
                  id={ride17.ride_id}
                ></Ride>
                <Ride
                  name={ride18.description}
                  value={ride18.price}
                  time={ride18.ride_length}
                  purchased={this.state.ride18Purchased}
                  stateVar="kidFriendly18"
                  checked={kidFriendly18}
                  onClick={this.handleClick}
                  onChange={this.handleCheckBoxChange}
                  id={ride18.ride_id}
                ></Ride>
                <Ride
                  name={ride19.description}
                  value={ride19.price}
                  time={ride19.ride_length}
                  purchased={this.state.ride19Purchased}
                  stateVar="kidFriendly19"
                  checked={kidFriendly19}
                  onClick={this.handleClick}
                  onChange={this.handleCheckBoxChange}
                  id={ride19.ride_id}
                ></Ride>
                <Ride
                  name={ride20.description}
                  value={ride20.price}
                  time={ride20.ride_length}
                  purchased={this.state.ride20Purchased}
                  stateVar="kidFriendly20"
                  checked={kidFriendly20}
                  onClick={this.handleClick}
                  onChange={this.handleCheckBoxChange}
                  id={ride20.ride_id}
                ></Ride>
                <Ride
                  name={ride21.description}
                  value={ride21.price}
                  time={ride21.ride_length}
                  purchased={this.state.ride21Purchased}
                  stateVar="kidFriendly21"
                  checked={kidFriendly21}
                  onClick={this.handleClick}
                  onChange={this.handleCheckBoxChange}
                  id={ride21.ride_id}
                ></Ride>
                <Ride
                  name={ride22.description}
                  value={ride22.price}
                  time={ride22.ride_length}
                  purchased={this.state.ride22Purchased}
                  stateVar="kidFriendly22"
                  checked={kidFriendly22}
                  onClick={this.handleClick}
                  onChange={this.handleCheckBoxChange}
                  id={ride22.ride_id}
                ></Ride>
                <Ride
                  name={ride23.description}
                  value={ride23.price}
                  time={ride23.ride_length}
                  purchased={this.state.ride23Purchased}
                  stateVar="kidFriendly23"
                  checked={kidFriendly23}
                  onClick={this.handleClick}
                  onChange={this.handleCheckBoxChange}
                  id={ride23.ride_id}
                ></Ride>
                <Ride
                  name={ride24.description}
                  value={ride24.price}
                  time={ride24.ride_length}
                  purchased={this.state.ride24Purchased}
                  stateVar="kidFriendly24"
                  checked={kidFriendly24}
                  onClick={this.handleClick}
                  onChange={this.handleCheckBoxChange}
                  id={ride24.ride_id}
                ></Ride>
              </div>
              <br></br>

              <button
                onClick={this.onBackClick}
                class="btn btn-primary leftButton"
              >
                Back Page
              </button>
            </Box>
          </Container>
        </Box>
      </React.Fragment>
    );
  }
}

export default BuyRides3;
