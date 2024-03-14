const user = {
  email: "",
  username: "",
  password: "",
};

function User(email, username, password) {
  this.email = email;
  this.username = username;
  this.password = password;
}

module.exports = { User };
