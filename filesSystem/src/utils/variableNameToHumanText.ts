const variableNameToHumanText = (variable_name: string) => {
  return variable_name
    .replace(/([A-Z])/g, " $1")
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase());
};

export default variableNameToHumanText;
