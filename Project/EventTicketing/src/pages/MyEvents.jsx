import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SecondNavbar from "../components/SecondNavbar";
import { ethers} from "ethers";
import EventTicketing from "../assets/EventTicketing.json";
import contractAddresses from "../assets/deployed_addresses.json";

const MyEvents = ({ signerAddress }) => {
  const contractABI = EventTicketing.abi; // Access the ABI
  const contractAddress = contractAddresses["EventTicketing#EventTicketing"];

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch tickets using the provided `getUserTickets` logic
  const fetchTickets = async () => {
    try {
      if (!signerAddress) {
        setError("Wallet not connected. Please connect from the home page.");
        setLoading(false);
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      console.log("Signer:", signer);

      // Initialize the contract
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Fetch tickets from the smart contract
      const userTickets = await contract.getUserTickets();
      console.log("Fetched Tickets:", userTickets);

      // Format and display the tickets
      const formattedTickets = userTickets.map((ticket, index) => ({
        eventId: ticket.eventId.toString(),
        eventName: ticket.eventName,
        ticketPrice: ethers.utils.formatEther(ticket.ticketPrice) + " ETH",
      }));

      setTickets(formattedTickets);
    } catch (error) {
      console.error("Error fetching user tickets:", error);
      setError("Error fetching tickets. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch tickets when the component mounts or signerAddress changes
  useEffect(() => {
    fetchTickets();
  }, [signerAddress]);

  return (
    <>
      <Navbar signerAddress={signerAddress} />
      <SecondNavbar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-6">My Events</h1>
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

export default MyEvents;
