import styled from 'styled-components';
const spinner = styled.dev`
      @keyframes spinner {
        0% {
          transform: translate3d(-50%, -50%, 0) rotate(0deg);
        }
        100% {
          transform: translate3d(-50%, -50%, 0) rotate(360deg);
        }
      }
      .spin::before {
        animation: 1.5s linear infinite spinner;
        animation-play-state: inherit;
        border: solid 5px #cfd0d1;
        border-bottom-color: #1c87c9;
        border-radius: 50%;
        content: "";
        height: 20px;
        width: 20px;
        position: absolute;
        top: 10%;
        left: 10%;
        transform: translate3d(-50%, -50%, 0);
        will-change: transform;
      }
`;
  
export default spinner;