Place your wedding audio file here as `music.mp3`.

- Path: `public/music.mp3`
- Supported formats: `mp3` is recommended. Browsers vary — prefer an MP3 encoded at 128-320 kbps.
- The app will attempt to autoplay the audio after the loader completes. If the browser blocks autoplay, use the sticky play button at the bottom-right to start audio.

To change the audio file path, update the `src` prop in `src/components/AudioPlayer/AudioPlayer.tsx` or pass a different `src` into the component in `src/App.tsx`.