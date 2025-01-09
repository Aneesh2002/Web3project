import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import Abi from "../assets/EventTicketing.json";
import address from "../assets/deployed_addresses.json";
import EventCard from "../components/EventCard";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all events from the smart contract
  const fetchEvents = async () => {
    try {
      setLoading(true);

      const provider = new ethers.BrowserProvider(window.ethereum); // Using BrowserProvider for MetaMask
      const contract = new ethers.Contract(
        address["EventTicketing#EventTicketing"],
        Abi.abi,
        provider
      );

      // Fetch separate arrays of event data
      const [ids, names, ticketPrices, totalTickets, ticketsSold, organizers] =
        await contract.getAllEvents();

      // Map data into a usable format
      const formattedEvents = ids.map((_, index) => ({
        id: ids[index].toString(),
        name: names[index],
        ticketPrice: ticketPrices[index].toString(), // ticketPrice is in Wei
        totalTickets: totalTickets[index].toString(),
        ticketsSold: ticketsSold[index].toString(),
        organizer: organizers[index],
        availableTickets: (totalTickets[index] - ticketsSold[index]).toString(),
        salesStatus:
          ticketsSold[index] < totalTickets[index] ? "Active" : "Sold Out",
      }));

      // Update the state with the formatted event data
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch events when the component mounts
  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle the ticket purchase functionality
  const buyTicket = async (eventId, ticketPrice) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum); // Using BrowserProvider for MetaMask
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        address["EventTicketing#EventTicketing"],
        Abi.abi,
        signer
      );
  
      // Directly use ticketPrice in Wei (no conversion needed)
      const ticketPriceWei = ticketPrice;  // ticketPrice is already in Wei
  
      // Make the transaction (value should be ticketPrice * ticketCount)
      const transaction = await contract.buyTicket(eventId, {
        value: ticketPriceWei,  // Pass the ticket price directly in Wei
      });
  
      await transaction.wait(); // Wait for the transaction to be mined
  
      alert("Ticket purchased successfully!");
      fetchEvents(); // Re-fetch events after the purchase
    } catch (error) {
      console.error("Error purchasing ticket:", error);
      alert("Failed to purchase ticket: " + error.message);
    }
  };

  return (
    <div className="bg-[#FFECD1] min-h-screen w-full p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Event List</h1>
      {loading ? (
        <p className="text-center">Loading events...</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {events.length > 0 ? (
            events.map((event) => (
              <EventCard
                key={event.id}
                eventId={event.id}
                eventName={event.name}
                organizer={event.organizer}
                ticketPrice={event.ticketPrice} 
                totalTickets={event.totalTickets}
                availableTickets={event.availableTickets}
                salesStatus={event.salesStatus}
                onBuyTicket={() => buyTicket(event.id, event.ticketPrice)} 
              />
            ))
          ) : (
            <p>No events available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EventList;
