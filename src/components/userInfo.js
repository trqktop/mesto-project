export class UserInfo {
  constructor(profileUserName, profileUserJob) {
    this._job = '',
      this._name = '',
      this.profileUserName = profileUserName
    this.profileUserJob = profileUserJob
  }

  getUserInfo(data) {

    this._name = data.name
    this._job = data.about

    // return {
    //   name: this._name,
    //   job: this._job
    // }
  }


  setUserInfo({ name: newName, about: newJob }) {

    this._name = newName
    this._job = newJob

  }

  updateUserInfo() {
    this.profileUserName.textContent = this._name
    this.profileUserJob.textContent = this._job

  }
}