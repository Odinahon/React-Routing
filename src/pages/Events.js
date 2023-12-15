// import { json, useLoaderData } from "react-router-dom";
// import EventsList from "../components/EventsList";

// function EventsPage() {
//   const data = useLoaderData();
//   const events = data.events;

//   if (data.isError) {
//     return <p>{data.message}</p>;
//   }

//   return <>{<EventsList events={events} />}</>;
// }

// export default EventsPage;

// export async function loader() {
//   const response = await fetch("http://localhost:8080/events");

//   if (!response.ok) {
//     //when we come across errors while fetching we can return isError handling object
//     // return {isError: true, message: 'Could not fetch events.'}
//     //or we can throw a response object with a status property which helps us with building a generic error handling component
//     // throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
//     //   status: 500,
//     // });
//     json({ message: "Could not fetch events." }, { status: 500 });
//   } else {
//     // const resData = await response.json();
//     // now we are returning array of events, but it could be numbers or anything
//     // return resData.events;
//     // but we can return response
//     return response;
//   }
// }

// import { useLoaderData, json, defer, Await } from "react-router-dom";

// import EventsList from "../components/EventsList";
// import { Suspense } from "react";

// function EventsPage() {
//   const { events } = useLoaderData();

//   return (
//     <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
//       <Await resolve={events}>
//         {(loadedEvents) => <EventsList events={loadedEvents} />}
//       </Await>
//     </Suspense>
//   );
// }

// export default EventsPage;

// async function loadEvents() {
//   const response = await fetch("http://localhost:8080/events");

//   if (!response.ok) {
//     // return { isError: true, message: 'Could not fetch events.' };
//     // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
//     //   status: 500,
//     // });
//     throw json(
//       { message: "Could not fetch events." },
//       {
//         status: 500,
//       }
//     );
//   } else {
//     const resData = await response.json();
//     return resData.events;
//   }
// }

// export async function loader() {
//   defer({
//     events: loadEvents(),
//   });
// }

import { Suspense } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

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

export function loader() {
  return defer({
    events: loadEvents(),
  });
}
