# iris-local-proxy
A local proxy server designed to bypass CORS (Cross-Origin Resource Sharing) restrictions.

## Installation

You can install the `iris-local-proxy` using one of the following methods:

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

### Uninstall

```
npm uninstall -g iris-local-proxy
```

### Usage
Start the proxy server from the command line:
```
proxy start
```
Shutdown the server
```
Ctrl + C
```
