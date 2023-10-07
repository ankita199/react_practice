import EventForm from "../components/EventForm";
import { useRouteLoaderData } from "react-router-dom";

const EditEventPage = () => {
  const response = useRouteLoaderData("event-detail");

  return <EventForm event={response.event}></EventForm>;
};
export default EditEventPage;
