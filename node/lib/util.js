/* Public */

function isES6() {
  return Number(process.versions.node.split('.')[0] || 0) >= 6;
}

/* Exports */

module.exports.isES6 = isES6;
