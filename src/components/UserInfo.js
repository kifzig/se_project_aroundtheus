export default class UserInfo {
  constructor(nameSelector, jobSelector, imgSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._imgElement = document.querySelector(imgSelector);
  }

  getUserInfo() {
    // return an object with info about user
    // handy for when it's necessary to display user
    // data in the form
    const userObject = {};
    userObject["profileName"] = this._nameElement.textContent;
    userObject["description"] = this._jobElement.textContent;
    userObject["imgLink"] = this._imgElement.src;
    return userObject;
  }

  setUserInfo(nameInfo, jobInfo) {
    this._nameElement.textContent = nameInfo;
    this._jobElement.textContent = jobInfo;
  }

  setMyID(myID) {
    this.myID = myID;
  }

  getMyID() {
    return this.myID;
  }

  setProfileImage(imgLink) {
    this._imgElement.src = imgLink;
  }
}
