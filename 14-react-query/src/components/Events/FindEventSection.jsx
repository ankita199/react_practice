import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useRef } from "react";
import { fetchEvents } from "../../util/http";
import EventItem from "./EventItem";
import LoadingIndicator from "../UI/LoadingIndicator";
import ErrorBlock from "../UI/ErrorBlock";
import Modal from "../UI/Modal";
import { Link } from "react-router-dom";

export default function FindEventSection() {
  const searchElement = useRef();
  const [searchTerm, setSearchTerm] = useState();

  const { data, isError, isPending, error } = useQuery({
    queryKey: ["events", { searchTerm: searchTerm }],
    queryFn: ({ filter }) => fetchEvents({ filter, searchTerm }),
    enabled: searchTerm != undefined,
  });

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value);
  }

  function handleClose() {
    navigate("../");
  }
  let content;

  if (isPending) {
    content = (
      <div className="center">
        <LoadingIndicator />
      </div>
    );
  }

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Failed to load event"
          message={
            error.info?.message ||
            "Failed to load event. Please check your inputs and try again later."
          }
        />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}
