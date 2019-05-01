import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from 'reactstrap';
import { Loading } from './LoadingComponent';

function RenderBasicCard({ item }) {
  return (
    <Card>
      <CardImg src={item.image} alt={item.name} />
      <CardBody>
        <CardTitle>{item.name}</CardTitle>
        {item.designation ? (
          <CardSubtitle>{item.designation}</CardSubtitle>
        ) : null}
        <CardText>{item.description}</CardText>
      </CardBody>
    </Card>
  );
}

function RenderCard({ item, isLoading, errMsg }) {
  if (isLoading || !item) {
    return (
      <Card>
        <CardBody className="text-center">
          <Loading />
        </CardBody>
      </Card>
    );
  } else if (errMsg) {
    return (
      <Card>
        <CardBody className="text-center">
          <CardText>
            <h4>{errMsg}</h4>
          </CardText>
          >
        </CardBody>
      </Card>
    );
  } else {
    return <RenderBasicCard item={item} />;
  }
}

function Home(props) {
  return (
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.dish}
            isLoading={props.dishLoading}
            errMsg={props.dishErrMsg}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.promotion}
            isLoading={props.promoLoading}
            errMsg={props.promoErrMsg}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.leader}
            isLoading={props.leaderLoading}
            errMsg={props.leaderErrMsg}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
