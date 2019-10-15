import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      balance: '0',
      rate: '0.01',
      term: 15, 
      payment: '0'
    };
    this.handleBalance = this.handleBalance.bind(this);
    this.handleRate = this.handleRate.bind(this);
    this.handleTerm = this.handleTerm.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  handleBalance(event) {
    this.setState({ balance: event.target.value });
  }

  handleRate(event) {
    this.setState({ rate: event.target.value });
  }

  handleTerm(event) {
    this.setState({ term: event.target.value });
  }

  calculate(event) {
    event.preventDefault();
    const balance = this.state.balance;
    const rate = this.state.rate;
    const term = this.state.term;

    const monthlyIntRate = rate / 100 / 12;
    const totalMonths = term * 12;
    const numerator = monthlyIntRate * Math.pow(1 + monthlyIntRate, totalMonths);
    const denominator = Math.pow(1 + monthlyIntRate, totalMonths) - 1;
    const total = balance * (numerator / denominator);
    const result = total.toFixed(2);
    const payment = `${result}`;
    

    this.setState({ payment });
  }

  render() {

    
    return (
      
      <div className='container'>
        <div className='col-md-offset-2 col-md-10'>
          <h3>Mortgage Calculator</h3>
        </div>

          {/* balance */}
        <form className='form-horizontal' onSubmit={ this.calculate }>
          <div className='form-group'>
            <label htmlFor='balance' className='col-sm-2 control-label'>
              <strong>Loan Balance</strong>
            </label>
            <div className='col-sm-10'>
              <input
                type='number'
                className='form-control'
                name='balance'
                placeholder='Enter amount'
                value={ this.state.balance }
                onChange={ this.handleBalance }
              />
            </div>
          </div>

            {/* rate */}
          <div className='form-group'>
            <label htmlFor='rate' className='col-sm-2 control-label'>
              <strong>Rate %</strong>
            </label>
            <div className='col-sm-10'>
              <input
                type='number'
                className='form-control'
                name='rate'
                step='0.01'
                placeholder='Enter amount'
                value={ this.state.rate }
                onChange={ this.handleRate }
              />
            </div>
          </div>

            {/* term */}
          <div className='form-group'>
            <label htmlFor='term' className='col-sm-2 control-label'>
              <strong>Term</strong>
            </label>
            <div className='col-sm-10'>
              <select
                name='term'
                type='number'
                className='form-control'
                value={ this.state.term }
                onChange={ this.handleTerm }
              >
                <option value='15'>15 years</option>
                <option value='30'>30 years</option>
              </select>
            </div>
          </div>

            {/* submit */}
          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-10'>
              <button type='submit' name='submit' className='btn btn-primary'>
                Submit
              </button>
            </div>
            <h3 name='output' id='output'>
              <p>{this.state.payment}</p>
            </h3>
          </div>
        </form>
      </div>
    );
  }
}
