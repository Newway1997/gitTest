const execSync = require("child_process").execSync;
const fs = require("fs");
const branch = execSync("git symbolic-ref --short HEAD", {
  encoding: "utf-8",
}).trim();
const blue='\x1B[36m%s\x1B[0m';
const red='\x1B[31m%s\x1B[0m'
const branchReg = /(master|hotfix|main)/g;
if (branchReg.test(branch)) {
  console.log(blue,"当前分支" + branch);
  const result = execSync(`git diff --name-only ${branch} origin/${branch}`, {
    encoding: "utf-8",
  });
  const fileArr = result.split("\n");
  console.log(fileArr)
  for (let file of fileArr) {
    if (file.trim()) {
      let reg = /\.json$/g;
      if (!reg.test(file)) {
        var content = fs.readFileSync(file, "utf-8");
        if (content.indexOf("eruda") > -1) {
          console.error(red,`${branch}分支${file}包含eruda，请删除后再提交`);
          throw new Error();
        }
      }
    }
  }
}
