const fs = require('fs')
const yaml = require('js-yaml')

const service = yaml.load(fs.readFileSync('./serverless.yml', 'utf8'))
const resources = service.resources.Resources

const tables = Object.keys(resources)
  .map((name) => resources[name])
  .filter((r) => r.Type === 'AWS::DynamoDB::Table')
  .map((r) => {
    delete r.Properties.TimeToLiveSpecification
    delete r.Properties.PointInTimeRecoverySpecification

    let tableName = r.Properties.TableName
    const matchName = tableName.match(/\$\{self:provider.environment.(.*)\}/)
    if (matchName) {
      tableName = matchName[1]
    }

    r.Properties.TableName = tableName
    return r.Properties
  })

module.exports = {
  tables,
  basePort: 8000
}
