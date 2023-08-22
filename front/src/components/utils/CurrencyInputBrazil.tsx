import React, { Component } from 'react';
import CurrencyInput from 'react-currency-input-field';

interface CurrencyInputBrazilProps {
  value: string;
  onChange: (value: string) => void;
}

class CurrencyInputBrazil extends Component<CurrencyInputBrazilProps> {
  render() {
    return (
      <div className="input-group mb-3">
        <span className="input-group-text">R$</span>
        <div className="form-floating">
          <CurrencyInput
            className="form-control"
            decimalsLimit={2}
            decimalSeparator=","
            groupSeparator="."
            value={this.props.value}
            onValueChange={(value) => {
              this.props.onChange(value ?? '');
            }}
            id="floatingInputGroup1"
          />
          <label htmlFor="floatingInputGroup1" className="form-label">Preço:</label>
        </div>
      </div>
    );
  }
}

export default CurrencyInputBrazil;
