## The Issue

In our Zendesk integration involving nested iframes that play audio through a user-selected output device, we faced challenges with implementing `setSinkId()` due to browser limitations with Firefox, cross-origin iframe restrictions, and permissions policies. 

We were essentially calling `setSinkId()` without having the necessary permissions to do so in the context of the cross-origin (child) iframe.

To resolve this, we ensured all iframes included the necessary allow attributes (e.g., `allow="microphone; speaker-selection;"`) - This solution successfully enabled audio output device selection.

## Setup

```
npm i
```

Please add the following to your /etc/hosts file (MacOS):

```
127.0.0.1   parent.local
127.0.0.1   outer.local
127.0.0.1   inner.local
```

You can use `sudo nano /etc/hosts` to edit the file or simple run this command:

```
echo -e "127.0.0.1\tparent.local\n127.0.0.1\touter.local\n127.0.0.1\tinner.local" | sudo tee -a /etc/hosts
```

This enables a HTTPS environment to better replicate the issue.

You can use `npm start` to start all servers.

The project should be available at https://parent.local:8000

## Testing the permissions:

You can add `speaker-selection` into the `allow` attribute in both iframes to test working policies.
If you remove the `speaker-selection` from one of the iframes you can restart and test again, you'll notice:
- No output devices were retrieved (blocked by `speaker-selection` policy https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices)
- When clicking 'Play Audio', you see the DOMException in the console: `DOMException: Document's Permissions Policy does not allow setSinkId()`

When adding `speaker-selection` in the `allow` attribute of both parent + child iframes, everything works.


## Generating new keys

```
brew install mkcert
brew install nss # if you use Firefox
mkcert -install
mkcert parent.local outer.local inner.local localhost 127.0.0.1 ::1
```

Ensure generated key is named `key.pem` and generated cert is named `cert.pem` in the project root.