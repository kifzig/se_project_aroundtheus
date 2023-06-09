export default class UserInfo {
  constructor(nameSelector, jobSelector) {
    this.nameSelector = nameSelector;
    this.jobSelector = jobSelector;
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._userName;
    this._jobName;
  }

  getUserInfo() {
    // return an object with info about user
    // handy for when it's necessary to display user
    // data in the form
    const userObject = {};
    userObject["profileName"] = this._userName;
    userObject["description"] = this._jobName;
    return userObject;
  }

  setUserInfo(nameInfo, jobInfo) {
    //Takes new user data and adds it on the page
    this._userName = nameInfo;
    this._jobName = jobInfo;

    this._nameElement.textContent = nameInfo;
    this._jobElement.textContent = jobInfo;
  }
}
