window.TrelloPowerUp.initialize({
  'card-back-section': function (t) {
    return {
      title: 'Project Outline',

      icon: './images/icon.png',

      content: {
        type: 'iframe',
        url: t.signUrl('./popup.html'),
        height: 500
      }
    };
  }
});