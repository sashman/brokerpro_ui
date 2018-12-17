import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import gql from "graphql-tag";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons

// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

const currencyFormat = new Intl.NumberFormat('en-GB', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 0
})


class PolicyCountCard extends React.Component {
  state = {
    value: 0
  };
  render() {
    const { classes } = this.props;
    return (
      <Card>
            <Query
              query={gql`
                {
                  policyPremiumTotal {
                    total
                    long_term
                  }
                }
              `}
            >
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;

                const {policyPremiumTotal: {total, long_term}} = data;
                return (
                  <div>
                    <CardHeader color="success" stats icon>
                      <CardIcon color="success">
                        <Icon>attach_money</Icon>
                      </CardIcon>
                      <p className={classes.cardCategory}>Premium total</p>
                      <h3 className={classes.cardTitle}>{currencyFormat.format(total)}</h3>
                    </CardHeader>
                    <CardFooter stats>
                      <div className={classes.stats}>
                          {currencyFormat.format(long_term)} long term agreements
                      </div>
                    </CardFooter>
                  </div>
                );
              }}
            </Query>

      </Card>
    );
  }
}

PolicyCountCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(PolicyCountCard);
