import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Badge, Button, Card, CardImg, CardBlock, CardTitle, CardSubtitle, CardText } from 'reactstrap';


export default class Product extends Component {
  
  constructor(props) {
    super(props);
  }

  static propTypes = {
    products: PropTypes.object,
    cart: PropTypes.array,
    addToCart: PropTypes.func,
  }

  render() {
    const {products, cart, addToCart} = this.props;
    return (
      <Card>
        <CardImg width="100%" height="250px" src={products.img} alt="Card image cap" />
        <CardBlock>
          <CardTitle>{products.title}</CardTitle>
          <CardSubtitle>
            <h4>
              {
                products.discount
                ? <Badge color="danger">特價:{products.price}</Badge>
                : <Badge color="success">售價:{products.price}</Badge>
              }
            </h4>
          </CardSubtitle>
          <CardText>{products.desc}</CardText>
          <Button color="warning" disabled={cart.find(item => item.id === products.id)} onClick={() => addToCart(products)}>
                  購買
          </Button>
        </CardBlock>
      </Card>
    );
  }
}
