import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { useNavigate } from "react-router-dom";

export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : "/search");
  };

  return (
    <Form className="d-flex me-auto mx-5 w-100  " onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          className="px-3 "
          type="text"
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search products..."
          aria-label="Search Products"
          aria-describedby="button-search"
        ></FormControl>
        <Button
          variant="light"
          className="mx-2 w-25"
          type="submit"
          id="button-search"
        >
          <i className="fas fa-search "></i>
        </Button>
      </InputGroup>
    </Form>
  );
}
