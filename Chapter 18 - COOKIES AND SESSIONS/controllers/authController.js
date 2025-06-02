exports.getLogin = (req, res) => {
  res.render("auth/login", {
    pageTitle: "Login",
    activeTab: "login",
    currentPage: "login",
    isLoggedIn: req.isLoggedIn,
  });
};

exports.postLogin = (req, res,next) => {
  console.log(req.body);
  req.isLoggedIn = true; // Simulating a successful login
  res.redirect("/");
};


exports.getRegister = (req, res) => {
  res.render("auth/register", {
    pageTitle: "Register",
    activeTab: "register",
    currentPage: "register",
    isLoggedIn: req.isLoggedIn,
  });
};


exports.postRegister = (req, res,next) => {
  console.log(req.body);
  res.redirect("/");
};

