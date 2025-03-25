import fs from "fs/promises";
import { execSync } from "child_process";
import path from "path";

async function fixAngularDependencies() {
  console.log("Starting Angular dependency fix...");

  // Read the package.json file
  const packageJsonPath = path.join(process.cwd(), "package.json");
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf8"));

  // Ensure all necessary Angular packages are included with specific versions
  const angularPackages = {
    "@angular/core": "^16.0.0",
    "@angular/common": "^16.0.0",
    "@angular/compiler": "^16.0.0",
    "@angular/forms": "^16.0.0",
    "@angular/platform-browser": "^16.0.0",
    "@angular/platform-browser-dynamic": "^16.0.0",
    "@angular/router": "^16.0.0",
    "@angular/animations": "^16.0.0",
    "@angular/material": "^16.0.0",
    "@angular/cdk": "^16.0.0",
    "@angular/compiler-cli": "^16.0.0",
    "@angular/cli": "^16.0.0",
  };

  // Update dependencies
  packageJson.dependencies = {
    ...packageJson.dependencies,
    ...angularPackages,
  };

  // Ensure devDependencies includes necessary testing packages
  packageJson.devDependencies = {
    ...packageJson.devDependencies,
    "@types/jasmine": "^4.3.0",
    "@types/node": "^18.11.9",
    "jasmine-core": "~4.5.0",
    karma: "~6.4.0",
    "karma-chrome-launcher": "~3.1.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "^2.0.0",
    typescript: "~4.9.3",
  };

  // Write updated package.json
  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log("Updated package.json with necessary Angular dependencies.");

  // Clean npm cache
  console.log("Cleaning npm cache...");
  execSync("npm cache clean --force", { stdio: "inherit" });

  // Remove node_modules and package-lock.json
  console.log("Removing node_modules and package-lock.json...");
  await fs.rm("node_modules", { recursive: true, force: true }).catch(() => {});
  await fs.unlink("package-lock.json").catch(() => {});

  // Reinstall dependencies
  console.log("Reinstalling dependencies...");
  execSync("npm install", { stdio: "inherit" });

  console.log(
    "Angular dependency fix complete. Please try running your original command again."
  );
}

fixAngularDependencies().catch(console.error);
