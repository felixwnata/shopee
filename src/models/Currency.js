import React, { Component } from "react";
import "../CSS/currency.css";

class Currency extends Component {
  constructor(props) {
    super(props);
    this.myInput = React.createRef();

    this.state = {
      cur: [], //currency object
      error: "", //error flag
      curDesc: {
        IDR: "Indonesian Rupiah",
        USD: "United State Dollars",
        GBP: "British Pound",
        SGD: "Singapore Dollar",
        JPY: "Japanese Yen",
        EUR: "Euro"
      },
      children: [] //array menampung children
    };
  }

  componentDidMount() {
    const API = `https://exchangeratesapi.io/api/latest`;
    fetch(API)
      .then(res => res.json())
      .then(data => this.setState({ cur: data.rates }))
      .catch(err => this.setState({ error: err }));
  }

  // -----------------------------------------
  // -Fungsi mengecek currency yang sudah ada-
  // -----------------------------------------
  curExist(cur) {
    const length = this.state.children.length;
    let i = 0;
    let result = true;
    for (; i < length; ) {
      if (this.state.children[i].props.curCode !== cur) {
        i++;
      } else {
        result = false;
        break;
      }
    }
    return result;
  }

  // ----------------------------------------
  // --------Fungsi menambah currency--------
  // ----------------------------------------
  onAddChild = () => {
    try {
      const curCode = this.myInput.current.value;
      const curRate = this.state.cur[curCode];
      const curDesc = this.state.curDesc[curCode];
      const result = this.curExist(curCode);

      if (!curCode) alert("Please type the currency !");
      else if (result === false) alert("Currency already exist !");
      else if (curRate) {
        this.setState({
          children: this.state.children.concat(
            <ChildComponent
              key={curCode}
              index={curCode}
              deleteChild={this.onDeleteChild}
              curCode={curCode}
              curRate={curRate}
              curDesc={curDesc}
            />
          )
        });
      } else {
        alert("Currency doesn't exist");
      }
    } catch (e) {}
  };

  // ----------------------------------------
  // -------Fungsi menghapus currency--------
  // ----------------------------------------
  onDeleteChild = curCode => {
    let newArr = this.state.children.filter(arr => {
      return arr.key !== curCode.target.value;
    });

    this.setState({ children: newArr });
  };

  render() {
    return (
      <ParentComponent addChild={this.onAddChild} refInput={this.myInput}>
        {this.state.children}
      </ParentComponent>
    );
  }
}

const ParentComponent = props => (
  <div className="box">
    <div className="header">
      <p>
        <i>EUR - Euro</i>
        <br /> <br />
        <b>
          <span className="left">EUR</span>
          <span className="right">100</span>
          <br />
        </b>
      </p>
      <hr />
    </div>

    <div id="children-pane">{props.children}</div>
    <hr />
    <div className="footer">
      <input
        type="text"
        ref={props.refInput}
        placeholder="Add another currency"
      />
      <button onClick={props.addChild}>+</button>
    </div>
  </div>
);

const ChildComponent = props => (
  <div id={props.index} className="child">
    <div className="child_contain">
      <div className="child_left">
        <p>
          {props.curCode} &nbsp;&nbsp;&nbsp; {props.curRate * 100}
        </p>
        <p>
          <i>
            {props.curCode} - {props.curDesc}
          </i>
        </p>
        <p>
          <i>
            1 EUR = {props.curCode} {props.curRate}
          </i>
        </p>
      </div>
      <div className="child_right">
        <button value={props.curCode} onClick={props.deleteChild.bind(this)}>
          (-)
        </button>
      </div>
    </div>
  </div>
);

export default Currency;
