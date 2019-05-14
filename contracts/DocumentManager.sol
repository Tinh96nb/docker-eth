pragma solidity ^0.4.22;

contract DocumentManager {

    address public admin;

    mapping (uint => Document) documents;
    uint public numDocuments;
    mapping (uint => User) users;

    enum Status {PENDDING, ACEPTED, REJECTED}

    struct Document{
        address owner;
        string name;
        string contentHash;
        string linkIpfsCrypt;
        string category;
        Status status;
        uint createdAt;
    }

    struct User {
        address owner;
        string privateKey;
    }

    constructor() public {
        admin = msg.sender;
    }

    event LogCreatedDoc(
        uint indexed _numDoc,
        address indexed _owner,
        string _name,
        string _contentHash,
        string _linkIpfsCrypt,
        string _category,
        Status _status,
        uint _createdAt
    );

    function newDocument(
        string _name,
        string _contentHash,
        string _linkIpfsCrypt,
        string _category
    )
        public
        returns (bool success)
    {
        numDocuments++;
        documents[numDocuments].owner = msg.sender;
        documents[numDocuments].name = _name;
        documents[numDocuments].contentHash = _contentHash;
        documents[numDocuments].linkIpfsCrypt = _linkIpfsCrypt;
        documents[numDocuments].category = _category;
        documents[numDocuments].status = Status.PENDDING;
        documents[numDocuments].createdAt = block.timestamp;

        emit LogCreatedDoc(
            numDocuments,
            msg.sender,
            _name,
            _contentHash,
            _linkIpfsCrypt,
            _category,
            Status.PENDDING,
            block.timestamp
        );

        return true;
    }

    function grantDocument(
        uint documentId,
        Status status
    )
        public
    {
        if(documents[documentId].owner == msg.sender) {
            documents[documentId].status = status;
        }
    }

    // function setInfoUser(string privateKey) public {
    //     save(hashPashh)
    // }

    function getDocumentByIndex(
        uint documentId
    )
        public
        view
        returns (
            address _owner,
            string _name,
            string _contentHash,
            string _linkIpfsCrypt,
            string _category,
            Status _status,
            uint _createdAt
        )
    {
        return (
            documents[documentId].owner,
            documents[documentId].name,
            documents[documentId].contentHash,
            documents[documentId].linkIpfsCrypt,
            documents[numDocuments].category,
            documents[numDocuments].status,
            documents[documentId].createdAt
        );
    }

    function getLastestDocument()
        public
        view
        returns (
            uint _numDoc,
            address _owner,
            string _name,
            string _contentHash,
            string _linkIpfsCrypt,
            string _category,
            Status _status,
            uint _createdAt
        )
    {
        return (
            numDocuments,
            documents[numDocuments].owner,
            documents[numDocuments].name,
            documents[numDocuments].contentHash,
            documents[numDocuments].linkIpfsCrypt,
             documents[numDocuments].category,
            documents[numDocuments].status,
            documents[numDocuments].createdAt
        );
    }
}