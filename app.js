window.TrelloPowerUp.initialize({
  "card-buttons": function (t, options) {
    return [
      {
        icon: "https://p.trellocdn.com/favicon.ico",
        text: "Project Outline",
        callback: function (t) {
          return t.popup({
            title: "Project Outline",
            url: "./popup.html",
            height: 200
          });
        }
      }
    ];
  }
});