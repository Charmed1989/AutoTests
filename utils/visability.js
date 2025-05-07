async function checkLinkVisibility(link, expectedVisibility, itemName) {
    const isVisible = await link.isVisible();
    if (isVisible === expectedVisibility) {
      console.log(`Test passed: Link with text "${itemName}" is ${expectedVisibility ? 'visible and hoverable' : 'not visible, as expected'}.`);
    } else {
      console.error(`Test failed: Link with text "${itemName}" is ${isVisible ? 'visible, but it should not be' : 'not visible'}.`);
      throw new Error(`Link with text "${itemName}" is ${isVisible ? 'visible, but it should not be' : 'not visible'}.`);
    }
  }
  module.exports = {checkLinkVisibility};
