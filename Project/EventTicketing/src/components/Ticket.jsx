import React from 'react';

const Ticket = ({
  eventId,
  eventName,
  organizer,
  ticketPrice,
}) => {
  return (
    <div className="bg-white w-full p-6 rounded-lg shadow-lg mb-4">
      <h3 className="text-2xl font-semibold">{eventName}</h3>
      <p className="text-sm text-gray-500">Organizer: {organizer}</p>
      <p className="mt-2">Event ID: {eventId}</p>
      <p>Ticket Price: {ticketPrice} Wei</p> {/* Display raw ticket price in Wei */}
    </div>
  );
};

export default Ticket;
