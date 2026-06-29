# pictionAIRy

pictionAIRy is a small web application that reads accelerometer data from a mobile device and displays the X, Y, and Z acceleration values in the browser. The app is designed to run over **HTTPS**, which is required for motion-sensor APIs (especially on iOS).

## Project structure

```
pictionAIRy/
├── server.js          # Express HTTPS server
├── html/
│   └── index.html     # Client UI
├── javascript/
│   └── index.js       # Device motion handling
├── keys/
│   ├── server.key     # TLS private key
│   └── server.cert    # TLS certificate
└── package.json
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- A phone or tablet with an accelerometer (iPhone, iPad, Android, etc.)
- Your computer and mobile device on the **same local network** (same Wi‑Fi)

---

## Server setup and launch

### 1. Install dependencies

From the project root:

```bash
npm install
```

### 2. Set your local IP address

The server binds to HTTPS and logs a URL using a hardcoded IP in `server.js`. Before starting the server, update `IPADDRESS` to your machine’s local network address:

```js
const IPADDRESS = "192.168.101.109";  // change to your IP
```

**Find your IP on Windows (PowerShell):**

```powershell
ipconfig
```

Look for the **IPv4 Address** under your active Wi‑Fi or Ethernet adapter (e.g. `192.168.1.42`).

### 3. Start the server

```bash
node server.js
```

You should see:

```
Listening @ https://YOUR_IP:8080
```

The server:

- Listens on port **8080**
- Serves static files from `html/`, `javascript/`, and `css/`
- Uses the self-signed certificate in `keys/server.key` and `keys/server.cert`

To restart automatically when you edit files during development:

```bash
npx nodemon server.js
```

### 4. Allow through the firewall (if needed)

If your phone cannot connect, allow inbound traffic on port **8080** in Windows Firewall for Node.js.

---

## Client setup and use

The client runs in a mobile browser. Desktop browsers generally do not expose `DeviceMotionEvent` in a useful way for this app.

### 1. Open the app on your phone

On your mobile device, open a browser and go to:

```
https://YOUR_IP:8080/index.html
```

Replace `YOUR_IP` with the same address you set in `server.js`.

> **Note:** The root URL (`/`) is not configured to serve the HTML page. Use `/index.html`.

### 2. Accept the certificate warning

The server uses a **self-signed certificate**. Your browser will show a security warning the first time.

- **iOS (Safari):** Tap **Show Details** → **visit this website** → **Visit Website**
- **Android (Chrome):** Tap **Advanced** → **Proceed to … (unsafe)**

You must complete this step; the app redirects non-HTTPS URLs to HTTPS and sensors will not work over plain HTTP.

### 3. Grant motion sensor permission

1. Tap **Request sensor permission**.
2. When prompted, allow motion & orientation access.
3. Move or tilt the device.

The page updates three fields with live accelerometer values:

| Element | Meaning |
|---------|---------|
| `#accX` | Acceleration on the X axis |
| `#accY` | Acceleration on the Y axis |
| `#accZ` | Acceleration on the Z axis |

On iOS, permission is requested explicitly via `DeviceMotionEvent.requestPermission()`. On other platforms that expose the API without a prompt, values may appear after the page loads.

### 4. Troubleshooting the client

| Problem | What to try |
|---------|-------------|
| Page does not load | Confirm server is running, IP is correct, and both devices are on the same network |
| Certificate error persists | Fully accept/trust the self-signed cert in the browser |
| “DeviceMotionEvent is not defined” | Use a physical phone/tablet, not a desktop browser or simulator without motion support |
| No values after granting permission | Reload the page, tap **Request sensor permission** again, and move the device |
| Redirect loop or blank page | Ensure you are using `https://`, not `http://` |

---

## Debugging

### Server-side (Node.js)

Run the server from Cursor/VS Code with the **JavaScript Debug Terminal** or a **Node.js** launch configuration pointing at `server.js`. Set breakpoints in `server.js` to inspect incoming requests.

### Client-side (browser)

1. Connect the phone to a computer (or use remote debugging over the network).
2. **Safari (iOS):** Settings → Safari → Advanced → Web Inspector; then use Safari on Mac → Develop → [your device].
3. **Chrome (Android):** On a PC, open `chrome://inspect` with the phone connected via USB (or configured for remote debugging).

Set breakpoints in `javascript/index.js` (e.g. in `handleMotionEvent` or `permission`) to step through sensor handling.

---

## Quick reference

| Task | Command / URL |
|------|----------------|
| Install | `npm install` |
| Start server | `node server.js` |
| Dev mode (auto-restart) | `npx nodemon server.js` |
| Open client | `https://YOUR_IP:8080/index.html` |
| Default port | `8080` |

---

## License

ISC — see [package.json](package.json).
