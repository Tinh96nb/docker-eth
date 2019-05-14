const DocContract = artifacts.require('./DocumentManager.sol')

contract("DocumentManager", async ([owner, mem]) => {
  let documentManager

  beforeEach('setup contract for each test', async () => {
    documentManager = await DocContract.new()
  })

  it('hash an admin', async function () {
      assert.equal(await documentManager.admin(), owner)
  })

  it('create a doc then check exist this block on truffle', async () => {
    const nameDoc = "name doc";
    const hashContent = "this is hash file";
    const cryptLink = "link ipfs";
    const category = "category";

    // mine to ethereum, create new doc
    await documentManager.newDocument(nameDoc, hashContent, cryptLink, category, { from: mem });

    // get block mined
    const docBlockMined = await documentManager.getLastestDocument();

    const ownerResult = docBlockMined._owner
    const nameDocResult = docBlockMined._name;
    const hashContentResult = docBlockMined._contentHash;
    const cryptLinkResult = docBlockMined._linkIpfsCrypt;
    const status = docBlockMined._status;
    const categoryResult = docBlockMined._category;
    const numDoc = docBlockMined._numDoc.toNumber();
    
    assert.equal(ownerResult, mem)
    assert.equal(nameDocResult, nameDoc)
    assert.equal(hashContentResult, hashContent)
    assert.equal(cryptLinkResult, cryptLink)
    assert.equal(categoryResult, category)
    assert.equal(status, 0)
    assert.equal(numDoc, 1)
  })

});