import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
import { Dishdetail } from './DishdetailComponent';

class Menu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const menu = this.props.dishes.map((dish) => {
      // put each dish into a standard display div
      return (
        <div className="col-12 col-md-5 m-1">
          <Card key={dish.id} onClick={() => this.props.onClick(dish.id)}>
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
        <div className="row">{menu}</div>
      </div>
    );
  }
}

export default Menu;