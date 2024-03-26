let votes = {
    voter1: 0,
    voter2: 0,
    voter3: 0,
    voter4: 0
};

let selectedVoter = prompt("Enter the name of the voter to receive votes:");
let thresholdVotes = parseInt(prompt("Enter the threshold number of total votes:"));
let thresholdReached = false;

function updateVoteCount() {
    for (let voter in votes) {
        const voteCountElement = document.querySelector('#' + voter + ' .vote-count span');
        voteCountElement.textContent = votes[voter];
    }
}

function vote(voter) {
    if (!thresholdReached) {
        votes[voter]++;
        document.querySelector('#' + voter).classList.add('voted');
        updateVoteCount();
        checkThreshold();
    } else {
        votes[selectedVoter]++;
        updateVoteCount();
    }
}

function resetVotes() {
    for (let voter in votes) {
        votes[voter] = 0;
        document.querySelector('#' + voter).classList.remove('voted');
    }
    updateVoteCount();
    thresholdReached = false;
}

function checkThreshold() {
    let totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);
    if (!thresholdReached && totalVotes >= thresholdVotes && thresholdVotes > 0) {
        thresholdReached = true;
        updateVoteCount();
    }
}
