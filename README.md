# Fluidify
![Screenshot of fluidify app](src/assets/screenshot%20prototype%20fluidify.png)
## Description
Keep track of your fluid balance with help from Druppie. Submit your daily fluid intake and let Druppie react on it by giving tips. 

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contact](#contact)

## Installation
1. Clone the repository:
```sh
git clone https://github.com/MaxvanSchoonderwoerd/Fluidify-app.git
```
Navigate to the project directory:
```sh
cd Fluidify-app
```
Install dependencies:
```sh
npm install
```

(optional) To make an optimized build for production, run:
```sh
npm run build
```
## Usage
To start the project, run:

```sh
npm run start
```
1. You can add an subtract fluid from the fluid balance by pressing the buttons on the various containers.
2. You can edit the container list by editing ```src/assets/data/containers.json```
3. Druppie, our mascot, will say things depending on the fluid balance.
4. You can edit the mascot messages by editing ```src/assets/data/messages.json```
5. Pressing the keys from 1 - 5 will trigger a notification with different messages.
6. Pressing the keys 6 - 0 will display messages next to druppie in a text box.


## Features
- This is a PWA, meaning it can be installed on mobile and desktop devices.
- Adding and subtracting fluid from the fluid balance.
- Dynamic mascot that changes depending on the fluid balance.
- Tips from mascot.

## Contact
Your Max van Schoonderwoerd - 1007212@hr.nl

Project Link: https://github.com/MaxvanSchoonderwoerd/Fluidify-app
