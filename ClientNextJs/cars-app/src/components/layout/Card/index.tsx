import { JSX } from "react";
import styles from "./index.module.css";

export interface IProps {
    children: string | JSX.Element | JSX.Element[];
    className?: string;
    width?: number;
    hight?: number;
}

export default function Card(props: IProps) {
    const className = [styles.card, props.className].join(" ");

    return (
        <div style={{ width: props.width, height: props.hight }} className={className}>
            {props.children}
        </div>
    );
}
