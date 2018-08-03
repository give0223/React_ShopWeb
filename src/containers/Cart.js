import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Table, Alert, Button} from 'reactstrap';

export default class Cart extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    cart: PropTypes.array,
    deleteCartItem: PropTypes.func,
  }

  render() {
    const totalPrice = this.props.cart.reduce((acc, item) => (acc += item.price),0);
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>品項</th>
              <th>價格</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.cart.map((item, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>
                    <Button color="danger" onClick={() => this.props.deleteCartItem(index)}>X</Button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
        <Alert color="success" className="text-right">
          總價: {totalPrice}
        </Alert>
      </div>
    );
  }
}