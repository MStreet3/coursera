import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
import { Dishdetail } from './DishdetailComponent';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDish: null
    };

    this.onDishSelect = this.onDishSelect.bind(this);
    this.renderDish = this.renderDish.bind(this);
  }

  onDishSelect(dish) {
    this.setState({
      selectedDish: dish
    });
  }

  renderDish(dish) {
    if (dish != null) {
      return <Dishdetail dish={dish} />;
    } else {
      return <div />;
    }
  }

  render() {
    const menu = this.props.dishes.map((dish) => {
      // put each dish into a standard display div
      return (
        <div className="col-12 col-md-5 m-1">
          <Card key={dish.id} onClick={() => this.onDishSelect(dish)}>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardImgOverlay>
              <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      );
    });

    return (
      <div className="container">
        {/* top row is the menu */}
        <div className="row">{menu}</div>
        {/* second row is the selected dish */}
        {this.renderDish(this.state.selectedDish)}
      </div>
    );
  }
}

export default Menu;
