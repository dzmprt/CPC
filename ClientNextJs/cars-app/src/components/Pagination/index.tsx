"use client";
import Link from "next/link";
import styles from "./index.module.css";
import Image from "next/image";
import { JSX } from "react";

export interface IProps {
  itemsOnPage: number;
  totalItemsCount: number;
  offset: number;
  searchParams: { [key: string]: string | string[] | undefined };
  baseUrl: string;
}

export default function Pagination(props: IProps) {
  const currentPage = 1 + Math.floor(props.offset / props.itemsOnPage);
  const totalPages = Math.ceil(props.totalItemsCount / props.itemsOnPage);

  let firstPageToShow = currentPage - 2;
  if (firstPageToShow < 0) {
    firstPageToShow = 1;
  }

  let lastPageToShow = currentPage + 2;
  if (lastPageToShow > totalPages) {
    lastPageToShow = totalPages;
  }
  const buttons: JSX.Element[] = [];
  for (let i = firstPageToShow - 1; i < lastPageToShow; i++) {
    if (i + 1 == currentPage) {
      buttons[i] = (
        <button className={`primaryButton ${styles.btn}`} key={i}>{`${i + 1
          }`}</button>
      );
    } else {
      buttons[i] = (
        <Link
          key={i}
          className={styles.link}
          href={{
            pathname: props.baseUrl,
            query: {
              ...props.searchParams,
              offset: props.itemsOnPage * i,
            },
          }}
        >
          <button className={`secondaryButton ${styles.btn}`} key={i}>{`${i + 1
            }`}</button>
        </Link>
      );
    }
  }

  if (buttons.length == 1) {
    return <></>;
  }

  return (
    <div className={styles.wrapper}>
      {props.offset >= props.itemsOnPage && (
        <Link
          href={{
            pathname: props.baseUrl,
            query: {
              ...props.searchParams,
              offset: props.offset - props.itemsOnPage,
            },
          }}
        >
          <Image
            priority={false}
            alt="left"
            width={38}
            height={38}
            src={"/icons/pagination/left.svg"}
          />
        </Link>
      )}

      {buttons}

      {props.offset + props.itemsOnPage < props.totalItemsCount && (
        <Link
          href={{
            pathname: props.baseUrl,
            query: {
              ...props.searchParams,
              offset: props.offset + props.itemsOnPage,
            },
          }}
        >
          <Image
            priority={false}
            alt="left"
            width={38}
            height={38}
            src={"/icons/pagination/right.svg"}
          />
        </Link>
      )}
    </div>
  );
}
