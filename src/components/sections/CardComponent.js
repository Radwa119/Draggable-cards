import React, { Component } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag, generateItems } from './utils';
import { Row, Col, Form, Button } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';

const columnNames = ['New', 'Stage', 'Won'];

class CardComponent extends Component {
  constructor() {
    super();

    this.onColumnDrop = this.onColumnDrop.bind(this);
    this.onCardDrop = this.onCardDrop.bind(this);
    this.getCardPayload = this.getCardPayload.bind(this);
    this.state = {
      scene: {
        type: 'container',
        props: {
          orientation: 'horizontal',
        },
        children: generateItems(3, (i) => ({
          id: `column${i}`,
          type: 'container',
          name: columnNames[i],
          props: {
            orientation: 'vertical',
            className: 'card-container',
          },
          children: generateItems(7, (j) => ({
            type: 'draggable',
            id: `${i}${j}`,
            props: {
              className: 'card',
            },
          })),
        })),
      },
    };
  }
  
  render() {
    const starsprop = {
      size: 15,
      count: 5,
      color: 'black',
      activeColor: '#ffdb00',
      value: 7.5,
      a11y: true,
      isHalf: true,
      emptyIcon: <i className="far fa-star" />,
      halfIcon: <i className="fa fa-star-half-alt" />,
      filledIcon: <i className="fa fa-star" />,
      onChange: (newValue) => {
        // console.log(`stars rating: new value is ${newValue}`);
        this.setState({ numOfStars: newValue });
      },
    };
    return (
      <div className="card-scene">
        <Container
          orientation="horizontal"
          onDrop={this.onColumnDrop}
          dragHandleSelector=".column-drag-handle"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'Component-drop-preview',
          }}
        >
          {this.state.scene.children.map((column) => {
            return (
              <Draggable key={column.id}>
                <div className={column.props.className}>
                  <div className="card-column-header">
                    <i class="fas fa-trash px-2"></i> {column.name}
                  </div>
                  <Container
                    {...column.props}
                    groupName="col"
                    // onDragStart={(e) => console.log('drag started', e)}
                    onDragEnd={(e) => console.log('drag end', e)}
                    onDrop={(e) => this.onCardDrop(column.id, e)}
                    getChildPayload={(index) =>
                      this.getCardPayload(column.id, index)
                    }
                    dragClass="card-ghost"
                    dropClass="card-ghost-drop"
                    onDragEnter={() => {
                      console.log('drag enter:', column.id);
                    }}
                    onDragLeave={() => {
                      console.log(`drag leave:${column.id}`);
                    }}
                    // onDropReady={(p) => console.log('Drop ready: ', p)}
                    dropPlaceholder={{
                      animationDuration: 150,
                      showOnTop: true,
                      className: 'drop-preview',
                    }}
                    dropPlaceholderAnimationDuration={200}
                  >
                    {column.children.map((card) => {
                      return (
                        <Draggable key={card.id}>
                          <div {...card.props}>
                            {/* <p>{card.data}</p> */}
                            <div class="cardd">
                              <div class="container">
                                <Row
                                  style={{
                                    backgroundColor: '#e4f5e0',
                                    borderRadius: '20px 21px 0% 0%',
                                  }}
                                >
                                  <Col className="pt-1" sm={6}>
                                    <h4>
                                      <b>Name</b>
                                    </h4>
                                  </Col>
                                  <Col
                                    className="pt-1"
                                    style={{
                                      textAlign: 'end',
                                      color: ' #12b4e0',
                                    }}
                                    sm={6}
                                  >
                                    <i class="fas fa-trash"></i>
                                  </Col>
                                </Row>
                                <Row>
                                  {' '}
                                  <Col sm={12} md={6}>
                                    {' '}
                                    <label className="pr-4 checkLabel">
                                      {' '}
                                      Company
                                      <input
                                        type="checkbox"
                                        value="company"
                                        className="ml-2"
                                        style={{ fontSize: '12px' }}
                                        onChange={this.handleOptionChange}
                                        checked={
                                          this.state.option === 'company'
                                        }
                                      />{' '}
                                    </label>
                                  </Col>
                                  <Col sm={12} md={6}>
                                    <label className="checkLabel">
                                      {' '}
                                      Individual
                                      <input
                                        type="checkbox"
                                        value="Individual"
                                        className="ml-2"
                                        onChange={this.handleOptionChange}
                                        checked={
                                          this.state.option === 'Individual'
                                        }
                                      />
                                    </label>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col sm={12} md={9}>
                                    <Form.Control
                                      noValidate
                                      required
                                      type="text"
                                      onChange={this.handleName}
                                      value={this.state.name}
                                      name="name"
                                      className="formField"
                                      placeholder="Name"
                                    />
                                  </Col>
                                  <Col className="mt-3" sm={12} md={3}>
                                    <i class="fas fa-eye pr-2"></i>
                                    <i class="fas fa-plus-circle"></i>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col sm={12} md={9}>
                                    <Form.Control
                                      noValidate
                                      required
                                      type="text"
                                      onChange={this.handleProduct}
                                      value={this.state.product}
                                      name="name"
                                      className="formField"
                                      placeholder="Product"
                                    />
                                  </Col>
                                  <Col className="mt-3" sm={12} md={3}>
                                    <i class="fas fa-eye pr-2"></i>
                                    <i class="fas fa-plus-circle"></i>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col sm={12} md={9}>
                                    <Form.Control
                                      noValidate
                                      required
                                      type="text"
                                      onChange={this.handleRev}
                                      value={this.state.revenue}
                                      name="rev"
                                      className="formField"
                                      placeholder="Revenue"
                                    />
                                  </Col>
                                </Row>
                                <p className="mt-2">Priority</p>
                                <Row>
                                  <Col sm={6}>
                                    {' '}
                                    <ReactStars {...starsprop} />
                                  </Col>
                                  <Col className="mb-3" sm={6}>
                                    <Button>Create</Button>
                                  </Col>
                                </Row>
                              </div>
                            </div>
                          </div>
                        </Draggable>
                      );
                    })}
                  </Container>
                </div>
              </Draggable>
            );
          })}
        </Container>
      </div>
    );
  }

  getCardPayload(columnId, index) {
    return this.state.scene.children.filter((p) => p.id === columnId)[0]
      .children[index];
  }

  onColumnDrop(dropResult) {
    const scene = Object.assign({}, this.state.scene);
    scene.children = applyDrag(scene.children, dropResult);
    this.setState({
      scene,
    });
  }

  onCardDrop(columnId, dropResult) {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      const scene = Object.assign({}, this.state.scene);
      const column = scene.children.filter((p) => p.id === columnId)[0];
      const columnIndex = scene.children.indexOf(column);

      const newColumn = Object.assign({}, column);
      newColumn.children = applyDrag(newColumn.children, dropResult);
      scene.children.splice(columnIndex, 1, newColumn);

      this.setState({
        scene,
      });
    }
  }
}

export default CardComponent;
