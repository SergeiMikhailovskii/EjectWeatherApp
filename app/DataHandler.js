let switchStatus = 0;

function setSwitchStatus(status) {
  switchStatus = status;
}

function getSwitchStatus() {
  return switchStatus;
}

export default { setSwitchStatus, getSwitchStatus };
