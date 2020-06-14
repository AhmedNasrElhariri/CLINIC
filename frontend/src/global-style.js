import { createGlobalStyle } from 'styled-components';
import { scrollbarColor } from './styles/light';

export default createGlobalStyle`

@font-face {
      font-family: 'BebasNeue';
      src: local('BebasNeue'), url(${require('./fonts/BebasNeue.otf')});
    }

    @font-face {
      font-family: 'SegoeUI';
      src: local('SegoeUI'), url(${require('./fonts/Segoe_UI.woff')}) format('woff');
      font-weight: 400;
    }

    @font-face {
      font-family: 'SegoeUI';
      src: local('SegoeUI'), url(${require('./fonts/Segoe_UI_Semi_Bold.ttf')}) ;
      font-weight: 600;
    }

    @font-face {
      font-family: 'SegoeUI';
      src: local('SegoeUI'), url(${require('./fonts/Segoe_UI_Bold.woff')}) format('woff');
      font-weight: 800;
    }

    * {
      font-family: 'SegoeUI';
    }

    body {
      margin: 0;
      padding:0;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    code {
      font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }

    .no-list-style {
      list-style-type:none;
    }

    .cursor-pointer{
      cursor: pointer;
    }

    ::-webkit-scrollbar {
      width: 5px;
      background-color: yellow;
    }

    ::-webkit-scrollbar-track {
      background: #ffffff;
    }

    ::-webkit-scrollbar-thumb {
      background: ${scrollbarColor};
      border-radius: 10px;
    }

    .rs-picker-select-menu-item{
      padding: 0 !important;
    }
`;
