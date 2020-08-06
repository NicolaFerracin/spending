import { Component } from 'react';
import { capitalize } from '../../utils';
import Button from '../Button';
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

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ isPosting: true });
    const { status } = await this.props.handleSubmit(this.state.name);

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
      <>
        <h1>New {capitalize(page)}</h1>
        {alert && <h2>{alert}</h2>}
        <form onSubmit={this.handleSubmit} disabled className={styles.form}>
          <div className={styles.formControl}>
            <label>
              Name
              <input type="text" name="name" value={name} onChange={this.handleChange} required />
            </label>
          </div>
          <div className={styles.buttonWrapper}>
            {/* TODO receive page title */}
            <Button type="submit" isDisabled={isPosting}>
              Add {page}
            </Button>
          </div>
        </form>
      </>
    );
  }
}

export default CategoryPaymentMethodForm;
