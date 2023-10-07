import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
  redirect,
  json,
} from "react-router-dom";

import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
  const data = useActionData();
  const navigate = useNavigate();
  function cancelHandler() {
    navigate("..");
  }
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  return (
    <Form method={method} className={classes.form}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          defaultValue={(event && event.title) || "Hi"}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          defaultValue={
            (event && event.image) ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAlZpVGoOekMHL3Z9sGBbcwYWzAcAavnqfXdbnrr5a_7c5ptukr9-2ftqXqaNy0kVc9qs&usqp=CAU"
          }
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          defaultValue={(event && event.date) || "11/11/2020"}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          defaultValue={(event && event.description) || "description"}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;
export async function action({ request, params }) {
  const methodName = request.method;
  const data = await request.formData();

  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };
  let url = "http://localhost:8080/events";
  if (methodName === "PATCH") {
    url = `${url}/${params.eventId}`;
  }
  const response = await fetch(url, {
    method: methodName,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });
  if (response.status === 422) {
    return response;
  }
  if (!response.ok) {
    throw json({ message: "Could not save event." }, { status: 500 });
  }

  return redirect("/events");
}
