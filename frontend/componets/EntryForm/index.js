import { Component } from 'react';
import { formatDateForInput } from '../../utils';
import Button from '../Button';
import SpendingContext from '../context';
import styles from './styles.module.scss';

export default class EntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      id: props.id,
      name: props.name || '',
      amount: props.amount || '',
      paymentMethod: props.paymentMethod?._id || '',
      category: props.category?._id || '',
      date: formatDateForInput(props.date ? new Date(props.date) : new Date())
    };
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ isPosting: true });
    const { status } = await this.props.handleSubmit(this.state);

    if (status === 200) {
      window.location = '/entries';
    } else {
      this.setState({ alert: 'Something went wrong, please retry.', isPosting: false });
    }
  };

  render() {
    const { paymentMethods, categories } = this.props;
    const { isPosting, name, amount, paymentMethod, category, date, alert } = this.state;

    return (
      <>
        {alert && <h2>{alert}</h2>}
        <form onSubmit={e => this.handleSubmit(e)} disabled className={styles.form}>
          <div className={styles.formControl}>
            <label>
              Name
              <input type="text" name="name" value={name} onChange={this.handleChange} required />
            </label>
          </div>
          <div className={styles.formControl}>
            <label>
              Amount
              <input
                type="number"
                name="amount"
                value={amount}
                onChange={this.handleChange}
                required
              />
            </label>
          </div>
          <div className={styles.formControl}>
            <label>
              Payment Method
              <select
                name="paymentMethod"
                value={paymentMethod}
                onChange={this.handleChange}
                required
              >
                <option value=""></option>
                {paymentMethods.map(({ _id, name }) => (
                  <option key={_id} value={_id}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className={styles.formControl}>
            <label>
              Category
              <select name="category" value={category} onChange={this.handleChange} required>
                <option value=""></option>
                {categories.map(({ _id, name }) => (
                  <option key={_id} value={_id}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className={styles.formControl}>
            <label>
              <input type="date" name="date" value={date} onChange={this.handleChange} />
            </label>
          </div>
          <div className={styles.buttonWrapper}>
            {/* TODO: make button text dynamic */}
            <Button type="submit" isDisabled={isPosting}>
              Add Entry
            </Button>
          </div>
        </form>
      </>
    );
  }
}
