import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Row,
  Col,
  Label,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';
import { Loading } from './LoadingComponent';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import moment from 'moment';

function required(val) {
  return val && val.length;
}

function maxLength(len) {
  return function(val) {
    return !val || val.length <= len;
  };
}

function minLength(len) {
  return function(val) {
    return val && val.length >= len;
  };
}

function RenderDish({ dish }) {
  if (dish != null) {
    return (
      <Card key={`selected-${dish.id}`}>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle> {dish.name} </CardTitle>
          <CardText> {dish.description} </CardText>
        </CardBody>
      </Card>
    );
  } else {
    return <div />;
  }
}

function RenderComments({ comments, addComment, dishId, errMsg }) {
  if (comments != null) {
    if (comments.includes(undefined)) {
      return (
        <Card>
          <CardBody>
            <Loading />
            <CommentForm dishId={dishId} addComment={addComment} />
          </CardBody>
        </Card>
      );
    } else {
      return (
        <Card>
          <CardBody className="text-left">
            <CardTitle> Comments </CardTitle>
            {
              <ul className="list-unstyled">
                {comments
                  .filter((comment) => comment.dishId === dishId)
                  .map((comment) => {
                    return (
                      <li key={`comment-${comment.id}`}>
                        <p> {comment.comment} </p>
                        <p>
                          --- {comment.author},
                          {moment(comment.date).format('MMM. DD, YYYY')}
                        </p>
                      </li>
                    );
                  })}
              </ul>
            }
            <CommentForm dishId={dishId} addComment={addComment} />
          </CardBody>
        </Card>
      );
    }
  } else if (errMsg) {
    return (
      <CommentForm dishId={dishId} addComment={addComment} errMsg={errMsg} />
    );
  } else {
    return <CommentForm dishId={dishId} addComment={addComment} />;
  }
}

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalActive: false
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalActive: !this.state.isModalActive
    });
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.addComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.message
    );
  }

  render() {
    return (
      <div>
        <div> {this.props.errMsg ? <h4> {this.props.errMsg} </h4> : ''}</div>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-sign-in fa-lg" /> Leave a Comment
        </Button>
        <Modal isOpen={this.state.isModalActive} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit a Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={2}>
                  Rating
                </Label>
                <Col md={10}>
                  <Control.select
                    model=".rating"
                    id="rating"
                    name="rating"
                    validators={{
                      required
                    }}
                    defaultValue="3"
                  >
                    <option value="1"> 1 </option>
                    <option value="2"> 2 </option>
                    <option value="3"> 3 </option>
                    <option value="4"> 4 </option>
                    <option value="5"> 5 </option>
                  </Control.select>
                  <Errors
                    className="text-danger"
                    model=".rating"
                    show="touched"
                    messages={{
                      required: 'Required.'
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author" md={2}>
                  Your Name
                </Label>
                <Col md={10}>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less'
                    }}
                    wrapper={(props) => (
                      <ul className="list-unstyled text-danger">
                        {props.children}
                      </ul>
                    )}
                    component="li"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="message" md={2}>
                  Comment
                </Label>
                <Col md={10}>
                  <Control.textarea
                    model=".message"
                    id="message"
                    name="message"
                    rows="6"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col
                  md={{
                    size: 10,
                    offset: 2
                  }}
                >
                  <Button type="submit" color="primary">
                    Submit Comment
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function DishDetail(props) {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMsg) {
    return (
      <div className="container">
        <div className="row">
          <h4> {props.errMsg} </h4>
        </div>
      </div>
    );
  } else if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu"> Menu </Link>
            </BreadcrumbItem>
            <BreadcrumbItem active> {props.dish.name} </BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3> {props.dish.name} </h3> <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments
              comments={props.comments}
              addComment={props.addComment}
              dishId={props.dish.id}
              errMsg={props.commentsErrMsg}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default DishDetail;
