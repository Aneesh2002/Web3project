import React from "react";

const EventCard = ({
  eventId,
  eventName,
  organizer,
  ticketPrice,
  totalTickets,
  availableTickets,
  salesStatus,
  onBuyTicket,
}) => {
  return (
    <div className="bg-white w-full p-6 rounded-lg shadow-lg mb-4">
      <h3 className="text-2xl font-semibold">{eventName}</h3>
      <p className="text-sm text-gray-500">Organizer: {organizer}</p>
      <p className="mt-2">Event ID: {eventId}</p>
      <p>Ticket Price: {ticketPrice} Wei</p>
      <p>Total Tickets: {totalTickets}</p>
      <p>Available Tickets: {availableTickets}</p>
      <p>Status: {salesStatus}</p>

      <div className="mt-4 flex flex-wrap gap-4">
        <button
          onClick={onBuyTicket} 
          className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Buy Ticket
        </button>
      </div>
    </div>
  );
};

export default EventCard;
