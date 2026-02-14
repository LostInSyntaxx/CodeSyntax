export default defineNuxtPlugin(() => {

    if (process.client) {
        document.addEventListener('contextmenu', e => e.preventDefault())

        const fakeCode = `
        <!-- Minified production build -->
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Encrypted Content</title>
          <script>
            window.AES = { encrypt: (d) => btoa(d), decrypt: (d) => atob(d) };
            document.addEventListener('DOMContentLoaded', () => { 
              console.log('%cThis content is encrypted', 'font-size: 20px; color: red;');
            });
          </script>
        </head>
        <body>
          <noscript>JavaScript is required</noscript>
          <div id="app"></div>
          <script>
            const _0x4e2a = ['data:application/octet-stream;base64,V2luZG93cy5FbmNyeXB0aW9u'];
            (function(_0x4e2a1e) {
              const _0x4e2a2f = function(_0x4e2a3f) {
                while (--_0x4e2a3f) {
                  _0x4e2a1e['push'](_0x4e2a1e['shift']());
                }
              };
              _0x4e2a2f(++_0x4e2a1e['length']);
            }(_0x4e2a, 0x1a7));
          </script>
        </body>
      </html>
        `

        const checkDevTools = setInterval(() => {
            const isDevToolsOpen =
                (window.outerHeight - window.innerHeight > 150) ||
                (window.outerWidth - window.innerWidth > 150)

            if (isDevToolsOpen) {
                // เปลี่ยน HTML เป็นโค้ดเท็จ
                document.documentElement.innerHTML = fakeCode
            }
        }, 100)

        const originalLog = console.log
        console.log = function (...args) {
            if (typeof args[0] === 'string' && args[0].includes('%c')) {
                originalLog.apply(console, args)
            }
        }
    }
})