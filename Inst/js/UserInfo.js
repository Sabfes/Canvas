class UserInfo {
  constructor(nameProfile, jobProfile, nameUser, jobUser, apiRename, popupClose, divAvatar) {
    this.nameProfile = nameProfile;
    this.jobProfile = jobProfile;
    this.nameUser = nameUser;
    this.jobUser = jobUser;
    this.apiRename = apiRename;
    this.popupClose = popupClose;
    this.divAvatar = divAvatar;
    this.name = '';
    this.job = '';
    this.avatarUrl = '';
  }
  // Получение данных с сервера
  GetInfo(apiGetName) {
    apiGetName().then((res) => {
      this.avatarUrl = `Url(${res.avatar})`;
      this.name = res.name;
      this.job = res.about;
      this.setUserInfo();
    })
      .catch((err) => {
        console.log(err.message);
      })
  }
  // Установка данных
  setUserInfo() {
    this.divAvatar.style.backgroundImage = this.avatarUrl;
    this.nameProfile.textContent = this.name;
    this.jobProfile.textContent = this.job;

    this.nameUser.value = this.name;
    this.jobUser.value = this.job;

    const errorName = document.getElementById('input-error-name');
    const errorJob = document.getElementById('input-error-job');

    errorName.textContent = '';
    errorJob.textContent = '';
  }
  // Обновление данных
  updateUserInfo(event) {
    event.preventDefault();
    this.apiRename(this.nameUser.value, this.jobUser.value)
      .then((res) => {
        if (res.ok) {
          this.jobProfile.textContent = `${this.jobUser.value}`;
          this.nameProfile.textContent = `${this.nameUser.value}`;

          this.name = `${this.nameUser.value}`;
          this.job = `${this.jobUser.value}`; 
          
          this.popupClose();
        }
      })
      .catch((err) => {
        console.log(err.message);
      })
  }
}

