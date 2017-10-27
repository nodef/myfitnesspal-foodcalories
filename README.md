# myfitnesspal-foodcalories

[![NPM](https://nodei.co/npm/myfitnesspal-foodcalories.png)](https://nodei.co/npm/myfitnesspal-foodcalories/)

Get JSON Nutrient Data from myfitnesspal.

```bash
# using as command line application
node index <start> <stop> <step>

# get nutrient info of food id 1001
node index 1001

# get nutrient info of food id 1001 to 1100 (excluding)
node index 1001 1100

# get nutrient info of food id 1001 to 1100, 20 parallel connections
node index 1001 1100 20
```

```javascript
// using as a javascript module
var foodcalories = require('myfitnesspal-foodcalories');
// foodcalories(<id>)

foodcalories(1001).then((ans) => console.log(ans));
// {"Butter - Salted":{ ... }}
```
