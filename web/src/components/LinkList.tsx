import React, { useState } from "react";
import { Link, Slice } from "../types";
import styled from "styled-components";
import { Spacer } from "./Spacer";

type Props = Slice<Link> & {
  filter: string;
  setFilter: (x: string) => void;
  page: number;
  setPage: (x: number) => void;
};

const LinkList = ({
  items,
  total,
  filter,
  setFilter,
  page,
  setPage,
}: Props) => {
  const totalPages = Math.ceil(total / 8);
  return (
    <>
      <input
        type="text"
        placeholder="Filter by URL"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <Spacer.Vertical $size={16} />
      <Table>
        <thead>
          <tr>
            <th>URL</th>
            <th>Short Form URL</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.url}</td>
              <td>{item.shortFormUrl}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          onClick={() => {
            setPage(Math.max(page - 1, 0));
          }}
          style={{ padding: "8px", cursor: "pointer" }}
        >
          -
        </div>
        Page {page} of {totalPages}
        <div
          onClick={() => {
            setPage(Math.min(page + 1, totalPages));
          }}
          style={{ padding: "8px", cursor: "pointer" }}
        >
          +
        </div>
      </div>
    </>
  );
};

export default LinkList;

const Table = styled.table`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  thead > tr {
    background-color: lightgray;
  }

  tbody tr {
    :nth-of-type(odd) {
      background-color: #efefef;
    }
  }

  td {
    padding: 8px;
  }

  td,
  th {
    border: none;
  }
`;
