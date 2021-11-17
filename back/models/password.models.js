// Api password-validator
// https://www.npmjs.com/package/password-validator
const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();
// Wiki API-v5.0.0
// https://github.com/tarunbatra/password-validator/wiki/API-v5.0.0
passwordSchema
  .is().min(10)
  .is().max(64)
  .has().uppercase()
  .has().lowercase()
  .has().symbols()
  .has().digits()
  .has().not().spaces()

module.exports = passwordSchema;