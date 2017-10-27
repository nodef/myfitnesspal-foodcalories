# myfitnesspal-foodcalories

[![NPM](https://nodei.co/npm/myfitnesspal-foodcalories.png)](https://nodei.co/npm/myfitnesspal-foodcalories/)

Get JSON Nutrient Data from myfitnesspal.

```bash
# using as command line application
node index <start> <stop> <step>

# get nutrient info of food id 1
node index 1

# get nutrient info of food id 1 to 100 (excluding)
node index 1 100

# get nutrient info of food id 1 to 100, 20 parallel connections
node index 1 100 20
```
