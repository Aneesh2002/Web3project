// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract EventTicketing {
    struct Event {
        uint256 id;
        string name;
        uint256 ticketPrice;
        uint256 totalTickets;
        uint256 ticketsSold;
        address organizer;
        bool isSaleActive;
    }

    // Define a struct for Ticket Purchase Details
    struct TicketPurchase {
        uint256 eventId;
        string eventName;
        uint256 ticketPrice;
    }

    // Mapping from event ID to Event
    mapping(uint256 => Event) public events;
    mapping(address => TicketPurchase[]) public userPurchases;
    uint256[] public eventIds;

    event EventCreated(
        uint256 id,
        string name,
        uint256 ticketPrice,
        uint256 totalTickets,
        address organizer
    );

    event TicketBought(
        address buyer,
        uint256 eventId,
        string eventName,
        uint256 ticketPrice
    );

    function createEvent(
        string memory name,
        uint256 ticketPrice,
        uint256 totalTickets
    ) public {
        uint256 eventId = eventIds.length;
        events[eventId] = Event({
            id: eventId,
            name: name,
            ticketPrice: ticketPrice,
            totalTickets: totalTickets,
            ticketsSold: 0,
            organizer: msg.sender,
            isSaleActive: true 
        });
        eventIds.push(eventId);

        emit EventCreated(eventId, name, ticketPrice, totalTickets, msg.sender);
    }

    // Function to buy a ticket
    function buyTicket(uint256 eventId) public payable {
        Event storage eventInstance = events[eventId];

        require(eventInstance.id == eventId, "Event does not exist");
        require(eventInstance.isSaleActive, "Ticket sale is not active");
        require(msg.value == eventInstance.ticketPrice, "Incorrect ticket price");
        require(eventInstance.ticketsSold < eventInstance.totalTickets, "No tickets available");

        userPurchases[msg.sender].push(TicketPurchase({
            eventId: eventId,
            eventName: eventInstance.name,
            ticketPrice: eventInstance.ticketPrice
        }));

        emit TicketBought(msg.sender, eventId, eventInstance.name, eventInstance.ticketPrice);

        eventInstance.ticketsSold++;

        // Send the ticket price to the organizer
        payable(eventInstance.organizer).transfer(msg.value);
    }

    function getAllEvents()
        external
        view
        returns (
            uint256[] memory,
            string[] memory,
            uint256[] memory,
            uint256[] memory,
            uint256[] memory,
            address[] memory
        )
    {
        uint256 eventCount = eventIds.length;

        uint256[] memory ids = new uint256[](eventCount);
        string[] memory names = new string[](eventCount);
        uint256[] memory ticketPrices = new uint256[](eventCount);
        uint256[] memory totalTickets = new uint256[](eventCount);
        uint256[] memory ticketsSold = new uint256[](eventCount);
        address[] memory organizers = new address[](eventCount);

        for (uint256 i = 0; i < eventCount; i++) {
            Event storage eventInstance = events[eventIds[i]];
            ids[i] = eventInstance.id;
            names[i] = eventInstance.name;
            ticketPrices[i] = eventInstance.ticketPrice;
            totalTickets[i] = eventInstance.totalTickets;
            ticketsSold[i] = eventInstance.ticketsSold;
            organizers[i] = eventInstance.organizer;
        }

        return (ids, names, ticketPrices, totalTickets, ticketsSold, organizers);
    }

    function getUserTickets() external view returns (TicketPurchase[] memory) {
        return userPurchases[msg.sender];
    }
}
