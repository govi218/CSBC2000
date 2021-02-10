# Tendermint

1. Install Go: https://golang.org/doc/install

2. Run the following commands to get started:

``` shell
export GO111MODULE=on
go mod init github.com/me/example
go get github.com/tendermint/tendermint@master
go build
rm -rf /tmp/example
TMHOME="/tmp/example" tendermint init

```

3. Then, run this in a separate terminal:

```
curl -s 'localhost:26657/broadcast_tx_commit?tx="tendermint=rocks"`
curl -s 'localhost:26657/abci_query?data="tendermint"'
```
