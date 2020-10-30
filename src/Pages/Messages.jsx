import React, { Component } from "react";
import Sidebar from "../Components/Sidebar";
import NavBar from "../Components/NavBar";
import UserContext from "../Context/UserContext";
import Message from "../Components/Message";
import { Box, Container, Grid } from "@material-ui/core";
import MessagesCheckBox from "../Components/MessagesCheckBox";

import http from "../APIServices/httpService";
import config from "../APIServices/config.json";
import { ToastContainer, toast } from "react-toastify";

class Messages extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      message: "",
      new_message: "",
      errors: {},
      team: [],

      yes: null,
      no: null,
    };
  }

  async componentDidMount() {
    http
      .get(config.apiEndpoint + "/team/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ team: res.data });
        this.context.currentUser.budget = res.data.budget; //updates the context
      });
    http
      .get(config.apiEndpoint + "/messages/" + this.context.currentUser.teamID)
      .then((res) => {
        this.setState({ message: res.data });
      });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    //this is where the post to database goes
    /*
    http
      .post(config.apiEndpoint + "/message/", {
        message: this.state.new_message,
        team_id: this.context.currentUser.teamID,
      })
      .then((res) => {
        console.log(res);
        toast.success(`Message Sent`);
      })
      .catch((err) => {
        toast.error(`Message could not be sent `);
      }); */
  };
  handleCheckBoxChange = (e) => {
    let state = e.currentTarget.attributes.stateVar.value; //this is the state var being changed by checking box
    this.setState((initialState) => ({
      [state]: !initialState[state],
    }));
  };

  handleChange = (e) => {
    this.setState({ new_message: e.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Box display="flex" id="wrapper">
          <Sidebar activePage="messages" />
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
                    Messages
                  </Box>
                </Grid>
              </Grid>
              <center>
                <form onSubmit={this.handleSubmit}>
                  <div class="form-group">
                    <br />
                    <Box class="center">
                      <Message description={this.state.message} />
                      <MessagesCheckBox
                        name="Yes"
                        checked={this.state.yes}
                        stateVar="yes"
                        onChange={this.handleCheckBoxChange}
                      />
                      <br />
                      <MessagesCheckBox
                        name="No"
                        checked={this.state.no}
                        stateVar="no"
                        onChange={this.handleCheckBoxChange}
                      />
                      <textarea
                        onChange={this.handleChange}
                        className="form-control"
                        rows="6"
                        cols="10"
                      ></textarea>
                    </Box>
                  </div>
                  <button
                    // disabled={!this.context.currentUser.isManager}
                    type="submit"
                    class="btn btn-primary"
                  >
                    Submit
                  </button>
                </form>
              </center>
            </Box>
          </Container>
        </Box>
      </React.Fragment>
    );
  }
}

export default Messages;
