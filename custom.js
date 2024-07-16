const React = window.unlayer.React;
const ReactDOM = window.unlayer.ReactDOM;

class CountdownViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: props.values.countdownTime,
      isButtonDisabled: false
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(prevState => ({
        timeLeft: prevState.timeLeft - 1
      }), () => {
        if (this.state.timeLeft <= 0) {
          clearInterval(this.timer);
          this.setState({ isButtonDisabled: true });
        }
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h}時間 ${m}分 ${s}秒`;
  }

  render() {
    const { buttonText, buttonLink } = this.props.values;
    return React.createElement('div', null, 
      React.createElement('div', null, `残り時間: ${this.formatTime(this.state.timeLeft)}`),
      React.createElement('button', {
        disabled: this.state.isButtonDisabled,
        onClick: () => window.location.href = buttonLink
      }, buttonText)
    );
  }
}

unlayer.registerTool({
  name: 'countdown_tool',
  label: 'カウントダウン',
  icon: 'fa-clock',
  supportedDisplayModes: ['web', 'email'],
  options: {
    countdownTime: {
      title: 'カウントダウン時間（秒）',
      position: 1,
      defaultValue: 3600,
      widget: 'number'
    },
    buttonText: {
      title: 'ボタンテキスト',
      position: 2,
      defaultValue: 'クリック',
      widget: 'text'
    },
    buttonLink: {
      title: 'ボタンリンク',
      position: 3,
      defaultValue: 'https://example.com',
      widget: 'text'
    }
  },
  renderer: {
    Viewer: (props) => {
      const container = document.createElement('div');
      ReactDOM.render(React.createElement(CountdownViewer, props), container);
      return container;
    },
    exporters: {
      web: (props) => {
        return `<div>
          <div>残り時間: ${props.values.countdownTime}秒</div>
          <button>${props.values.buttonText}</button>
        </div>`;
      },
      email: (props) => {
        return `<div>
          <div>残り時間: ${props.values.countdownTime}秒</div>
          <button>${props.values.buttonText}</button>
        </div>`;
      }
    }
  }
});
