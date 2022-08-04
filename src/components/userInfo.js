export class UserInfo {
  constructor({ profileUserName, profileUserJob, profileAvatar }) {
    this._job = '',
      this._name = '',
      this._avatar = '',
      this.profileUserName = profileUserName
    this.profileUserJob = profileUserJob
    this.profileUserAvatar = profileAvatar
  }

  getUserInfo(data) {//api === data
    this._name = data.name
    this._job = data.about
    this._avatar = data.avatar
    this._id = data._id


    return {
      name: this._name,
      about: this._job,
      avatar: this._avatar,
      _id: this._id
    }
  }


  setUserInfo({ name: newName, about: newJob, avatar }) {
    this._name = newName
    this._job = newJob
    this._avatar = avatar
    this.updateUserInfo()
  }

  updateUserInfo() {
    this.profileUserName.textContent = this._name
    this.profileUserJob.textContent = this._job
    this.profileUserAvatar.src = this._avatar
  }
}