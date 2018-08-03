import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {Container, Row, Col, Jumbotron, Button,
        Modal, ModalHeader, ModalBody, ModalFooter, Table, Alert
       } from "reactstrap";
import AlbumJson from "../containers/Album.json";
import Product from "../containers/Product.js";
import Cart from "../containers/Cart.js";

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      ablum: AlbumJson,
      modal: false,
      cart: [],
    };
  }

  // 購物車介面開關
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  // 購物車函式
  addToCart = (product) => {
    const carts = this.state.cart;
    carts.push(product);
    this.setState({cart: carts});
  }

  // 刪除購物車物品
  deleteCartItem = (index) => {
    const carts = this.state.cart;
    carts.splice(index, 1);
    this.setState({cart: carts}); 
  }

  // 購物車結帳
  checkCart = (totalPrice) => {
    this.toggle();
    alert(`結帳成功 ${totalPrice}`);  
  }

  render() {
    // 產品陣列列表
    const albums = this.state.ablum;
    // 計算購買總金額
    const totalPrice = this.state.cart.reduce((acc,item) => (acc += item.price),0);
    return (
      <div className="content">
        <Container>
          <Row>
            <Col md={12}>
              <Jumbotron>
                <h1 className="display-3">Mushroom's Shop</h1>
                <p className="lead">在不同城市中，找到的同一種生活</p>
                <hr className="my-2"/>
                <p className="lead">
                  <Button color="primary" onClick={this.toggle}>
                    購物車 ({this.state.cart.length})
                  </Button>
                </p>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            {
              albums.map(product => (
                <Col sm={6} md={4} className="md-3">
                  <Product
                    products={product}
                    cart={this.state.cart}
                    addToCart={this.addToCart}
                  />
                </Col>
              ))
            }
          </Row>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>購物車</ModalHeader>
            <ModalBody>
              <Cart
                cart={this.state.cart}
                deleteCartItem={this.deleteCartItem}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" 
                      disabled={this.state.cart.length === 0} 
                      onClick={() => this.checkCart(totalPrice)}
                      >
                結帳
              </Button>
              <Button color="secondary" onClick={this.toggle}>取消</Button>
            </ModalFooter>
          </Modal>
        </Container>
      </div>
    );
  }
}
