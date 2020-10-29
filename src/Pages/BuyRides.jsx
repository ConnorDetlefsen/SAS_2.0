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

class BuyRides extends Component {
  static contextType = UserContext;

  state = {
    ride1Purchased: false,
    ride2Purchased: false,
    ride3Purchased: false,
    ride4Purchased: false,
    ride5Purchased: false,
    ride6Purchased: false,
    ride7Purchased: false,
    ride8Purchased: false,

    kidFriendly1: false,
    kidFriendly2: false,
    kidFriendly3: false,
    kidFriendly4: false,
    kidFriendly5: false,
    kidFriendly6: false,
    kidFriendly7: false,
    kidFriendly8: false,

    rideOptions: [],

    ride1: [],
    ride2: [],
    ride3: [],
    ride4: [],
    ride5: [],
    ride6: [],
    ride7: [],
    ride8: [],

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

  async componentDidMount() {
    const { history } = this.props;

    if (this.context.currentUser.name === null) {
      history.push("/");
    }

    http
      .get(config.apiEndpoint + "/team/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ team: res.data });
        this.context.currentUser.budget = res.data.budget; //updates the context
      });
    http.get(config.apiEndpoint + "/rideoptions/").then((res) => {
      this.setState({
        rideOptions: res.data,
        ride1: res.data[0],
        ride2: res.data[1],
        ride3: res.data[2],
        ride4: res.data[3],
        ride5: res.data[4],
        ride6: res.data[5],
        ride7: res.data[6],
        ride8: res.data[7],

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

  onNextClick = (e) => {
    const { history } = this.props;
    history.push("/buyride2");
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
      kidFriendly1,
      ride1,
      kidFriendly2,
      ride2,
      kidFriendly3,
      ride3,
      kidFriendly4,
      ride4,
      kidFriendly5,
      ride5,
      kidFriendly6,
      ride6,
      kidFriendly7,
      ride7,
      kidFriendly8,
      ride8,
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
                  name={ride1.description}
                  value={ride1.price}
                  time={ride1.ride_length}
                  purchased={this.state.ride1Purchased}
                  stateVar="kidFriendly1"
                  checked={kidFriendly1}
                  onClick={this.handleClick}
                  onChange={this.handleCheckBoxChange}
                  id={ride1.ride_id}
                ></Ride>
                <Ride
                  name={ride2.description}
                  value={ride2.price}
                  time={ride2.ride_length}
                  purchased={this.state.ride2Purchased}
                  stateVar="kidFriendly2"
                  checked={kidFriendly2}
                  onClick={this.handleClick}
                  onChange={this.handleCheckBoxChange}
                  id={ride2.ride_id}
                ></Ride>
                <Ride
                  name={ride3.description}
                  value={ride3.price}
                  time={ride3.ride_length}
                  purchased={this.state.ride3Purchased}
                  stateVar="kidFriendly3"
                  checked={kidFriendly3}
                  onClick={this.handleClick}
                  onChange={this.handleCheckBoxChange}
                  id={ride3.ride_id}
                ></Ride>
                <Ride
                  name={ride4.description}
                  value={ride4.price}
                  time={ride4.ride_length}
                  purchased={this.state.ride4Purchased}
                  stateVar="kidFriendly4"
                  checked={kidFriendly4}
                  onClick={this.handleClick}
                  onChange={this.handleCheckBoxChange}
                  id={ride4.ride_id}
                ></Ride>
                <Ride
                  name={ride5.description}
                  value={ride5.price}
                  time={ride5.ride_length}
                  purchased={this.state.ride5Purchased}
                  stateVar="kidFriendly5"
                  checked={kidFriendly5}
                  onClick={this.handleClick}
                  onChange={this.handleCheckBoxChange}
                  id={ride5.ride_id}
                ></Ride>
                <Ride
                  name={ride6.description}
                  value={ride6.price}
                  time={ride6.ride_length}
                  purchased={this.state.ride6Purchased}
                  stateVar="kidFriendly6"
                  checked={kidFriendly6}
                  onClick={this.handleClick}
                  onChange={this.handleCheckBoxChange}
                  id={ride6.ride_id}
                ></Ride>
                <Ride
                  name={ride7.description}
                  value={ride7.price}
                  time={ride7.ride_length}
                  purchased={this.state.ride7Purchased}
                  stateVar="kidFriendly7"
                  checked={kidFriendly7}
                  onClick={this.handleClick}
                  onChange={this.handleCheckBoxChange}
                  id={ride7.ride_id}
                ></Ride>
                <Ride
                  name={ride8.description}
                  value={ride8.price}
                  time={ride8.ride_length}
                  purchased={this.state.ride8Purchased}
                  stateVar="kidFriendly8"
                  checked={kidFriendly8}
                  onClick={this.handleClick}
                  onChange={this.handleCheckBoxChange}
                  id={ride8.ride_id}
                ></Ride>
              </div>
              <br></br>
              <button
                onClick={this.onNextClick}
                class="btn btn-primary rightButton"
              >
                Next Page
              </button>
            </Box>
          </Container>
        </Box>
      </React.Fragment>
    );
  }
}

export default BuyRides;
