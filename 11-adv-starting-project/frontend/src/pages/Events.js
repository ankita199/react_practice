import EventsList from "../components/EventsList";
import { useLoaderData, json } from "react-router-dom";

function EventsPage() {
  const response = useLoaderData();
  const events = response.events;
  return <EventsList events={events} />;
}

export async function loader() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    // throw new Response(JSON.stringify({ message: "could not fetch events." }), {
    //   status: 500,
    // });
    throw json(
      { message: "could not fetch events." },
      {
        status: 500,
      }
    );
  }

  return response;
}
export default EventsPage;
