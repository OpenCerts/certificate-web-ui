import React, { Component } from "react";
import PropTypes from "prop-types";
import HashColor from "./UI/HashColor";
import HashColorInput from "./UI/HashColorInput";
import { OrangeButton } from "./UI/Button";
import { isValidHash } from "../components/utils";

class StoreIssueBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      certificateHash: "",
      certificateHashIsValid: true
    };

    this.onHashChange = this.onHashChange.bind(this);
  }

  onHashChange(event) {
    this.setState({
      certificateHash: event.target.value,
      certificateHashIsValid: isValidHash(event.target.value)
    });
  }

  render() {
    const certificateHashMessage = this.state.certificateHashIsValid
      ? ""
      : "Merkle Root Hash is not valid.";

    const onIssueClick = () => {
      const { adminAddress, storeAddress, handleCertificateIssue } = this.props;
      const { certificateHash, certificateHashIsValid } = this.state;
      if (isValidHash(certificateHash) && certificateHashIsValid) {
        handleCertificateIssue({
          storeAddress,
          fromAddress: adminAddress,
          certificateHash: this.state.certificateHash
        });
      } else {
        this.setState({
          certificateHashIsValid: isValidHash(certificateHash)
        });
      }
    };

    return (
      <div>
        <div>
          Issue certificates with the Merkle Root Hash
          <HashColorInput
            className="mt2"
            variant="pill"
            type="hash"
            hashee={this.state.certificateHash}
            onChange={this.onHashChange}
            value={this.state.certificateHash}
            message={certificateHashMessage}
            placeholder="0x…"
          />
        </div>
        <OrangeButton
          variant="pill"
          className="mt4"
          onClick={onIssueClick}
          disabled={this.props.issuingCertificate}
        >
          {this.props.issuingCertificate ? "Issuing…" : "Issue"}
        </OrangeButton>

        {this.props.issuedTx && !this.props.issuingCertificate ? (
          <div className="mt5">
            <p>🎉 Batch has been issued.</p>
            <div>
              Transaction ID{" "}
              <HashColor
                hashee={this.props.issuedTx}
                networkId={this.props.networkId}
                isTx
              />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default StoreIssueBlock;

StoreIssueBlock.propTypes = {
  issuingCertificate: PropTypes.bool,
  issuedTx: PropTypes.string,
  storeAddress: PropTypes.string,
  adminAddress: PropTypes.string,
  handleCertificateIssue: PropTypes.func,
  networkId: PropTypes.number
};
