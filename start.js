const os = require("os");
const { spawn } = require("child_process");

const PORT = 3030;

function getLanIPs() {
  const nets = os.networkInterfaces();
  const ips = [];
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family !== "IPv4" || net.internal) continue;
      // 过滤代理虚拟网段（按需调整）
      if (net.address.startsWith("198.18.")) continue;
      ips.push(net.address);
    }
  }
  return ips;
}

const child = spawn("npx", ["--yes", "serve", "-p", String(PORT)], {
  stdio: "inherit",
  shell: true,
});

setTimeout(() => {
  const ips = getLanIPs();
  console.log("");
  for (const ip of ips) {
    console.log(`   - Network:  http://${ip}:${PORT}`);
  }
}, 800);
