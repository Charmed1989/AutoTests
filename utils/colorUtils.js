function getExpectedColor(status) {
    switch (status) {
      case 'Online':
        return 'rgb(10, 12, 13)'; // #0a0c0d
      case 'Offline':
        return 'rgb(255, 0, 0)'; // red
      case 'Archive':
        return 'rgb(74, 166, 33)'; // #4aa621
      case 'Hidden':
        return 'rgb(132, 83, 139)'; // #84538b
      
    }
  }
  
  module.exports = { getExpectedColor };
