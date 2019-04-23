import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';
import moment from 'moment';

function renderDish(dish) {
  if (dish != null) {
    return (
      <Card key={`selected-${dish.id}`}>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  } else {
    return <div />;
  }
}

function renderComments(dish) {
  if (dish != null) {
    return (
      <Card key={`comments-selected-${dish.id}`}>
        <CardBody className="text-left">
          <CardTitle>Comments</CardTitle>
          <CardText>
            {dish.comments.map((obj) => {
              return (
                <div>
                  <p>{obj.comment}</p>
                  <p>
                    ---{obj.author}, {moment(obj.date).format('MMM. DD, YYYY')}
                  </p>
                </div>
              );
            })}
          </CardText>
        </CardBody>
      </Card>
    );
  } else {
    return <div />;
  }
}

const Dishdetail = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-5 m-1">{renderDish(props.dish)}</div>
        <div className="col-12 col-md-5 m-1">{renderComments(props.dish)}</div>
      </div>
    </div>
  );
};

export default Dishdetail;
