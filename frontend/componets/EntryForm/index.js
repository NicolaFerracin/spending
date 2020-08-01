import { Component } from 'react';
import { formatDateForInput } from '../../utils';
import styles from './styles.module.scss';
import SpendingContext from '../context';

export default class EntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      id: props.id,
      name: props.name || '',
      amount: props.amount || '',
      paymentMethod: props.paymentMethod || '',
      category: props.category || '',
      date: props.date || formatDateForInput()
    };
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async (e, cookie) => {
    e.preventDefault();
    this.setState({ isPosting: true });
    const { status } = await this.props.handleSubmit(cookie, this.state);

    if (status === 200) {
      window.location = '/';
    } else {
      this.setState({ alert: 'Something went wrong, please retry.', isPosting: false });
    }
  };

  render() {
    const { isPosting, name, amount, paymentMethod, category, date, alert } = this.state;

    return (
      <SpendingContext.Consumer>
        {({ paymentMethods, categories, cookie }) => (
          <>
            <h1>New Entry</h1>
            {alert && <h2>{alert}</h2>}
            <form onSubmit={e => this.handleSubmit(e, cookie)} disabled className={styles.form}>
              <div className={styles.formControl}>
                <label>
                  Name
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={this.handleChange}
                    required
                  />
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
                <button type="submit" disabled={isPosting}>
                  Add Entry
                </button>
              </div>
            </form>
          </>
        )}
      </SpendingContext.Consumer>
    );
  }
}