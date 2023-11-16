import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useClient } from "../client/Context";
import Modal from "../components/Modal";
import Text from "../components/Text";

type Props = {
  onSuccess: () => void;
};

const Create = ({ onSuccess }: Props) => {
  const client = useClient();
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState<string>();
  const [short, setShort] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(async () => {
    const result = await client?.makeRequest(mutation, {
      url,
    });
    if (result?.data?.errors?.length) {
      setError(result?.data?.errors[0].message);
    } else {
      onSuccess();
      setShort(result?.data.data.createLink.shortFormUrl);
    }
  }, [url, client]);

  const onKeyDown = useCallback(
    (e: any) => {
      if (e.key === "Enter") {
        submit();
      }
    },
    [submit]
  );

  return (
    <>
      <Button onClick={() => setOpen(true)}>Create</Button>
      <Modal
        open={open}
        onClose={() => {
          setUrl("");
          setError(null);
          setOpen(false);
          setShort(null);
        }}
      >
        <Text variant="body">Enter a url and hit return:</Text>
        <input
          type="text"
          placeholder="e.g. https://primarybid.com/uk"
          style={{ width: "91%" }}
          onKeyDown={onKeyDown}
          onChange={(e) => {
            setError(null);
            setUrl(e.target.value);
            setShort(null);
          }}
        />
        {short ? <Success>{short}</Success> : null}
        {error ? <Error>{error}</Error> : null}
      </Modal>
    </>
  );
};

export default Create;

const mutation = `
      mutation CreateLink($url: String!) {
          createLink(url: $url) {
              url
              shortFormUrl
          }
      }
  `;

const Error = styled.div`
  padding: 8px;
  margin-top: 16px;
  border-radius: 8px;
  background-color: red;
  color: white;
`;

const Success = styled.div`
  padding: 8px;
  margin-top: 16px;
  border-radius: 8px;
  background-color: lightgreen;
  color: white;
`;

const Button = styled.button`
  width: 60px;
  align-self: flex-end;
`;
