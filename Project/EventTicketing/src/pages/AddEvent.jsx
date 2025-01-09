import React, { useState } from "react";
import { ethers, parseEther } from "ethers"; 
import Navbar from "../components/Navbar";
import SecondNavbar from "../components/SecondNavbar";
import Footer from "../components/Footer";
import Abi from "../assets/EventTicketing.json";
import address from "../assets/deployed_addresses.json";

const AddEvent = ({ signerAddress }) => {
  const [formData, setFormData] = useState({
    name: "",
    ticketPrice: "",
    totalTickets: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, ticketPrice, totalTickets } = formData;

    if (!name || !ticketPrice || !totalTickets) {
      alert("All fields are required!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        address["EventTicketing#EventTicketing"],
        Abi.abi,
        signer
      );

      const tx = await contract.createEvent(
        name,
        parseEther(ticketPrice.toString()), 
        totalTickets
      );

      await tx.wait(); 
      alert("Event added successfully!");
      setFormData({ name: "", ticketPrice: "", totalTickets: "" });
    } catch (error) {
      console.error(error);
      alert("Failed to add the event. Please check your inputs or try again.");
    }
  };

  return (
    <>
      <div className="bg-[#FFECD1] min-h-screen w-full">
        <Navbar signerAddress={signerAddress} />
        <SecondNavbar />
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <form className="w-full bg-white p-8 shadow-lg" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-black mb-6 text-center">Add New Event</h2>

            {/* Event Name */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Event Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter Event Name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Ticket Price */}
            <div className="mb-4">
              <label htmlFor="ticketPrice" className="block text-gray-700 font-medium mb-2">
                Event Ticket Price (in ETH)
              </label>
              <input
                type="number"
                id="ticketPrice"
                value={formData.ticketPrice}
                onChange={handleInputChange}
                placeholder="Enter Ticket Price"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Total Tickets */}
            <div className="mb-4">
              <label htmlFor="totalTickets" className="block text-gray-700 font-medium mb-2">
                Total Tickets
              </label>
              <input
                type="number"
                id="totalTickets"
                value={formData.totalTickets}
                onChange={handleInputChange}
                placeholder="Enter Total Tickets"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Add Event Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-pink-400 text-white py-2 px-4 rounded-lg hover:bg-pink-500"
              >
                Add Event
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddEvent;
