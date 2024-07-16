<script type="text/babel">
const CountdownViewer = ({ values }) => {
  const { countdownTime, buttonText, buttonLink } = values;
  const [timeLeft, setTimeLeft] = React.useState(countdownTime);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

  React.useEffect(() => {
    if (timeLeft <= 0) {
      setIsButtonDisabled(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h}時間 ${m}分 ${s}秒`;
  };

  return (
    <div>
      <div>残り時間: {formatTime(timeLeft)}</div>
      <button disabled={isButtonDisabled} onClick={() => window.location.href = buttonLink}>
        {buttonText}
      </button>
    </div>
  );
};

console.log('Registering custom tool...');

unlayer.registerTool({
  name: 'countdown_tool',
  label: 'カウントダウン',
  icon: 'fa-clock',
  supportedDisplayModes: ['web', 'email'],
  options: {
    default: {
      title: null,
    },
    countdownTime: {
      title: 'カウントダウン時間（秒）',
      position: 1,
      options: {
        countdownTime: {
          label: 'カウントダウン時間（秒）',
          defaultValue: 3600,
          widget: 'number',
        },
      },
    },
    buttonText: {
      title: 'ボタンテキスト',
      position: 2,
      options: {
        buttonText: {
          label: 'ボタンテキスト',
          defaultValue: 'クリック',
          widget: 'text',
        },
      },
    },
    buttonLink: {
      title: 'ボタンリンク',
      position: 3,
      options: {
        buttonLink: {
          label: 'ボタンリンク',
          defaultValue: 'https://example.com',
          widget: 'text',
        },
      },
    },
  },
  values: {},
  renderer: {
    Viewer: unlayer.createViewer({
      render(values) {
        return <CountdownViewer values={values} />;
      },
    }),
    exporters: {
      web: function (values) {
        return `<div>
          <div>残り時間: ${values.countdownTime}秒</div>
          <button>${values.buttonText}</button>
        </div>`;
      },
      email: function (values) {
        return `<div>
          <div>残り時間: ${values.countdownTime}秒</div>
          <button>${values.buttonText}</button>
        </div>`;
      },
    },
    head: {
      css: function (values) {},
      js: function (values) {},
    },
  },
});

console.log('Custom tool registered successfully.');
</script>
