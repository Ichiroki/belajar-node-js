import validator from 'validator'
import chalk from 'chalk'

const validate = validator
const success = chalk.bgGreen
const error = chalk.bgRed
const warning = chalk.bgYellow

const email = validate.isEmail('rizqiawanf@ymail.com')
const phone = validate.isMobilePhone('089662690020', 'id-ID')

if( email === true && phone === true ) {
   console.log(success('Email dan Nomor Telpon yang valid'));
} else if (email === false && phone === true) {
   console.log(warning("Email yang tidak valid, namun Nomor Telpon yang valid"));
} else if (email === true && phone === false) {
   console.log(warning("Nomor Telpon yang tidak valid, namun Email yang valid"));
} else {
   console.log(error("Tidak ada data yang valid"));
}