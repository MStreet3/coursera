import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import About, { LeaderDetail } from './AboutComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  };
};

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.filter((dish) => dish.featured)[0]}
          promotion={
            this.props.promotions.filter((promotion) => promotion.featured)[0]
          }
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };

    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.props.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          comments={this.props.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
        />
      );
    };

    const LeaderPage = ({ match }) => {
      return (
        <LeaderDetail
          leader={
            this.props.leaders.filter(
              (leader) => leader.id === parseInt(match.params.leaderId, 10)
            )[0]
          }
        />
      );
    };

    const MenuPage = () => {
      return <Menu dishes={this.props.dishes} />;
    };

    const AboutPage = () => {
      return <About leaders={this.props.leaders} />;
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={MenuPage} />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route path="/about/leader/:leaderId" component={LeaderPage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/contact" component={Contact} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
