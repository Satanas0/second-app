// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DAO {
    IERC20 public token;

    struct Proposal {
        string description;
        uint256 deadline;
        uint256 votesFor;
        uint256 votesAgainst;
        bool executed;
        address proposer;
        mapping(address => bool) hasVoted;
    }

    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;

    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string description);
    event VoteCast(uint256 indexed proposalId, address indexed voter, bool support, uint256 weight);
    event ProposalExecuted(uint256 indexed proposalId);

    modifier validProposal(uint256 _proposalId) {
        require(_proposalId > 0 && _proposalId <= proposalCount, "DAO: Proposal does not exist");
        _;
    }

    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
    }

    function createProposal(string memory _description, uint256 _duration) public returns (uint256) {
        proposalCount++;
        uint256 proposalId = proposalCount;
        Proposal storage proposal = proposals[proposalId];

        proposal.description = _description;
        proposal.deadline = block.timestamp + _duration;
        proposal.proposer = msg.sender;

        emit ProposalCreated(proposalId, msg.sender, _description);
        return proposalId;
    }

    function vote(uint256 _proposalId, bool _support) public validProposal(_proposalId) {
        Proposal storage proposal = proposals[_proposalId];

        require(block.timestamp <= proposal.deadline, "DAO: Voting period has ended");
        require(!proposal.hasVoted[msg.sender], "DAO: Already voted");
        require(!proposal.executed, "DAO: Proposal already executed");

        uint256 votingPower = token.balanceOf(msg.sender);
        require(votingPower > 0, "DAO: No voting power");

        proposal.hasVoted[msg.sender] = true;

        if (_support) {
            proposal.votesFor += votingPower;
        } else {
            proposal.votesAgainst += votingPower;
        }

        emit VoteCast(_proposalId, msg.sender, _support, votingPower);
    }

    function executeProposal(uint256 _proposalId) public validProposal(_proposalId) {
        Proposal storage proposal = proposals[_proposalId];

        require(block.timestamp > proposal.deadline, "DAO: Voting period not ended");
        require(!proposal.executed, "DAO: Proposal already executed");
        require(proposal.votesFor > proposal.votesAgainst, "DAO: Proposal not passed");

        proposal.executed = true;

        emit ProposalExecuted(_proposalId);
    }

    function getProposal(uint256 _proposalId) public view validProposal(_proposalId) returns (
        uint256 id,
        string memory description,
        uint256 deadline,
        uint256 votesFor,
        uint256 votesAgainst,
        bool executed,
        address proposer
    ) {
        Proposal storage proposal = proposals[_proposalId];
        return (
            _proposalId,
            proposal.description,
            proposal.deadline,
            proposal.votesFor,
            proposal.votesAgainst,
            proposal.executed,
            proposal.proposer
        );
    }

    function hasVoted(uint256 _proposalId, address _voter) public view returns (bool) {
        if (_proposalId == 0 || _proposalId > proposalCount) {
            return false;
        }
        return proposals[_proposalId].hasVoted[_voter];
    }
}
