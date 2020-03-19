import { font, colors } from './_vars.css';

export const styles = `
    *, *:before, *:after {
        box-sizing: border-box;
    }
    .container{
        overflow-y: scroll;
        overflow-x: scroll;
        height: 200px;
        padding: 20px;
    }
    .cell {
        color: #e5e6e6;
        padding: 7px;
        font-size: 17px;
        border: 1px solid #e5e6e6;
        min-width: 120px;
        min-width: 120px;
    }

    .cell:hover {
        background: #e7e6e6;
        color: #303846;
        cursor: pointer;
    }

    .apply{
        color: #e5e6e6;
        padding: 7px;
        font-size: 17px;
        border: 1px solid #e5e6e6;
        min-width: 10px;
    }
    .delete{
        color: #e5e6e6;
        padding: 7px;
        font-size: 17px;
        border: 1px solid #e5e6e6;
        min-width: 10px;
        max-width: 150px;
    }
    .pnr {
        font-weight: bold;
    }
    .table{
        display: flex;
        align-items: center;
    }
    .btn{

    }
    .btn:hover{
        cursor: pointer;
        background: #e7e6e6;
        color: #303846;
    }
    #ext--dialogue {
        position: fixed;
        right: 0;
        top: 0;
        background: #303846;
        color: $black; 
        font-family: ${font};
        font-size: 14px;
        text-align: center;
        width: 50vh;
        min-height: 25vh;
        max-height: 100vh;
        cursor: auto;
        user-select: none;  
        box-shadow: -8px 8px 16px 3px rgba(0,0,0,0.15);
        transition: all 260ms ease-in-out;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn;
        animation-duration: 260ms;
        animation-timing-function: ease-in-out;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
    }
    h1, h2, h3, h4, h5, h6, p {
        color:  ${colors.black};
        font-size: 16px;
        font-weight: normal;
    }
    button {
        border: none;
        line-height: 34px;
        background: white;
        padding: 0 17px;
        border-radius: 4px;
        color: #303846;
        outline: none;
    }
    @keyframes fadeIn {
        from {
            transform: scale(0.5);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
`;