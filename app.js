window.TrelloPowerUp.initialize({
  "card-buttons": function (t, options) {
    return [
      {
        icon: {
          dark: "./images/icon.svg",
          light: "./images/icon.svg"
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