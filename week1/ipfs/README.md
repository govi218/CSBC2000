# Playing with IPFS

## IPFS installation
- To install ipfs, go to https://dist.ipfs.io/#go-ipfs and copy the link (see picture below) of the latest Go implementation of IPFS. 
- Run: 
```
wget https://dist.ipfs.io/go-ipfs/v0.4.18/go-ipfs_v0.4.18_linux-amd64.tar.gz
tar xvfz go-ipfs_v0.4.18_linux-amd64.tar.gz
sudo mv go-ipfs/ipfs /usr/local/bin/ipfs
```
- Verify: `ipfs version`

## Init Node
- Run
```
IPFS_PATH1=~/.ipfs ipfs init
echo -e "/key/swarm/psk/1.0.0/\n/base16/\n`tr -dc 'a-f0-9' < /dev/urandom | head -c64`" > ~/.ipfs/swarm.key
IPFS_PATH=~/.ipfs ipfs bootstrap rm --all
IPFS_PATH=~/.ipfs ipfs config show | grep Bootstrap

```
- At this point, you should see `"Bootstrap": null`
- Then, get your peer ID: `IPFS_PATH=~/.ipfs ipfs config show | grep "PeerID"`
- And add your bootstrap: `IPFS_PATH=~/.ipfs ipfs bootstrap add /ip4/172.25.10.5/tcp/4001/ipfs/<PEER_ID>`
- Start: 
```
export LIBP2P_FORCE_PNET=1
IPFS_PATH=~/.ipfs ipfs daemon
```

