// import { json, redirect } from "react-router-dom";
// import EventForm from "../components/EventForm";

// function NewEventPage() {
//   return <EventForm />;
// }
// export default NewEventPage;

// export async function action({ request, params }) {
//   const data = await request.formData();
//   //that is how we can extract this submitted form data with help of that request that's forwarded or that's passed into this action function by react-router
//   const eventData = {
//     title: data.get("title"),
//     image: data.get("image"),
//     date: data.get("date"),
//     description: data.get("description"),
//   };

//   const response = await fetch("http://localhost:8080/events", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(eventData),
//   });

//   if (!response.ok) {
//     throw json({ message: "Could not save event." }, { status: 500 });
//   }
//   redirect("/events");
// }

// import { json, redirect } from "react-router-dom";

import EventForm from "../components/EventForm";

function NewEventPage() {
  return <EventForm method="post" />;
}

export default NewEventPage;
