import { Output, Config } from "@pulumi/pulumi";

// running pulumi config set <key> <value>
// ie  pulumi config set name simon ( this is ona per env basis)
const getEnvironmentValue = (key: string) => {
  let config = new Config();
  return config.require(key);
};

export const variables = {
  region: "eu-west-1" as const, // <-- change this to your region
  dynamoDBTables: {} as Record<string, Output<string>>,
  myName: getEnvironmentValue("name"),
};
