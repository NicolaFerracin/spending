import { Component } from 'react';
import { capitalize } from '../../utils';
import SpendingContext from '../context';
import styles from './styles.module.scss';

class CategoryPaymentMethodForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      id: props.id,
      name: props.name || ''
    };
  }

  handleChange = e => this.setState({ name: e.target.value });

  handleSubmit = async (e, cookie) => {
    e.preventDefault();
    this.setState({ isPosting: true });
    const { status } = await this.props.handleSubmit(cookie, this.state.name);

    if (status === 200) {
      window.location = '/';
    } else {
      this.setState({ alert: 'Something went wrong, please retry.', isPosting: false });
    }
  };

  render() {
    const { isPosting, name, alert } = this.state;
    // TODO receive page title
    const { page } = this.props;

    return (
      <SpendingContext.Consumer>
        {({ cookie }) => (
          <>
            <h1>New {capitalize(page)}</h1>
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
              <div className={styles.buttonWrapper}>
                <button type="submit" disabled={isPosting}>
                  {/* TODO receive page title */}
                  Add {page}
                </button>
              </div>
            </form>
          </>
        )}
      </SpendingContext.Consumer>
    );
  }
}

export default CategoryPaymentMethodForm;
