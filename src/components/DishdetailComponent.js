import React from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Breadcrumb,
  BreadcrumbItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

function RenderDish({ dish }) {
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

function RenderComments({ comments }) {
  if (comments != null) {
    return (
      <Card key={`comments-selected-${comments.dishId}`}>
        <CardBody className="text-left">
          <CardTitle>Comments</CardTitle>
          <CardText>
            {comments.map((obj) => {
              return (
                <div>
                  <ul className="list-unstyled">
                    <li>{obj.comment}</li>
                    <li>
                      ---{obj.author},{' '}
                      {moment(obj.date).format('MMM. DD, YYYY')}
                    </li>
                  </ul>
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

const DishDetail = (props) => {
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={props.dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments comments={props.comments} />
        </div>
      </div>
    </div>
  );
};

export default DishDetail;
