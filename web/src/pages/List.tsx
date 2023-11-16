import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Page from "../components/Page";
import LinkList from "../components/LinkList";
import { useClient } from "../client/Context";
import { Link, Slice } from "../types";

type Props = {
  stale: boolean;
};

const List = ({ stale }: Props) => {
  const client = useClient();
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>("");
  const [links, setLinks] = useState<Slice<Link>>({
    items: [],
    total: 0,
  });

  const fetch = useCallback(() => {
    client
      ?.makeRequest(query, {
        start: 0 + (page - 1) * 8,
        end: 7 + (page - 1) * 8,
        filter,
      })
      .then(({ data }) => {
        setLinks(data.data.getLinks);
      });
  }, [client, query, page, filter, setLinks]);

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    fetch();
  }, [filter, page, stale]);

  return (
    <Page title={"Existing Links"}>
      <LinkList
        {...links}
        filter={filter}
        setFilter={setFilter}
        page={page}
        setPage={setPage}
      />
    </Page>
  );
};

export default List;

const query = `
      query GetLinks($start: Float!, $end: Float!, $filter: String) {
          getLinks(start: $start, end: $end, filter: $filter) {
            items {
              url
              shortFormUrl
            }
            total
          }
      }
  `;
