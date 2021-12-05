import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { store,persistor }  from "./store/appstore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";


ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
