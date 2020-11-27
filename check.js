const execSync = require("child_process").execSync;
const fs = require("fs");
const branch = execSync("git symbolic-ref --short HEAD", { encoding: "utf-8" }).trim();
const branchReg = /(master|hotfix)/g;
if (branchReg.test(branch)) {
  const result = execSync("git diff --name-only --cached", {
    encoding: "utf-8",
  });
  const fileArr = result.split("\n");

  for (let file of fileArr) {
    if (file.trim()) {
      let reg = /\.json$/g;
      if (!reg.test(file)) {
        var content = fs.readFileSync(file, "utf-8");
        if (content.indexOf("eruda") > -1) {
          console.error(`${branch}分支${file}包含eruda，请删除后再提交`);
          throw new Error();
        }
      }
    }
  }
}
