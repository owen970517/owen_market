import styled from 'styled-components';

const LoadingSpinner = () => {
    return (
        <LoadingSpinnerStyled className='loading'>
            <div className='spinner' />
        </LoadingSpinnerStyled>
    );
};

export default LoadingSpinner;

const LoadingSpinnerStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;

    .loading {
        width: 100%;
        height: 50px;
    }

    .spinner {
        margin: auto;
        width: 70px;
        height: 70px;
        margin-top: 16px;
        border-radius: 50%;
        border: 4px solid transparent;
        border-top-color: #888;
        border-right-color: #888;
        border-bottom-color: #888;
        animation: spinner 0.8s ease infinite;
    }

    @keyframes spinner {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;