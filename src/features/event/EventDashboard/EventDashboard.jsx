import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "../eventList/EventList";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { DeleteEvent } from "../EventAction";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventActivity from "../EventActivity/EventActivity";

const mapState = state => ({
  revents: state.firestore.ordered.revents,
  loading: state.async.loading
});
const actions = {
  DeleteEvent
};
class EventDashboard extends Component {
  handleDeleteEvent = eventId => () => {
    this.props.DeleteEvent(eventId);
  };

  render() {
    const { revents, loading } = this.props;
    if (loading) return <LoadingComponent inverted={true} />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList DeleteEvent={this.handleDeleteEvent} Events={revents} />
        </Grid.Column>

        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(
  mapState,
  actions
)(firestoreConnect([{ collection: "revents" }])(EventDashboard));
