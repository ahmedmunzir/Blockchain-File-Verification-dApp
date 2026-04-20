const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FileVerification", function () {
  let fileVerification;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    const FileVerification = await ethers.getContractFactory("FileVerification");
    fileVerification = await FileVerification.deploy();
  });

  describe("Deployment", function () {
    it("Should deploy successfully", async function () {
      expect(fileVerification.target).to.be.properAddress;
    });
  });

  describe("File Upload", function () {
    it("Should upload a file hash successfully", async function () {
      const testHash = ethers.keccak256(ethers.toUtf8Bytes("test file content"));
      
      await expect(fileVerification.uploadFile(testHash))
        .to.emit(fileVerification, "FileUploaded")
        .withArgs(testHash, owner.address, (ts) => ts > 0);

      const [exists, uploader, timestamp] = await fileVerification.verifyFile(testHash);
      expect(exists).to.be.true;
      expect(uploader).to.equal(owner.address);
      expect(timestamp).to.be.greaterThan(0);
    });

    it("Should reject duplicate file hash", async function () {
      const testHash = ethers.keccak256(ethers.toUtf8Bytes("test file content"));
      
      await fileVerification.uploadFile(testHash);
      
      await expect(fileVerification.uploadFile(testHash))
        .to.be.revertedWith("File already uploaded");
    });

    it("Should allow different users to upload different files", async function () {
      const hash1 = ethers.keccak256(ethers.toUtf8Bytes("file1"));
      const hash2 = ethers.keccak256(ethers.toUtf8Bytes("file2"));
      
      await fileVerification.connect(owner).uploadFile(hash1);
      await fileVerification.connect(addr1).uploadFile(hash2);
      
      const [exists1, uploader1] = await fileVerification.verifyFile(hash1);
      const [exists2, uploader2] = await fileVerification.verifyFile(hash2);

      expect(exists1).to.be.true;
      expect(uploader1).to.equal(owner.address);
      expect(exists2).to.be.true;
      expect(uploader2).to.equal(addr1.address);
    });

    it("Should store correct uploader address", async function () {
      const testHash = ethers.keccak256(ethers.toUtf8Bytes("uploader test"));

      await fileVerification.connect(addr1).uploadFile(testHash);

      const [exists, uploader] = await fileVerification.verifyFile(testHash);
      expect(exists).to.be.true;
      expect(uploader).to.equal(addr1.address);
    });

    it("Should store a valid timestamp", async function () {
      const testHash = ethers.keccak256(ethers.toUtf8Bytes("timestamp test"));

      const tx = await fileVerification.uploadFile(testHash);
      const receipt = await tx.wait();
      const block = await ethers.provider.getBlock(receipt.blockNumber);

      const [, , timestamp] = await fileVerification.verifyFile(testHash);
      expect(timestamp).to.equal(block.timestamp);
    });
  });

  describe("File Verification", function () {
    it("Should return exists=false for non-existent file", async function () {
      const testHash = ethers.keccak256(ethers.toUtf8Bytes("non-existent file"));
      
      const [exists, uploader, timestamp] = await fileVerification.verifyFile(testHash);
      expect(exists).to.be.false;
      expect(uploader).to.equal(ethers.ZeroAddress);
      expect(timestamp).to.equal(0);
    });

    it("Should return full metadata for uploaded file", async function () {
      const testHash = ethers.keccak256(ethers.toUtf8Bytes("test file"));
      
      await fileVerification.uploadFile(testHash);
      
      const [exists, uploader, timestamp] = await fileVerification.verifyFile(testHash);
      expect(exists).to.be.true;
      expect(uploader).to.equal(owner.address);
      expect(timestamp).to.be.greaterThan(0);
    });

    it("Should work with multiple files", async function () {
      const hashes = [
        ethers.keccak256(ethers.toUtf8Bytes("file1")),
        ethers.keccak256(ethers.toUtf8Bytes("file2")),
        ethers.keccak256(ethers.toUtf8Bytes("file3"))
      ];
      
      
      await fileVerification.uploadFile(hashes[0]);
      await fileVerification.uploadFile(hashes[1]);
      
      
      const [exists0] = await fileVerification.verifyFile(hashes[0]);
      const [exists1] = await fileVerification.verifyFile(hashes[1]);
      expect(exists0).to.be.true;
      expect(exists1).to.be.true;
      
      
      const [exists2] = await fileVerification.verifyFile(hashes[2]);
      expect(exists2).to.be.false;
    });
  });

  describe("Gas Usage", function () {
    it("Should have reasonable gas costs", async function () {
      const testHash = ethers.keccak256(ethers.toUtf8Bytes("gas test file"));
      
      const tx = await fileVerification.uploadFile(testHash);
      const receipt = await tx.wait();
      
      
      expect(receipt.gasUsed).to.be.lessThan(150000);
    });
  });
});
