import {ChakraProvider} from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";

import HomeScreen from "./app/screens/Home";

import "./theme.css";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <HomeScreen />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
