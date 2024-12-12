# iris-local-proxy
A local proxy server designed to bypass CORS (Cross-Origin Resource Sharing) restrictions.

## Installation

Install the iris-local-proxy globally using one of the following methods:

### Install from GitHub
To install directly from the GitHub repository, use the following command:

```
npm install -g git+https://github.com/olsa/iris-local-proxy.git
```

### Install from source
You can create the package from the source and then install it globally:

```
git clone https://github.com/olsa/iris-local-proxy.git
cd iris-local-proxy
npm pack
```
Check the `.tgz` filename and start the installation:
```
npm install -g iris-local-proxy-x.x.x.tgz
```

### Usage
Start the proxy server from the command line:
```
proxy start
```
Here is an example in JavaScript to bypass CORS. The same concept can be applied to other technologies where cross-origin requests need to be handled.

```javasxcript

const proxyURL = "http://" + window.location.hostname + ":8010/proxy/";

const apiUrl = "https://example.io/getEPGData";
let apiUrlUsingProxy = proxyURL + apiUrl;

fetch(apiUrlUsingProxy)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

Shutdown the server
```
Ctrl + C
```

### Uninstall

```
npm uninstall -g iris-local-proxy
```
