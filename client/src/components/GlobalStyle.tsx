import React from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}
    *{
        box-sizing:border-box;
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    body{
        min-height:100vh;
        width:100vw;
        overflow:hidden;
    }
    a{
        text-decoration:none;
        color:black;
    }
    ol,ul,li{
        list-style:none;
    }
`;

export default GlobalStyle;
