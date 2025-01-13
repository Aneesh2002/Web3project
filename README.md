# 🎟️ Event Ticketing DApp

A **decentralized application** (DApp) for secure and transparent event ticketing. Built with **Solidity**, **React.js**, and deployed on the **Sepolia Testnet** 🌐.

---

## 🚀 Features

✨ **Event Management**  
Organizers can create events with ticket details like price and availability.  

🎫 **Ticket Purchase**  
Users can buy tickets securely on the blockchain.  

📜 **View Tickets**  
Users can view all their purchased tickets on a dedicated page.  

🔐 **Blockchain Security**  
All transactions and data are stored on the Ethereum blockchain, ensuring transparency and security.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, TailwindCSS 🌈  
- **Smart Contract**: Solidity, Hardhat ⚙️  
- **Blockchain**: Ethereum (Sepolia Testnet) 🌐  
- **Wallet Integration**: Metamask, ethers.js 🔗  

---

## 🔧 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone git@github.com:Aneesh2002/Web3project.git
2️⃣ Install Dependencies
bash
Copy code
# Install for both backend and frontend
npm install
3️⃣ Start the Application
Navigate to the EventTicketing directory and run the development server:

bash
Copy code
cd EventTicketing
npm run dev
Access the app at http://localhost:3000 🚀.

🌟 How to Use
🎯 Connect Your Wallet
Open the app.
Click Connect Wallet.
Approve the connection in Metamask (make sure to select Sepolia).
🎤 Create an Event (For Organizers)
Go to Create Event.
Fill in event details (name, ticket price in Wei, total tickets).
Submit and confirm the transaction.
🔍 View Events
Browse all available events on the Events page.
🛒 Buy Tickets
Select an event and click Buy Ticket.
Confirm the purchase in your wallet.
📂 My Tickets
Check your purchased tickets on the My Events page.
📂 Project Structure
plaintext
Copy code
.
├── backend
│   ├── contracts
│   │   └── EventTicketing.sol      # Smart contract
│   ├── scripts
│   │   └── deploy.js               # Deployment script
│   ├── test
│   │   └── EventTicketing.test.js  # Contract tests
│   ├── hardhat.config.js           # Hardhat configuration
│   └── package.json
├── frontend
│   ├── src
│   │   ├── assets                  # ABI & deployed addresses
│   │   ├── components              # React components
│   │   ├── pages                   # React pages
│   │   └── App.js                  # Entry point
│   └── package.json
└── README.md
🧪 Testing
✅ Smart Contract Testing
Run the smart contract test suite:

bash
Copy code
cd backend
npx hardhat test
✅ Frontend Testing
Run frontend tests (if available):

bash
Copy code
cd frontend
npm test
🚀 Deployment
Sepolia Network 🌐
Deployed contract address: YOUR_CONTRACT_ADDRESS
View your contract on Sepolia Etherscan.
🎯 Future Enhancements
🔄 Allow ticket resale or transfers.
📊 Organizer dashboards for event analytics.
⚡ Dynamic ticket pricing based on demand.
🌎 Deploy to mainnet or other Ethereum-compatible networks.
📜 License
This project is licensed under the MIT License. See the LICENSE file for details.

👨‍💻 Made with ❤️ by [Your Name]

🎉 Enjoy seamless and secure event ticketing with blockchain! 🎉

