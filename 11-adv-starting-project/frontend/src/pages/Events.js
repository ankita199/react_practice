import { Suspense } from "react";
import EventsList from "../components/EventsList";
import { useLoaderData, json, defer, Await } from "react-router-dom";

function EventsPage() {
  const { events } = useLoaderData();
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}
export async function eventsLoader() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    throw json(
      { message: "could not fetch events." },
      {
        status: 500,
      }
    );
  } else {
    const res = await response.json();
    return res.events;
  }
}
export function loader() {
  return defer({
    events: eventsLoader(),
  });
}
export default EventsPage;
