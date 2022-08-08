import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { SearchBarProvider } from "./context/SearchBarContext";
// import Auth0ProviderWithHistory from "./auth0-provider-with-history";

ReactDOM.render(
  <React.StrictMode>
    <SearchBarProvider>
      {/* <Auth0ProviderWithHistory> */}
      <App />
      {/* </Auth0ProviderWithHistory> */}
    </SearchBarProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
