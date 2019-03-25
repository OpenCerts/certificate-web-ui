import withRedux from "next-redux-wrapper";
import initStore from "../store";
import Meta from "../components/Meta";
import AdminContainer from "../components/AdminContainer";
import NetworkSelectorContainer from "../components/NetworkSelectorContainer";

// polyfill is required to fix regeneratorRuntime issue for ledgerhq u2f
// see: https://github.com/LedgerHQ/ledgerjs/issues/218
import '@babel/polyfill';

const VerifierPage = props => (
  <div className="min-vh-100 pv5">
    <Meta />
    <div className="mw9 mw8-ns center bg-white pa4 ph5-ns br3 pv5">
      <NetworkSelectorContainer />
      <AdminContainer {...props} />
    </div>
  </div>
);

export default withRedux(initStore)(VerifierPage);
