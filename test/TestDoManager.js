const DocContract = artifacts.require('./DocumentManager.sol')

const status = {
  PENDDING: 0,
  CLOSE: 1,
  ACEPTED: 2,
  REJECTED: 3
}

const dataSeed = {
  numDoc: 1,
  nameDoc: 'name doc',
  hashContent: 'this is hash file',
  cryptLink: 'link ipfs',
  category: 'category'
}

contract('DocumentManager', async ([owner, mem]) => {
  let documentManager

  beforeEach('setup contract for each test', async () => {
    documentManager = await DocContract.new()
  })

  it('hash an admin', async function () {
    assert.equal(await documentManager.admin(), owner)
  })

  it('create a doc then check exist this block on truffle', async () => {
    // create new document
    await documentManager.newDocument(
      dataSeed.nameDoc, dataSeed.hashContent, dataSeed.cryptLink, dataSeed.category,
      { from: mem }
    )
    // get block mined
    const docBlockMined = await documentManager.getDocumentByIndex(dataSeed.numDoc)

    const ownerResult = docBlockMined._owner
    const nameDocResult = docBlockMined._name
    const hashContentResult = docBlockMined._contentHash
    const cryptLinkResult = docBlockMined._linkIpfsCrypt
    const statusResult = docBlockMined._status
    const categoryResult = docBlockMined._category

    assert.equal(ownerResult, mem)
    assert.equal(nameDocResult, dataSeed.nameDoc)
    assert.equal(hashContentResult, dataSeed.hashContent)
    assert.equal(cryptLinkResult, dataSeed.cryptLink)
    assert.equal(categoryResult, dataSeed.category)
    assert.equal(statusResult, status.PENDDING)
  })

  it('admin change status', async () => {
    await documentManager.newDocument(
      dataSeed.nameDoc, dataSeed.hashContent, dataSeed.cryptLink, dataSeed.category,
      { from: mem }
    )
    // Admin change status
    await documentManager.grantDocument(dataSeed.numDoc, status.ACEPTED, { from: owner })
    const docBlockChanged = await documentManager.getDocumentByIndex(dataSeed.numDoc)
    assert.equal(docBlockChanged._status, status.ACEPTED)
  })

  it('member close document will null, status clode', async () => {
    await documentManager.newDocument(
      dataSeed.nameDoc, dataSeed.hashContent, dataSeed.cryptLink, dataSeed.category,
      { from: mem }
    )
    await documentManager.deleteDocument(dataSeed.numDoc, { from: mem })
    const docBlockChanged = await documentManager.getDocumentByIndex(dataSeed.numDoc)
    assert.equal(docBlockChanged._status, status.CLOSE)
  })

  it('member not is owner document when close then status doc still pendding', async () => {
    await documentManager.newDocument(
      dataSeed.nameDoc, dataSeed.hashContent, dataSeed.cryptLink, dataSeed.category,
      { from: mem }
    )
    await documentManager.deleteDocument(dataSeed.numDoc, { from: owner })
    const docBlockChanged = await documentManager.getDocumentByIndex(dataSeed.numDoc)
    assert.equal(docBlockChanged._status, status.PENDDING)
  })

  it('member create doc -> admin acept doc (now doc status is acept), then mem update document -> status doc is pendding', async () => {
    await documentManager.newDocument(
      dataSeed.nameDoc, dataSeed.hashContent, dataSeed.cryptLink, dataSeed.category,
      { from: mem }
    )
    // Admin change status
    await documentManager.grantDocument(dataSeed.numDoc, status.ACEPTED, { from: owner })
    const docChangeStatus = await documentManager.getDocumentByIndex(dataSeed.numDoc)
    assert.equal(docChangeStatus._status, status.ACEPTED)
    // member update
    const dataChange = {
      idDoc: 1,
      nameDoc: 'name doc change',
      hashContent: 'this is hash file',
      cryptLink: 'link ipfs',
      category: 'category'
    }
    await documentManager.updateDocument(
      dataChange.idDoc, dataChange.nameDoc, dataChange.hashContent, dataChange.cryptLink, dataChange.category,
      { from: mem }
    )
    // test status
    const docChanged = await documentManager.getDocumentByIndex(dataSeed.numDoc)
    assert.equal(docChanged._status, status.PENDDING)
    assert.equal(docChanged._name, dataChange.nameDoc)
  })
})
