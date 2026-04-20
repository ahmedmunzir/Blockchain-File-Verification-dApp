
pragma solidity ^0.8.0;

contract FileVerification {
    struct FileData {
        address uploader;
        uint256 timestamp;
        bool exists;
    }

    mapping(bytes32 => FileData) public files;

    event FileUploaded(bytes32 indexed hash, address indexed uploader, uint256 timestamp);

    function uploadFile(bytes32 hash) public {
        require(!files[hash].exists, "File already uploaded");

        files[hash] = FileData({
            uploader: msg.sender,
            timestamp: block.timestamp,
            exists: true
        });

        emit FileUploaded(hash, msg.sender, block.timestamp);
    }

    function verifyFile(bytes32 hash) public view returns (bool exists, address uploader, uint256 timestamp) {
        FileData memory file = files[hash];
        return (file.exists, file.uploader, file.timestamp);
    }
}