# Bug List

> Make a list of the things that don't work as expected. Keep a list of things that you have fixed and try to document how you solved them.

1. Problem: The sidebar is not displayed correctly at all times. Not covering from top to bottom. (Tried both 100% and 100vh)
2. Changing one part of the CSS can ruin the whole page, probably best to scrap the file and restart from the beginning. It would make it easier with the things I've learned.

Fixed:
1. Image on the information page has a gap on the bottom visible by using border. Set line-height to 0. Seems to be an issue with how images are handled and the fact that they stretch over the baseline of the element. 
2. Images not displaying correct size according to responsive design. Fixed by dividing them up in different subsections of divs and then using vw. 1 vw is equal to 1% of the viewport width, useful for different devices.
