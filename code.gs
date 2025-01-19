
function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Shop & Client Search');
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Sheet1');
  return sheet.getDataRange().getValues();
}

function getUniqueShops() {
  const data = getData();
  const shops = [];
  for (let i = 1; i < data.length; i++) {
    const shop = data[i][2];
    if (shop && shops.indexOf(shop) === -1) {
      shops.push(shop);
    }
  }
  return shops.sort();
}

function getUniqueClients() {
  const data = getData();
  const clients = [];
  for (let i = 1; i < data.length; i++) {
    const client = data[i][3];
    if (client && clients.indexOf(client) === -1) {
      clients.push(client);
    }
  }
  return clients.sort();
}

function addData(shopName, clientName, applicationNumber, amount, type, remarks) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Sheet1');
  const data = sheet.getDataRange().getValues();
  let maxSNo = 0;
  for (let i = 1; i < data.length; i++) {
    const sNo = parseInt(data[i][0], 10);
    if (!isNaN(sNo) && sNo > maxSNo) {
      maxSNo = sNo;
    }
  }
  const newSNo = maxSNo + 1;
  sheet.appendRow([newSNo, applicationNumber, shopName, clientName, amount, type, remarks]);
  return {
    sNo: newSNo,
    applicationNumber: applicationNumber,
    shopName: shopName,
    clientName: clientName,
    amount: amount,
    type: type,
    remarks: remarks
  };
}
