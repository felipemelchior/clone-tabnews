import { spawn } from "child_process";

spawn("next dev", { stdio: "inherit", shell: true });

function stopProcess(code) {
  console.log(`\nReceived code ${code}\nStopping containers...`);
  spawn("yarn", ["run", "services:stop"], { stdio: "inherit", shell: true });
}

process.on("SIGINT", (code) => stopProcess(code));
process.on("SIGTERM", (code) => stopProcess(code));
