window.TrelloPowerUp.initialize({
  "card-buttons": function (t, options) {
    return [
      {
        text: "Project Outline",
        callback: function (t) {
          return t.popup({
            title: "Project Outline",
            url: "./index.html",
            height: 300
          });
        }
      }
    ];
  }
});