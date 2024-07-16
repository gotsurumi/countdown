(function() {
  var Countdown = unlayer.createReactComponent({
    name: 'Countdown',
    attributes: {
      time: { type: 'number', default: 3600 },
      buttonText: { type: 'string', default: 'Click Me' },
      buttonLink: { type: 'string', default: 'https://example.com' }
    },
    render: function() {
      var timeLeft = this.getAttribute('time');
      var buttonText = this.getAttribute('buttonText');
      var buttonLink = this.getAttribute('buttonLink');

      return unlayer.createElement('div', { className: 'countdown-container' },
        unlayer.createElement('div', { className: 'countdown-timer' }, timeLeft),
        unlayer.createElement('a', { href: buttonLink, className: 'countdown-button' }, buttonText)
      );
    }
  });

  unlayer.registerTool({
    name: 'countdown_tool',
    label: 'Countdown',
    icon: 'fa-clock',
    supportedDisplayModes: ['web'],
    options: {
      default: {
        time: { label: 'Countdown Time (seconds)', defaultValue: 3600, widget: 'number' },
        buttonText: { label: 'Button Text', defaultValue: 'Click Me', widget: 'text' },
        buttonLink: { label: 'Button Link', defaultValue: 'https://example.com', widget: 'text' }
      }
    },
    renderer: Countdown
  });
})();
