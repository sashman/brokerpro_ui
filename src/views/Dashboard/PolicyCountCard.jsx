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
                  policyCount {
                    total
                    long_term
                  }
                }
              `}
            >
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;

                const {policyCount: {total, long_term}} = data;

                return (
                  <div>
                    <CardHeader color="warning" stats icon>
                      <CardIcon color="warning">
                        <Icon>content_copy</Icon>
                      </CardIcon>
                      <p className={classes.cardCategory}>Policies</p>
                      <h3 className={classes.cardTitle}>{total}</h3>
                    </CardHeader>
                    <CardFooter stats>
                      <div className={classes.stats}>
                          {long_term} long term agreements
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
