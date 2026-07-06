# 本地部署说明

本系统静态文件目录：

`/Users/hechuan/Documents/Codex/2026-07-05/new-chat/outputs/sales-system-demo`

固定本地端口：

`8088`

本机访问地址：

`http://127.0.0.1:8088/`

局域网访问地址需要使用当前电脑的局域网 IP，例如：

`http://192.168.1.237:8088/`

公网永久访问需要额外绑定长期公网入口，推荐：

1. cpolar 固定二级域名
2. Cloudflare Tunnel + 自己的域名
3. ngrok 固定域名
4. 路由器端口映射 + 公网 IP/DDNS

## cpolar 固定域名方案

当前采用 cpolar 将本地 `8088` 端口映射到公网，适合临时或中期让不同网络的人访问。

本机已下载 macOS arm64 版本 cpolar 到：

`tools/cpolar/cpolar`

使用前需要在 cpolar 后台完成两件事：

1. 复制账号认证 token。
2. 预留一个固定二级域名，地区建议选择 China VIP。

认证账号：

```sh
./tools/cpolar/cpolar authtoken 你的_cpolar_token
```

启动临时公网访问：

```sh
./tools/cpolar/cpolar http 8088
```

固定域名需要在 cpolar Web UI 里把隧道指向本地地址 `8088`，域名类型选择“二级子域名”，填入后台预留的二级域名。

cpolar 本地管理地址：

`http://127.0.0.1:9200/`

注意：电脑关机、休眠、断网，公网地址都会无法访问。要长期稳定访问，需要保持这台电脑开机并保持本地服务和 cpolar 隧道运行。
