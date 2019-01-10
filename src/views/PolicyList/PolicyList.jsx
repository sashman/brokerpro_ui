import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import TablePagination from '@material-ui/core/TablePagination';

import { currencyFormat } from "../../util/currency"
import moment from "moment";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class PolicyList extends React.Component {
  state = {
    page: 0,
    rowsPerPage: 5,
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render(){
    const { classes } = this.props;
    const { page, rowsPerPage } = this.state;

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Your policies</h4>
            </CardHeader>
            <CardBody>
              <Query
                query={gql`
                  {
                    policies {
                      customer {
                        customer_name
                      }
                      product {
                        name
                      }
                      policy_number
                      premium_pennies
                      renewal_date
                      start_date
                    }
                  }
                `}
              >
                {({ loading, error, data }) => {
                  if (loading) return <p>Loading...</p>;
                  if (error) return <p>Error :(</p>;

                  const policies = data.policies.map(
                    ({
                      customer: { customer_name },
                      product: { name },
                      policy_number,
                      start_date,
                      renewal_date,
                      premium_pennies
                        }) =>
                      [
                        customer_name,
                        name,
                        policy_number,
                        moment(start_date).format("L"),
                        moment(renewal_date).format("L"),
                        currencyFormat.format(premium_pennies)
                      ]
                  )
                  const paginatedPolicies = policies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

                  return (
                    <div>
                      <Table
                        tableHeaderColor="info"
                        tableHead={["Customer", "Product", "Number", "Start", "Renewal", "Premium"]}
                        tableData={paginatedPolicies}
                      />
                      <TablePagination
                        component="div"
                        count={policies.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                          'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                          'aria-label': 'Next Page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                      />
                    </div>);
                  }}
              </Query>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(PolicyList);
