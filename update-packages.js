/*
 This script updates the dependencies and devDependencies in your package.json file to their
 latest suitable versions using yarn. Unlike yarn upgrade or yarn upgrade-interactive, which
 only update the packages in the yarn.lock file, this script ensures that the package.json
 file is also updated.

 The script reads the package.json file, extracts the dependencies and devDependencies, and
 installs each package one by one using yarn add. This approach guarantees that the latest
 suitable versions of the packages are installed and reflected in the package.json file.

 Usage
 Create a new file named update-packages.js in your project root and paste this code and run
 `node update-packages.js` in the terminal:
*/

const { exec } = require('child_process');
const fs = require('fs');

// Read package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Extract dependencies and devDependencies
const dependencies = packageJson.dependencies ? Object.keys(packageJson.dependencies) : [];
const devDependencies = packageJson.devDependencies ? Object.keys(packageJson.devDependencies) : [];

// Function to install a package using yarn
const installPackage = (packageName, isDev) => {
  return new Promise((resolve, reject) => {
    const command = `yarn add ${packageName}${isDev ? ' --dev' : ''}`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error installing ${packageName}:`, stderr);
        reject(error);
      } else {
        console.log(`Successfully installed ${packageName}`);
        resolve(stdout);
      }
    });
  });
};

// Install all dependencies
const installAllPackages = async () => {
  try {
    for (const dep of dependencies) {
      await installPackage(dep, false);
    }
    for (const devDep of devDependencies) {
      await installPackage(devDep, true);
    }
    console.log('All packages installed successfully.');
  } catch (error) {
    console.error('Error installing packages:', error);
  }
};

// Start the installation process
installAllPackages();
