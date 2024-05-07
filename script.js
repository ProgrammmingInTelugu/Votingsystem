const parties = [
    { name: "Party A", image: "Images/PartyA.png", votes: 0 },
    { name: "Party B", image: "partyB.jpg", votes: 0 },
    { name: "Party C", image: "partyC.jpg", votes: 0 }
];

const partiesContainer = document.getElementById("parties");
const selectedPartyImage = document.getElementById("selected-party-image");
const selectedPartyVotes = document.getElementById("selected-party-votes");
const resetBtn = document.getElementById("reset-btn");

let selectedParty = prompt("Enter the name of the party to receive votes:");
while (!parties.find(party => party.name === selectedParty)) {
    alert("Invalid party name.");
    selectedParty = prompt("Enter the name of the party to receive votes:");
}

let thresholdVotes = parseInt(prompt("Enter the threshold number of total votes:"));
while (isNaN(thresholdVotes) || thresholdVotes <= 0) {
    alert("Please enter a valid threshold number of votes.");
    thresholdVotes = parseInt(prompt("Enter the threshold number of total votes:"));
}

let thresholdReached = false;
let clickedPartyImageSrc = "";

// Function to render parties
function renderParties() {
    partiesContainer.innerHTML = "";
    parties.forEach(party => {
        const partyElement = document.createElement("div");
        partyElement.classList.add("party");

        const imageElement = document.createElement("img");
        imageElement.src = party.image;
        imageElement.alt = party.name;

        const voteButton = document.createElement("button");
        voteButton.textContent = "Vote";
        voteButton.addEventListener("click", () => {
            if (!thresholdReached) {
                vote(party);
            } else {
                const userSelectedParty = parties.find(p => p.name === selectedParty);
                userSelectedParty.votes++;
               updateSelectedParty(party);
            }
            renderParties(); // Update vote counts for all parties
        });

        const votesElement = document.createElement("p");
        votesElement.textContent = `Votes: ${party.votes}`;

        partyElement.appendChild(imageElement);
        partyElement.appendChild(document.createElement("br"));
        partyElement.appendChild(voteButton);
        partyElement.appendChild(votesElement);

        partiesContainer.appendChild(partyElement);
    });
}

// Function to vote
function vote(party) {
    if (!thresholdReached) {
        party.votes++;
        clickedPartyImageSrc = party.image; // Update the clicked party's image source
        updateSelectedParty(party);
        checkThreshold();
    } else {
        const userSelectedParty = parties.find(p => p.name === selectedParty);
        userSelectedParty.votes++;
       clickedPartyImageSrc = party.image; updateSelectedParty(party);
    }
}

// Function to update selected party
function updateSelectedParty(party) {
    selectedPartyImage.src = thresholdReached ? clickedPartyImageSrc : party.image; // Use clicked party's image if available and threshold reached
    selectedPartyImage.alt = party.name;
    selectedPartyVotes.textContent = party.votes;
}

// Function to reset votes
function resetVotes() {
    parties.forEach(party => {
        party.votes = 0;
    });
    renderParties();
    thresholdReached = false;
    clickedPartyImageSrc = "";
}

// Function to check threshold
function checkThreshold() {
    let totalVotes = parties.reduce((total, party) => total + party.votes, 0);
    if (!thresholdReached && totalVotes >= thresholdVotes) {
        thresholdReached = true;
        handleThresholdReached();
    }
}
// Event listener for reset button
resetBtn.addEventListener("click", resetVotes);

// Initial rendering
renderParties();
