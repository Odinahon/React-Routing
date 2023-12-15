// import { useLoaderData, json } from "react-router-dom";
// import EventItem from "../components/EventItem";
// function EventDetailPage() {
//   const data = useLoaderData();
//   return (
//     <>
//       <EventItem event={data.event} />
//     </>
//   );
// }
// export default EventDetailPage;

// export async function loader(request, params) {
//   //how do we get an id of the event here, we can use useParams hook from the EventItem component but not inside the loader function
//   //but our react passes an object to the loader that contains two pieces of data, request object and params property
//   const id = params.eventId;
//   const response = await fetch("http://localhost:8080/events/" + id);
//   //check if response is successful and only after that return response
//   if (!response.ok) {
//     throw json(
//       { message: "Could not fetch details for selected event." },
//       {
//         status: 500,
//       }
//     );
//   } else {
//     return response;
//   }
// }

import {
  useRouteLoaderData,
  json,
  redirect,
  Await,
  defer,
} from "react-router-dom";

import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventDetailPage() {
  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;

async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}
async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw json(
      { message: "Could not fetch events." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader({ request, params }) {
  const id = params.eventId;

  return defer({
    event: await loadEvent(id), //this EventItem component will be waited to be fully available, and the EventsList will be loaded
    events: loadEvents(),
  });
}

export async function action({ params, request }) {
  const eventId = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
  });

  if (!response.ok) {
    throw json(
      { message: "Could not delete event." },
      {
        status: 500,
      }
    );
  }
  return redirect("/events");
}
