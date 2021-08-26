import { ButtonHTMLAttributes, FC } from "react";
import { styled } from "@linaria/react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = (props) => <ButtonRoot {...props} />;

const ButtonRoot = styled.button`
    font-size: 24px;
    font-family: sans-serif;
    font-weight: bold;
    background: white;
    border: 2px solid currentColor;
    padding: 10px 20px;
    color: dimgray;
    text-transform: uppercase;
    transition: all 0.2s ease-in-out;

    :active {
        color: darkgray;
        transition: none;
    }
`;

export { Button };
export type { ButtonProps };
