exports.getLogin = (req, res) => {
  res.render("auth/login", {
    pageTitle: "Login",
    activeTab: "login",
    currentPage: "login",
    isLoggedIn: req.session.isLoggedIn,
  });
};

exports.postLogin = (req, res,next) => {
  console.log(req.body);
  req.session.isLoggedIn = true; // Set session variable for logged-in status
  res.redirect("/");
};


exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};

exports.getRegister = (req, res) => {
  res.render("auth/register", {
    pageTitle: "Register",
    activeTab: "register",
    currentPage: "register",
    isLoggedIn: req.session.isLoggedIn,
  });
};


exports.postRegister = (req, res,next) => {
  console.log(req.body);
  res.redirect("/");
};

