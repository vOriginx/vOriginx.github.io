Please add the following to your /etc/hosts file (MacOS):

```
127.0.0.1   parent.local
127.0.0.1   outer.local
127.0.0.1   inner.local
```

You can use `sudo nano /etc/hosts` to edit the file.

Then use `npm start` to start all servers.

The project should be available at https://parent.local:8000

You can see in the console that the devices cannot be enumerated/setSinkId is not available for use. Hence the issues we have in Zendesk.

Testing the permissions:

You can add `speaker-selection` into the `allow` attribute in both iframes to test working policies.

Testing the differences in Chrome vs Firefox:

Chrome:

`chrome://flags/` -> We need to enable `Insecure origins treated as secure` and relaunch before testing.

Firefox:


`about:config` -> `media.getusermedia.insecure.enabled` & `media.devices.insecure.enabled` need to be enabled before testing.

Generating new keys

```
brew install mkcert
brew install nss # if you use Firefox
mkcert -install
mkcert parent.local outer.local inner.local localhost 127.0.0.1 ::1
```

Ensure generated key is named `key.pem` and generated cert is named `cert.pem` in the project root.