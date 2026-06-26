window.TrelloPowerUp.initialize({
  "card-buttons": function (t, options) {
    return [
      {
        icon: {
          dark: "./images/icon.png",
          light: "./images/icon.png"
        },
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