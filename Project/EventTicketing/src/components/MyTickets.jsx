import React, { useState, useEffect } from "react";
import SecondNavbar from "./SecondNavbar";
import { ethers } from "ethers";
import contractABI from "../assets/EventTicketing.json";
import contractAddress from "../assets/deployed_addresses.json"; // Replace with your deployed address file or hardcode it if needed

const MyTickets = ({ signerAddress }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTickets = async () => {
    try {
      if (!signerAddress) {
        setError("Wallet not connected. Please connect from the home page.");
        setLoading(false);
        return;
      }

      // Initialize the provider and signer
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Connect to the contract
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Fetch tickets purchased by the connected user
      const userTickets = await contract.getUserTickets();

      // Format the tickets for display
      const formattedTickets = userTickets.map((ticket) => ({
        eventId: ticket.eventId.toString(),
        eventName: ticket.eventName,
        ticketPrice: ethers.formatEther(ticket.ticketPrice) + " ETH",
      }));

      setTickets(formattedTickets);
    } catch (err) {
      console.error("Error fetching tickets:", err);
      setError("Error fetching tickets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [signerAddress]);

  return (
    <>
      <SecondNavbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-6">My Tickets</h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : tickets.length === 0 ? (
          <p className="text-center">No tickets purchased.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tickets.map((ticket, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 bg-white shadow-md"
              >
                <h2 className="text-xl font-bold">{ticket.eventName}</h2>
                <p>
                  <strong>Event ID:</strong> {ticket.eventId}
                </p>
                <p>
                  <strong>Ticket Price:</strong> {ticket.ticketPrice}
                </p>
                <p>
                  <strong>Buyer Address:</strong> {signerAddress}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyTickets;
