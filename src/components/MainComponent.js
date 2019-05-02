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
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  postComment,
  fetchDishes,
  fetchComments,
  fetchLeaders,
  fetchPromos
} from '../redux/ActionCreators';

const mapStateToProps = (state) => {
  return {
    isLoadingDishes: state.dishes.isLoading,
    errWithDishes: state.dishes.errMsg,
    dishes: state.dishes.dishes,
    comments: state.comments.comments,
    errWithComments: state.comments.errMsg,
    promotions: state.promotions.promotions,
    isLoadingPromos: state.promotions.isLoading,
    errWithPromos: state.promotions.errMsg,
    leaders: state.leaders.leaders,
    isLoadingLeaders: state.leaders.isLoading,
    errWithLeaders: state.leaders.errMsg
  };
};

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders())
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.filter((dish) => dish.featured)[0]}
          dishLoading={this.props.isLoadingDishes}
          dishErrMsg={this.props.errWithDishes}
          promotion={
            this.props.promotions.filter((promotion) => promotion.featured)[0]
          }
          promoLoading={this.props.isLoadingPromos}
          promoErrMsg={this.props.errWithPromos}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          leaderLoading={this.props.isLoadingLeaders}
          leaderErrMsg={this.props.errWithLeaders}
        />
      );
    };

    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.props.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId)
            )[0]
          }
          isLoading={this.props.isLoadingDishes}
          errMsg={this.props.errWithDishes}
          comments={this.props.comments}
          commentsErrMsg={this.props.errWithComments}
          addComment={this.props.addComment}
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
      return (
        <Menu
          dishes={this.props.dishes}
          isLoading={this.props.isLoadingDishes}
          errMsg={this.props.errWithDishes}
        />
      );
    };

    const AboutPage = () => {
      return <About leaders={this.props.leaders} />;
    };

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            timeout={300}
            classNames="page"
          >
            <div className="WRAPPER">
              <Switch location={this.props.location}>
                <Route path="/home" component={HomePage} />
                <Route exact path="/menu" component={MenuPage} />
                <Route path="/menu/:dishId" component={DishWithId} />
                <Route path="/about/leader/:leaderId" component={LeaderPage} />
                <Route exact path="/about" component={AboutPage} />
                <Route exact path="/contact" component={Contact} />
                <Redirect to="/home" />
              </Switch>
            </div>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Main)
);
