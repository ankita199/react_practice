import { json, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";
const EventDetailPage = () => {
  const response = useRouteLoaderData("event-detail");
  const eventData = response.event;
  return (
    <>
      <EventItem event={eventData}></EventItem>
    </>
  );
};
export default EventDetailPage;
export async function loader({ request, params }) {
  const eventId = params.eventId;
  const response = await fetch(`http://localhost:8080/events/${eventId}`);
  if (!response.ok) {
    throw json(
      { message: "could not fetch defails for selected events." },
      {
        status: 500,
      }
    );
  }

  return response;
}
