import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';
import { isNonEmptyString } from 'ramda-adjunct';
import styled from 'styled-components';

const Styles = styled.div`
  display: flex;
  justify-content: space-between;
  .error {
    color: red;
    display: block;
  }
  .question {
    margin-bottom: 1rem;
    .questionName {
      font-weight: 700;
    }
  }
  button {
    background-color: rgb(0, 173, 34);
    padding: 15px 30px;
    border-radius: 7px;
    border: none;
    color: white;
    margin-top: 20px;
    width: fit-content;
    align-self: end;
  }
  input {
    border-radius: 7px;
    padding: 10px;
    border: 2px solid grey;
    margin-top: 7px;
    width: 230px;
  }
  h3 {
    color: rgb(0, 119, 184);
  }
`;

function Form({ sendformToParent }) {
  const [errors, setErrors] = useState(false);
  const [formData, setFormData] = useState({
    productName: '',
    payment: 'not specified',
    market: 'no',
  });

  const paymentChange = (event) => {
    setFormData({
      ...formData,
      payment: event.target.defaultValue,
    });
  };

  const marketChange = (event) => {
    setFormData({
      ...formData,
      market: event.target.checked ? 'yes' : 'no',
    });
  };

  const handleNameChange = (event) => {
    setFormData({
      ...formData,
      productName: event,
    });
  };

  const validate = () =>
    isNonEmptyString(formData.productName) ? true : false;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      sendformToParent(formData);
      setErrors(false);
    } else {
      setErrors(true);
    }
  };

  return (
    <Styles>
      <form>
        <h3>Add product</h3>
        <section className="question">
          {errors && <span className="error">Required</span>}
          <span className="questionName">Product name *</span>
          <div>
            <input
              value={formData.productName}
              onChange={(e) => handleNameChange(e.target.value)}
            />
          </div>
        </section>
        <section className="question">
          <span className="questionName">Payment</span>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            defaultValue={formData.payment}
            value={formData.payment}
            onChange={paymentChange}
          >
            <FormControlLabel
              value="paid"
              control={<Radio color="secondary" />}
              label="Paid"
            />
            <FormControlLabel
              value="unpaid"
              control={<Radio color="secondary" />}
              label="Unpaid"
            />
          </RadioGroup>
        </section>
        <section className="question">
          <span className="questionName">Market</span>
          <Checkbox
            checked={formData.market === 'yes'}
            onChange={marketChange}
          />
        </section>
        <button onClick={(e) => handleSubmit(e)}>Submit</button>
      </form>
    </Styles>
  );
}
export default Form;
