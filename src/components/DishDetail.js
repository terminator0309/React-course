import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  BreadcrumbItem,
  Breadcrumb,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Label,
  Button,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./Loading";

function RenderDish({ dish }) {
  if (dish != null)
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  else return <div></div>;
}

const minLength = (len) => (val) => val && val.length > len;
const maxLength = (len) => (val) => !val || val.length <= len;
const required = (val) => val && val.length;

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCommentFormOpen: false,
    };
    this.toggleCommentForm = this.toggleCommentForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleCommentForm() {
    this.setState({ isCommentFormOpen: !this.state.isCommentFormOpen });
  }

  handleSubmit(values) {
    this.toggleCommentForm();
    this.props.addComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
  }

  render() {
    return (
      <>
        <Button outline onClick={this.toggleCommentForm}>
          <span className="fa fa-pencil-square-o"></span>
          Submit Comment
        </Button>
        <Modal
          isOpen={this.state.isCommentFormOpen}
          toggle={this.toggleCommentForm}
        >
          <ModalHeader toggle={this.toggleCommentForm}>
            Submit Comment
          </ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={10}>
                  Rating
                </Label>
                <Col md={12}>
                  <Control.select
                    model=".rating"
                    name="rating"
                    className="form-control"
                    validators={{ required }}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                  <Errors
                    className="text-danger"
                    model=".rating"
                    show="touched"
                    messages={{
                      required: "Required Field",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author" md={10}>
                  Your Name
                </Label>
                <Col md={12}>
                  <Control.text
                    model=".author"
                    name="author"
                    className="form-control"
                    placeholder="Your Name"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required Field",
                      minLength: "Must be greater than 3 characters",
                      maxLength: "Must be less than 15 characters",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment" md={10}>
                  Comment
                </Label>
                <Col md={12}>
                  <Control.textarea
                    model=".comment"
                    name="comment"
                    className="form-control"
                    placeholder="Your comment here"
                    row="12"
                    validators={{ required }}
                  />
                  <Errors
                    className="text-danger"
                    model=".comment"
                    show="touched"
                    messages={{
                      required: "Required Field",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

function RenderComments({ comments, addComment, dishId }) {
  if (comments != null) {
    const commentsList = comments.map((comment) => {
      return (
        <div key={comment.id} className="col-12">
          <p>{comment.comment}</p>
          <p>
            -- {comment.author},{" "}
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }).format(new Date(Date.parse(comment.date)))}
          </p>
        </div>
      );
    });
    return (
      <div className="m-1">
        <h4>Comments</h4>
        {commentsList}
        <CommentForm addComment={addComment} dishId={dishId} />
      </div>
    );
  } else return <div></div>;
}

const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null)
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
          <RenderDish dish={props.dish} />
          <RenderComments
            comments={props.comments}
            addComment={props.addComment}
            dishId={props.dish.id}
          />
        </div>
      </div>
    );
  else return <div></div>;
};

export default DishDetail;
