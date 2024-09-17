import styled, { keyframes } from "styled-components";
import spinnerGif from "../data/img/AnimeLoading.gif"; // Adjust the path if necessary

// // const rotate = keyframes`
// //   to {
// //     transform: rotate(1turn)
// //   }
// // `;

// // Define the rotate keyframes
// const rotate = keyframes`
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// `;

// const Spinner = styled.div`
//     margin: 4.8rem auto;

//     width: 6.4rem;
//     aspect-ratio: 1;
//     border-radius: 50%;
//     background: radial-gradient(
//                 farthest-side,
//                 var(--color-brand-600) 94%,
//                 #0000
//             )
//             top/10px 10px no-repeat,
//         conic-gradient(#0000 30%, var(--color-brand-600));
//     -webkit-mask: radial-gradient(
//         farthest-side,
//         #0000 calc(100% - 10px),
//         #000 0
//     );
//     mask: radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0);
//     animation: ${rotate} 1.5s infinite linear;
// `;

// export default Spinner;

const SpinnerWrapper = styled.div`
    margin: 10vh auto; // Adjust the vertical margin to position it lower
    width: 12rem; // Increase the size of the GIF
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const LoadingText = styled.div`
    margin-top: 1rem;
    font-size: 1.5rem;
    font-family: "Arial", sans-serif; // Adjust the font as needed
    color: var(--color-brand-600);
`;

const dots = keyframes`
    0%, 20% {
        content: '';
    }
    40% {
        content: '.';
    }
    60% {
        content: '..';
    }
    80%, 100% {
        content: '...';
    }
`;

const AnimatedDots = styled.span`
    &::after {
        content: "";
        animation: ${dots} 1s steps(1, end) infinite;
    }
`;

const Spinner = () => (
    <SpinnerWrapper>
        <img
            src={spinnerGif}
            alt="Loading..."
            style={{ width: "100%", height: "100%" }}
        />
        <LoadingText>
            Loading
            <AnimatedDots />
        </LoadingText>
    </SpinnerWrapper>
);

export default Spinner;
