import styled from 'styled-components';
export const Spinner = styled.div`
  @keyframes spinner {
    0% {
      transform: translate3d(-50%, -50%, 0) rotate(0deg);
    }
    100% {
      transform: translate3d(-50%, -50%, 0) rotate(360deg);
    }
  }
  animation: 1.5s linear infinite spinner;
  animation-play-state: inherit;
  border: solid 5px white;
  border-bottom-color: #51C6F3;
  border-radius: 50%;
  content: '';
  height: 20px;
  width: 20px;
  position: absolute;
  top: 17px;
  left: 60px;
  transform: translate3d(-50%, -50%, 0);
  will-change: transform;
`;

