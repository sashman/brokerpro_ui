import React from "react";
// @material-ui/core
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import PolicyCountCard from "./PolicyCountCard.jsx"
import PolicyPremiumCard from "./PolicyPremiumCard.jsx"
import PolicyRenewalsChart from "./PolicyRenewalsChart.jsx"

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Dashboard extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <PolicyCountCard/>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <PolicyPremiumCard/>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <PolicyRenewalsChart/>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
