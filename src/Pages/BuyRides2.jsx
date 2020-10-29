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

class BuyRides2 extends Component {
  static contextType = UserContext;

  state = {
    ride9Purchased: false,
    ride10Purchased: false,
    ride11Purchased: false,
    ride12Purchased: false,
    ride13Purchased: false,
    ride14Purchased: false,
    ride15Purchased: false,
    ride16Purchased: false,

    kidFriendly9: false,
    kidFriendly10: false,
    kidFriendly11: false,
    kidFriendly12: false,
    kidFriendly13: false,
    kidFriendly14: false,
    kidFriendly15: false,
    kidFriendly16: false,

    rideOptions: [],

    ride9: [],
    ride10: [],
    ride11: [],
    ride12: [],
    ride13: [],
    ride14: [],
    ride15: [],
    ride16: [],

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

  onNextClick = (e) => {
    const { history } = this.props;
    history.push("/buyride3");
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
        ride9: res.data[8],
        ride10: res.data[9],
        ride11: res.data[10],
        ride12: res.data[11],
        ride13: res.data[12],
        ride14: res.data[13],
        ride15: res.data[14],
        ride16: res.data[15],

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
      kidFriendly9,
      ride9,
      kidFriendly10,
      ride10,
      kidFriendly11,
      ride11,
      kidFriendly12,
      ride12,
      kidFriendly13,
      ride13,
      kidFriendly14,
      ride14,
      kidFriendly15,
      ride15,
      kidFriendly16,
      ride16,
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
                  name={ride9.description}
                  value={ride9.price}
                  time={ride9.ride_length}
                  purchased={this.state.ride9Purchased}
                  stateVar="kidFriendly9"
                  checked={kidFriendly9}
                  onClick={this.handleClick}
                  onChange={this.handleCheckBoxChange}
                  id={ride9.ride_id}
                ></Ride>
                <Ride
                  name={ride10.description}
                  value={ride10.price}
                  time={ride10.ride_length}
                  purchased={this.state.ride10Purchased}
                  stateVar="kidFriendly10"
                  checked={kidFriendly10}
                  onClick={this.handleClick}
                  onChange={this.handleCheckBoxChange}
                  id={ride10.ride_id}
                ></Ride>
                <Ride
                  name={ride11.description}
                  value={ride11.price}
                  time={ride11.ride_length}
                  purchased={this.state.ride11Purchased}
                  stateVar="kidFriendly11"
                  checked={kidFriendly11}
                  onClick={this.handleClick}
                  onChange={this.handleCheckBoxChange}
                  id={ride11.ride_id}
                ></Ride>
                <Ride
                  name={ride12.description}
                  value={ride12.price}
                  time={ride12.ride_length}
                  purchased={this.state.ride12Purchased}
                  stateVar="kidFriendly12"
                  checked={kidFriendly12}
                  onClick={this.handleClick}
                  onChange={this.handleCheckBoxChange}
                  id={ride12.ride_id}
                ></Ride>
                <Ride
                  name={ride13.description}
                  value={ride13.price}
                  time={ride13.ride_length}
                  purchased={this.state.ride13Purchased}
                  stateVar="kidFriendly13"
                  checked={kidFriendly13}
                  onClick={this.handleClick}
                  onChange={this.handleCheckBoxChange}
                  id={ride13.ride_id}
                ></Ride>
                <Ride
                  name={ride14.description}
                  value={ride14.price}
                  time={ride14.ride_length}
                  purchased={this.state.ride14Purchased}
                  stateVar="kidFriendly14"
                  checked={kidFriendly14}
                  onClick={this.handleClick}
                  onChange={this.handleCheckBoxChange}
                  id={ride14.ride_id}
                ></Ride>
                <Ride
                  name={ride15.description}
                  value={ride15.price}
                  time={ride15.ride_length}
                  purchased={this.state.ride15Purchased}
                  stateVar="kidFriendly15"
                  checked={kidFriendly15}
                  onClick={this.handleClick}
                  onChange={this.handleCheckBoxChange}
                  id={ride15.ride_id}
                ></Ride>
                <Ride
                  name={ride16.description}
                  value={ride16.price}
                  time={ride16.ride_length}
                  purchased={this.state.ride16Purchased}
                  stateVar="kidFriendly16"
                  checked={kidFriendly16}
                  onClick={this.handleClick}
                  onChange={this.handleCheckBoxChange}
                  id={ride16.ride_id}
                ></Ride>
              </div>
              <br></br>
              <button
                onClick={this.onBackClick}
                class="btn btn-primary leftButton"
              >
                Back Page
              </button>
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

export default BuyRides2;
