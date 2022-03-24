const moment = require('moment');

var start = moment(new Date()), // Sept. 1st
  end = moment(new Date(new Date().getFullYear(), 11, 31));

var result = [];
[1, 2].forEach(day => {
  var current = start.clone();
  while (current.day(7 + day).isBefore(end)) {
    result.push(current.clone());
  }
});
