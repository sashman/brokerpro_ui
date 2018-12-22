import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import moment from "moment";
import _ from "lodash";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import ChartistGraph from "react-chartist";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

const delays2 = 80,
  durations2 = 500;

class PolicyRenewalsChart extends React.Component {
  state = {
    value: 0
  };
  render() {
    const { classes } = this.props;
    return (
      <Card chart>
        <Query
          query={gql`
            query PoliciesByRenewal($from: DateTime, $to: DateTime) {
              policiesByRenewal(from: $from, to: $to) {
                renewal_date
              }
            }
          `}
          variables={{
            from: moment(),
            to: moment().add(1, "year")
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            const renewalCounts = _.countBy(
              data.policiesByRenewal.map(({ renewal_date }) => renewal_date)
            );
            const labels = Object.keys(renewalCounts).map(renewalDate =>
              moment(renewalDate).format("L")
            );
            const series = [
              Object.keys(renewalCounts).map(
                renewalDate => renewalCounts[renewalDate]
              )
            ];
            const chartData = {
              labels,
              series
            };

            const options = {
              axisX: {
                showGrid: false
              },
              low: 0,
              high: 5,
              chartPadding: {
                top: 0,
                right: 5,
                bottom: 0,
                left: 0
              }
            };
            const responsiveOptions = [
              [
                "screen and (max-width: 640px)",
                {
                  seriesBarDistance: 5,
                  axisX: {
                    labelInterpolationFnc: function(value) {
                      return value[0];
                    }
                  }
                }
              ]
            ];
            const animation = {
              draw: function(data) {
                if (data.type === "bar") {
                  data.element.animate({
                    opacity: {
                      begin: (data.index + 1) * delays2,
                      dur: durations2,
                      from: 0,
                      to: 1,
                      easing: "ease"
                    }
                  });
                }
              }
            };
            return (
              <div>
                <CardHeader color="warning">
                  <ChartistGraph
                    className="ct-chart"
                    data={chartData}
                    type="Bar"
                    options={options}
                    responsiveOptions={responsiveOptions}
                    listener={animation}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Upcoming renewals</h4>
                  <p className={classes.cardCategory}>
                    Number of policies to be renewed in the coming year
                  </p>
                </CardBody>
              </div>
            );
          }}
        </Query>
      </Card>
    );
  }
}

PolicyRenewalsChart.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(PolicyRenewalsChart);
