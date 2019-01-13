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

class ProductSpreadChart extends React.Component {
  state = {
    value: 0
  };
  render() {
    const { classes } = this.props;
    return (
      <Card chart>
        <Query
          query={gql`
            {
              policies {
                product {
                  name
                }
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

            const productCounts = _.countBy(data.policies, "product.name");
            const labels = Object.keys(productCounts).sort();
            const series = labels.sort().map(product => productCounts[product]);
            const chartData = {
              labels,
              series
            };

            const options = {};
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
            return (
              <div>
                <CardHeader color="danger">
                  <ChartistGraph
                    className="ct-chart"
                    data={chartData}
                    options={options}
                    type="Pie"
                    responsiveOptions={responsiveOptions}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Product spread</h4>
                  <p className={classes.cardCategory}>
                    Breakdown of all policy products.
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

ProductSpreadChart.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(ProductSpreadChart);
